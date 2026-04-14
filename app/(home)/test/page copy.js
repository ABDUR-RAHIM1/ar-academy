"use client"
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Printer, Trash2, Image as ImageIcon, Eye, Edit3, Columns, X, Settings } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const AcademicQuestionBuilder = () => {
  const [isPrintMode, setIsPrintMode] = useState(false);
  const [columnCount, setColumnCount] = useState("1");

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

  // --- Logic Functions ---
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

  const updateQuestion = (gId, qId, data) => {
    setGroups(groups.map(g => g.id === gId ? {
      ...g, questions: g.questions.map(q => q.id === qId ? { ...q, ...data } : q)
    } : g));
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">

      {/* কন্ট্রোল প্যানেল (প্রিন্ট হবে না) */}
      <div className="max-w-4xl mx-auto mb-6 flex flex-wrap gap-4 items-center justify-between bg-white p-4 rounded-xl shadow-sm print:hidden">
        <div className="flex gap-2">
          <Button variant={!isPrintMode ? "default" : "outline"} onClick={() => setIsPrintMode(false)}>
            <Edit3 className="mr-2 h-4 w-4" /> Builder
          </Button>
          <Button variant={isPrintMode ? "default" : "outline"} onClick={() => setIsPrintMode(true)}>
            <Eye className="mr-2 h-4 w-4" /> Preview
          </Button>
        </div>

        <div>
          <Button variant="outline" className={"flex items-center justify-center gal-2"}>
            Settings
            <Settings />
          </Button>
        </div>
        <div className="flex items-center gap-4">
          <Select value={columnCount} onValueChange={setColumnCount}>
            <SelectTrigger className="w-[120px]">
              <Columns className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 Column</SelectItem>
              <SelectItem value="2">2 Columns</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={() => window.print()} className="bg-blue-600 hover:bg-blue-700 text-white">
            <Printer className="w-4 h-4 mr-2" /> Print
          </Button>
        </div>
      </div>

      {/* কোয়েশ্চেন পেপার এরিয়া */}
      <div className={`max-w-[8.5in] mx-auto bg-white shadow-2xl p-[0.5in] md:p-[0.75in] min-h-[11in] relative ${isPrintMode ? 'print:shadow-none print:p-0' : ''}`}>

        {/* Set Number - Fixed position for professional look */}
        {examInfo.set && isPrintMode && (
          <div className="absolute right-[0.5in] top-[0.5in] border-2 border-black px-3 py-1 font-bold text-lg bg-white z-10">
            সেট: {examInfo.set}
          </div>
        )}

        {/* Header Section */}
        <div className="text-center space-y-2 border-b-2 border-black pb-4 mb-6 pt-4">
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
            <>
              <h1 className="text-2xl font-bold mb-1">{examInfo.instituteName}</h1>
              <h1 className="text-2xl font-[400] uppercase">{examInfo.title}</h1>
              <h2 className="text-xl font-[400]">বিষয়: {examInfo.subject}</h2>
              <div className="flex justify-between font-medium pt-2 px-4 italic text-sm">
                <span>সময়: {examInfo.time}</span>
                <span>পূর্ণমান: {examInfo.marks}</span>
              </div>
            </>
          )}
        </div>

        {/* Main Column Wrapper - This enables true auto-flowing columns */}
        <div style={{
          columnCount: isPrintMode ? columnCount : "1",
          columnGap: '40px',
          columnRule: (isPrintMode && columnCount === "2") ? '1px solid #000' : "none",
          width: '100%'
        }}>

          {groups.map((group) => (
            <React.Fragment key={group.id}>
              {/* Group Title Section */}
              <div className="mb-4 break-inside-avoid-column border-b border-gray-100 pb-1">
                {isPrintMode ? (
                  <h3 className="font-bold text-[12pt] underline">{group.title}</h3>
                ) : (
                  <div className="flex w-full gap-2 items-center">
                    <Input
                      className="font-bold text-lg w-full bg-slate-50 border-none focus:ring-0"
                      value={group.title}
                      onChange={e => setGroups(groups.map(g => g.id === group.id ? { ...g, title: e.target.value } : g))}
                    />
                    <Button variant="ghost" size="icon" className="text-red-500 print:hidden" onClick={() => deleteGroup(group.id)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>

              {/* Questions within the flow */}
              <div className="space-y-2 mb-6">
                {group.questions.map((q, qIdx) => (
                  <div key={q.id} className="group relative break-inside-avoid-column mb-0">
                    <div className="flex gap-2 items-start">
                      <span className="font-bold text-sm min-w-[20px]">{qIdx + 1}.</span>
                      <div className="flex-1">
                        {isPrintMode ? (
                          <p className={`text-[11pt] leading-tight ${q.type !== "mcq" ? "" :"font-bold mb-0"} `}>{q.text}</p>
                        ) : (
                          <>
                            <Input
                              className="h-8 border-slate-200"
                              placeholder="Type question..."
                              value={q.text}
                              onChange={e => updateQuestion(group.id, q.id, { text: e.target.value })}
                            />
                            {!isPrintMode && (
                              <div className="flex gap-2 mt-2 print:hidden">
                                <input type="file" id={`file-${q.id}`} hidden onChange={e => updateQuestion(group.id, q.id, { image: URL.createObjectURL(e.target.files[0]) })} />
                                <Button variant="ghost" size="xs" className="h-6 text-[10px]" onClick={() => document.getElementById(`file-${q.id}`).click()}>
                                  <ImageIcon className="h-3 w-3 mr-1" /> Add Image
                                </Button>
                              </div>
                            )}
                          </>
                        )}

                        {q.image && (
                          <div className="relative inline-block mt-2">
                            <img src={q.image} alt="Q" className="max-h-40 object-contain rounded border" />
                            {!isPrintMode && (
                              <button onClick={() => updateQuestion(group.id, q.id, { image: null })} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5"><X size={12} /></button>
                            )}
                          </div>
                        )}

                        {q.type === 'mcq' && (
                          <div className={`grid ${columnCount === "2" && isPrintMode ? "grid-cols-1" : "grid-cols-2"} gap-x-4 gap-y-1 mt-1`}>
                            {q.options.map((opt, oIdx) => (
                              <div key={oIdx} className="text-[10pt] flex gap-1">
                                {!isPrintMode ? (
                                  <Input
                                    className="h-7 text-xs"
                                    placeholder={`Option ${oIdx + 1}`}
                                    value={opt}
                                    onChange={e => {
                                      const newOpts = [...q.options];
                                      newOpts[oIdx] = e.target.value;
                                      updateQuestion(group.id, q.id, { options: newOpts });
                                    }}
                                  />
                                ) : (
                                  <>
                                    <span className="font-semibold italic">({String.fromCharCode(2466 + oIdx)})</span>
                                    <span>{opt}</span>
                                  </>
                                )}
                              </div>
                            ))}
                          </div>
                        )}


                      </div>
                    </div>

                    {!isPrintMode && (
                      <Button
                        variant="ghost" size="icon"
                        className="absolute -right-8 top-0 text-red-300 opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6"
                        onClick={() => setGroups(groups.map(g => g.id === group.id ? { ...g, questions: g.questions.filter(qu => qu.id !== q.id) } : g))}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                ))}

                {!isPrintMode && (
                  <div className="flex gap-2 print:hidden pb-4">
                    <Button variant="outline" size="sm" className="h-7 text-[11px]" onClick={() => addQuestion(group.id, 'mcq')}>+ MCQ</Button>
                    <Button variant="outline" size="sm" className="h-7 text-[11px]" onClick={() => addQuestion(group.id, 'written')}>+ Written</Button>
                  </div>
                )}
              </div>
            </React.Fragment>
          ))}
        </div>

        {!isPrintMode && (
          <Button onClick={addGroup} variant="outline" className="w-full border-dashed mt-6 print:hidden">
            + Add New Group Section
          </Button>
        )}
      </div>

      <style jsx global>{`
        @media print {
          body { background: white !important; }
          .print\:hidden { display: none !important; }
          @page { size: A4; margin: 0; }
          #print-area { padding: 0.5in !important; }
        }
        .break-inside-avoid-column { 
          break-inside: avoid-column; 
          display: block; /* Ensures the avoid-break rule is respected */
        }
      `}</style>
    </div>
  );
};

export default AcademicQuestionBuilder;