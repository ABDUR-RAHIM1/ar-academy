"use client"
import React, { useState, useContext, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Printer, Trash2, Image as ImageIcon, Eye, Edit3, Columns, X, Settings } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import QuestionBankModal from './QuestionBankModal';
import QuestionBuilderSettings from './BuilderSettings';
import { contextD } from '@/contextApi/DashboardState';
import { useReactToPrint } from 'react-to-print';

const QuestionBuilder = () => {
  const { qBuilderSettingsOpen, setQBuilderSettingOpen, fontSize, questionLang } = useContext(contextD);

  const contentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  const [isPrintMode, setIsPrintMode] = useState(false);
  const [columnCount, setColumnCount] = useState("1");
 
// নম্বর কনভার্টার ফাংশন (বাংলা ও ইংরেজি)
  const getQuestionNumber = (index) => {
    const number = index + 1;  
    
    if (questionLang === 'bn') {
      const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
      const converted = number
        .toString()
        .split('')
        .map(digit => bnDigits[parseInt(digit)])
        .join('');
      return converted + ".";
    }

    return number + ".";
  };

  // অপশন/বুলেট কনভার্টার ফাংশন
  const getOptionBullet = (index) => {
    if (questionLang === 'bn') {
      const bnAlphabets = ['(ক)', '(খ)', '(গ)', '(ঘ)'];
      return bnAlphabets[index];
    }
    const enAlphabets = ['(a)', '(b)', '(c)', '(d)'];
    return enAlphabets[index];
  };

  const [examInfo, setExamInfo] = useState({
    instituteName: "আপনার শিক্ষা প্রতিষ্ঠানের নাম",
    title: "বার্ষিক পরীক্ষা - ২০২৬",
    subject: "সাধারণ বিজ্ঞান",
    time: "২ ঘণ্টা ৩০ মিনিট",
    marks: "১০০",
    set: "ক"
  });

  const [groups, setGroups] = useState([
    { id: 'g1', title: "ক-বিভাগ (বহুনির্বাচনী)", questions: [] }
  ]);

  const existingTexts = groups.flatMap(g => g.questions.map(q => q.text));

  const addGroup = () => setGroups([...groups, { id: 'g' + Date.now(), title: "নতুন বিভাগ", questions: [] }]);

  const deleteGroup = (groupId) => {
    setGroups(groups.filter(g => g.id !== groupId));
  };

  const addQuestion = (groupId, type) => {
    setGroups(groups.map(g => g.id === groupId ? {
      ...g, questions: [...g.questions, {
        id: 'q' + Date.now(), type, text: "", image: null,
        options: type === 'mcq' ? ["", "", "", ""] : []
      }]
    } : g));
  };

  const handleImportFromDB = (dbQuestions) => {
    const formattedQuestions = dbQuestions.map(q => ({
      id: 'q-' + q.ID + '-' + Date.now() + Math.random(),
      text: q.Question,
      type: 'mcq',
      options: [q.Option1, q.Option2, q.Option3, q.Option4],
      image: null
    }));

    setGroups(prevGroups => {
      const updatedGroups = [...prevGroups];
      updatedGroups[0].questions = [...updatedGroups[0].questions, ...formattedQuestions];
      return updatedGroups;
    });
  };

  const updateQuestion = (gId, qId, data) => {
    setGroups(groups.map(g => g.id === gId ? {
      ...g, questions: g.questions.map(q => q.id === qId ? { ...q, ...data } : q)
    } : g));
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans relative">

      <QuestionBuilderSettings />

      {/* কন্ট্রোল প্যানেল */}
      <div className="max-w-5xl mx-auto mb-6 flex flex-wrap gap-4 items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-slate-200 print:hidden">
        <div className="flex gap-2">
          <Button variant={!isPrintMode ? "default" : "outline"} onClick={() => setIsPrintMode(false)}>
            <Edit3 className="mr-2 h-4 w-4" /> Builder
          </Button>
          <Button variant={isPrintMode ? "default" : "outline"} onClick={() => setIsPrintMode(true)}>
            <Eye className="mr-2 h-4 w-4" /> Preview
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <QuestionBankModal
            onImport={handleImportFromDB}
            existingTexts={existingTexts}
          />
          <Button
            onClick={() => setQBuilderSettingOpen(!qBuilderSettingsOpen)}
            variant="outline">
            Settings <Settings className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center gap-2 border-l pl-4">
          <Select value={columnCount} onValueChange={setColumnCount}>
            <SelectTrigger className="w-[110px]">
              <Columns className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 Column</SelectItem>
              <SelectItem value="2">2 Columns</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={reactToPrintFn} className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-100 font-bold">
            <Printer className="w-4 h-4 mr-2" /> Print
          </Button>
        </div>
      </div>

      <div
        ref={contentRef}
        id="printable-area"
        style={{ fontSize: `${fontSize}px` }} // ডাইনামিক ফন্ট সাইজ এখানে সেট করা হয়েছে
        className={`max-w-[8.5in] mx-auto bg-white shadow-2xl p-[0.5in] md:p-[0.75in] min-h-[11in] relative border border-slate-200 ${isPrintMode ? 'print:shadow-none print:p-0 print:border-none' : ''}`}
      >

        {examInfo.set && isPrintMode && (
          <div className="absolute right-[0.5in] top-[0.5in] border-2 border-black px-3 py-1 font-bold text-lg bg-white z-10">
            সেট: {examInfo.set}
          </div>
        )}

        <div className="text-center border-b-2 border-black pb-1 mb-3 pt-4">
          {!isPrintMode ? (
            <div className="grid grid-cols-2 gap-2">
              <Input className="text-center text-xl font-bold border-blue-200 focus:border-blue-500" value={examInfo.instituteName} onChange={e => setExamInfo({ ...examInfo, instituteName: e.target.value })} placeholder="শিক্ষা প্রতিষ্ঠানের নাম" />
              <Input className="text-center font-bold" value={examInfo.title} onChange={e => setExamInfo({ ...examInfo, title: e.target.value })} placeholder="পরীক্ষার নাম" />
              <Input className="text-center" value={examInfo.subject} onChange={e => setExamInfo({ ...examInfo, subject: e.target.value })} placeholder="বিষয়" />
              <Input className="text-center" value={examInfo.time} onChange={e => setExamInfo({ ...examInfo, time: e.target.value })} placeholder="সময়" />
              <Input className="text-center" value={examInfo.marks} onChange={e => setExamInfo({ ...examInfo, marks: e.target.value })} placeholder="পূর্ণমান" />
              <Input className="text-center bg-yellow-50" value={examInfo.set} onChange={e => setExamInfo({ ...examInfo, set: e.target.value })} placeholder="সেট নম্বর" />
            </div>
          ) : (
            <div className={" space-y-0"}>
              <h1 className="text-xl font-bold">{examInfo.instituteName}</h1>
              <h1 className="text-[18px] font-[400] uppercase">{examInfo.title}</h1>
              <h2 className="text-[17px] font-[400]">বিষয়: {examInfo.subject}</h2>
              <div className="flex justify-between font-medium px-4 italic text-sm">
                <span>সময়: {examInfo.time}</span>
                <span>পূর্ণমান: {examInfo.marks}</span>
              </div>
            </div>
          )}
        </div>

        <div style={{
          columnCount: isPrintMode ? columnCount : "1",
          columnGap: '40px',
          columnRule: (isPrintMode && columnCount === "2") ? '1px solid #000' : "none",
          width: '100%'
        }}>
          {groups.map((group) => (
            <React.Fragment key={group.id}>
              <div className="mb-1 break-inside-avoid-column border-b border-gray-100 pb-1">
                {isPrintMode ? (
                  <h3 className="font-bold underline" style={{ fontSize: '1.1em' }}>{group.title}</h3>
                ) : (
                  <div className="flex w-full gap-2 items-center">
                    <Input
                      className="font-bold text-lg w-full bg-slate-50 border-none focus:ring-0"
                      value={group.title}
                      onChange={e => setGroups(groups.map(g => g.id === group.id ? { ...g, title: e.target.value } : g))}
                    />
                    <Button variant="ghost" size="icon" className="text-red-500" onClick={() => deleteGroup(group.id)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>

              <div className={`mb-3`}>
                {group.questions.map((q, qIdx) => (
                  <div key={q.id + qIdx} className="group relative break-inside-avoid-column mb-0">
                    <div className="flex gap-2 items-start">

                      <span className={` font-bold min-w-[25px]  ${q.type !== "mcq" ? "my-0" : "font-bold mt-1"}`}>
                        {getQuestionNumber(qIdx)}
                      </span>

                      <div className="flex-1">
                        {isPrintMode ? (
                          <p className={`leading-tight ${q.type !== "mcq" ? "my-0" : "font-bold mt-1.5"} `}>{q.text}</p>
                        ) : (
                          <div className="flex flex-col gap-1">
                            <Input
                              className="h-8 border-slate-200"
                              value={q.text}
                              onChange={e => updateQuestion(group.id, q.id, { text: e.target.value })}
                            />
                            <div className="flex gap-2 items-center opacity-40 group-hover:opacity-100 transition-opacity">
                              <input type="file" id={`file-${q.id}`} hidden onChange={e => updateQuestion(group.id, q.id, { image: URL.createObjectURL(e.target.files[0]) })} />
                              <Button variant="ghost" size="xs" className="h-5 text-[9px] px-1" onClick={() => document.getElementById(`file-${q.id}`).click()}>
                                <ImageIcon className="h-3 w-3 mr-1" /> Image
                              </Button>
                              <Button variant="ghost" size="xs" className="h-5 text-[9px] px-1 text-red-500" onClick={() => setGroups(groups.map(g => g.id === group.id ? { ...g, questions: g.questions.filter(qu => qu.id !== q.id) } : g))}>
                                <Trash2 className="h-3 w-3 mr-1" /> Delete
                              </Button>
                            </div>
                          </div>
                        )}

                        {q.image && <img src={q.image} alt="Q" className="max-h-32 object-contain mt-1 rounded border" />}

                        {q.type === 'mcq' && (
                          <div className="grid grid-cols-2 gap-x-2 gap-y-1 mt-1 w-full">
                            {q.options.map((opt, oIdx) => (
                              <div
                                key={oIdx}
                                className="flex gap-1 items-start min-w-0"
                              >
                                {!isPrintMode ? (
                                  <>
                                    <span className="text-[10px] font-bold text-blue-500 mt-2 shrink-0">
                                      {getOptionBullet(oIdx)}
                                    </span>
                                    <Input
                                      className="h-7 text-xs flex-1"
                                      value={opt}
                                      onChange={e => {
                                        const newOpts = [...q.options];
                                        newOpts[oIdx] = e.target.value;
                                        updateQuestion(group.id, q.id, { options: newOpts });
                                      }}
                                    />
                                  </>
                                ) : (
                                  <div className="flex gap-1 items-baseline">
                                    <span className="font-semibold italic whitespace-nowrap shrink-0">
                                      {getOptionBullet(oIdx)}
                                    </span>

                                    <span className="leading-tight break-words">{opt}</span>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {!isPrintMode && (
                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="h-7 text-[10px]" onClick={() => addQuestion(group.id, 'mcq')}>+ MCQ</Button>
                    <Button variant="outline" size="sm" className="h-7 text-[10px]" onClick={() => addQuestion(group.id, 'written')}>+ Written</Button>
                  </div>
                )}
              </div>
            </React.Fragment>
          ))}
        </div>

        {!isPrintMode && (
          <Button onClick={addGroup} variant="outline" className="w-full border-dashed mt-6">
            + Add New Group Section
          </Button>
        )}
      </div>
    </div>
  );
};

export default QuestionBuilder;