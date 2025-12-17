"use client";
import React, { useState } from "react";

export default function TestPage() {
  const [groups, setGroups] = useState([]);

  const [activeType, setActiveType] = useState("mcq");
  const [heading, setHeading] = useState("");
  const [instruction, setInstruction] = useState("");

  const [questionText, setQuestionText] = useState("");
  const [mcqOptions, setMcqOptions] = useState("");

  const getActiveGroup = () =>
    groups.find((g) => g.type === activeType);

  const createGroupIfNotExists = () => {
    const exists = getActiveGroup();
    if (exists) return exists;

    const newGroup = {
      id: Date.now(),
      type: activeType,
      heading,
      instruction,
      questions: [],
    };

    setGroups((prev) => [...prev, newGroup]);
    return newGroup;
  };

  const addQuestion = () => {
    if (!questionText) return;
    console.log("click")
    const group = createGroupIfNotExists();

    setGroups((prev) =>
      prev.map((g) =>
        g.id === group.id
          ? {
            ...g,
            questions: [
              ...g.questions,
              {
                id: Date.now(),
                text: questionText,
                options:
                  g.type === "mcq"
                    ? mcqOptions
                      .split(",")
                      .map((o) => o.trim())
                    : null,
              },
            ],
          }
          : g
      )
    );

    setQuestionText("");
    setMcqOptions("");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6 flex gap-8">
        {/* LEFT FIXED PANEL */}
        <div className="w-[360px] sticky top-6 h-fit">
          <div className="bg-white rounded-xl shadow-md border p-5 space-y-4">
            <h2 className="text-lg font-bold text-gray-800 border-b pb-2">
              Question Builder
            </h2>

            <div>
              <label className="text-sm font-medium text-gray-600">
                Question Type
              </label>
              <select
                className="w-full mt-1 border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                value={activeType}
                onChange={(e) => setActiveType(e.target.value)}
              >
                <option value="mcq">MCQ</option>
                <option value="cq">CQ</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600">
                Group Heading
              </label>
              <input
                className="w-full mt-1 border rounded-lg p-2"
                placeholder="সংক্ষিপ্ত প্রশ্ন"
                value={heading}
                onChange={(e) => setHeading(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600">
                Instruction
              </label>
              <input
                className="w-full mt-1 border rounded-lg p-2"
                placeholder="যেকোনো ৫টি প্রশ্নের উত্তর দিন"
                value={instruction}
                onChange={(e) => setInstruction(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600">
                Question
              </label>
              <textarea
                className="w-full mt-1 border rounded-lg p-2 min-h-[80px]"
                placeholder="প্রশ্ন লিখুন..."
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
              />
            </div>

            {activeType === "mcq" && (
              <div>
                <label className="text-sm font-medium text-gray-600">
                  MCQ Options
                </label>
                <input
                  className="w-full mt-1 border rounded-lg p-2"
                  placeholder="আম, জাম, কাঁঠাল, লিচু"
                  value={mcqOptions}
                  onChange={(e) => setMcqOptions(e.target.value)}
                />
                <p className="text-xs text-gray-400 mt-1">
                  কমা (,) দিয়ে আলাদা করুন
                </p>
              </div>
            )}

            <button
              onClick={addQuestion}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition"
            >
              ➕ Add Question
            </button>
          </div>
        </div>

        {/* RIGHT PREVIEW PANEL */}
        <div className="flex-1 space-y-10">
          {groups.length === 0 && (
            <div className="text-center text-gray-400 mt-20">
              এখনো কোনো প্রশ্ন যোগ করা হয়নি
            </div>
          )}

          {groups.map((group) => (
            <div
              key={group.id}
              className="bg-white rounded-xl shadow-sm border"
            >
              {/* Group Header */}
              <div className="border-b bg-gray-100 rounded-t-xl px-6 py-4">
                <h3 className="text-lg font-bold text-gray-800">
                  {group.heading}
                </h3>
                <p className="text-sm text-gray-600">
                  {group.instruction}
                </p>
              </div>

              {/* Questions */}
              <div className="p-6 space-y-5">
                {group.questions.map((q, index) => (
                  <div key={q.id}>
                    <p className="font-medium text-gray-800">
                      {index + 1}. {q.text}
                    </p>

                    {group.type === "mcq" && (
                      <ul className="mt-2 ml-6 space-y-1 text-sm text-gray-700">
                        {q.options.map((op, i) => (
                          <li key={i}>
                            {String.fromCharCode(65 + i)}. {op}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
