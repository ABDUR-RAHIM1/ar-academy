export const classes = [
  { _id: "class1", name: "শ্রেণি ১" },
  { _id: "class2", name: "শ্রেণি ২" },
];

export const subjects = [
  { _id: "sub1", classId: "class1", name: "গণিত" },
  { _id: "sub2", classId: "class1", name: "বাংলা" },
  { _id: "sub3", classId: "class1", name: "ইংরেজি" },

  { _id: "sub4", classId: "class2", name: "পদার্থবিজ্ঞান" },
  { _id: "sub5", classId: "class2", name: "রসায়ন" },
  { _id: "sub6", classId: "class2", name: "জীববিজ্ঞান" },
];

export const chaptersList = [
  // class 1 subjects chapters
  { _id: "chap1", subjectId: "sub1", name: "সংখ্যা" },
  { _id: "chap2", subjectId: "sub1", name: "জ্যামিতি" },

  { _id: "chap3", subjectId: "sub2", name: "ব্যাকরণ" },
  { _id: "chap4", subjectId: "sub2", name: "গদ্য ও পদ্য" },

  { _id: "chap5", subjectId: "sub3", name: "Vocabulary" },
  { _id: "chap6", subjectId: "sub3", name: "Grammar" },

  // class 2 subjects chapters
  { _id: "chap7", subjectId: "sub4", name: "গতি" },
  { _id: "chap8", subjectId: "sub4", name: "শক্তি" },

  { _id: "chap9", subjectId: "sub5", name: "অ্যাসিড ও বেস" },
  { _id: "chap10", subjectId: "sub5", name: "রসায়ন বন্ধন" },

  { _id: "chap11", subjectId: "sub6", name: "প্রাণীজগৎ" },
  { _id: "chap12", subjectId: "sub6", name: "উদ্ভিদজগৎ" },
];

export const questionsList = [
  // chap1 সংখ্যা (Class 1 - গণিত)
  {
    _id: "q1",
    chapterId: "chap1",
    questionText: "৫ + ৩ কত?",
    options: ["৭", "৮", "৯", "১০"],
    correctOption: "৮",
  },
  {
    _id: "q2",
    chapterId: "chap1",
    questionText: "১০ থেকে ৪ বিয়োগ করলে কত পাওয়া যায়?",
    options: ["৬", "৭", "৫", "৮"],
    correctOption: "৬",
  },

  // chap2 জ্যামিতি
  {
    _id: "q3",
    chapterId: "chap2",
    questionText: "একটি বৃত্তের ব্যাসার্ধ কী দ্বারা পরিমাপ করা হয়?",
    options: ["মিটার", "সেন্টিমিটার", "ডিগ্রী", "লিটার"],
    correctOption: "সেন্টিমিটার",
  },
  {
    _id: "q4",
    chapterId: "chap2",
    questionText: "ত্রিভুজের বাহুগুলোর যোগফল কত?",
    options: ["১০", "১২০", "১৮০", "৩৬০"],
    correctOption: "১৮০",
  },

  // chap3 ব্যাকরণ (বাংলা)
  {
    _id: "q5",
    chapterId: "chap3",
    questionText: "বাক্যে কোনটি বিশেষণ?",
    options: ["বড়", "খেলা", "দৌড়ানো", "খাবার"],
    correctOption: "বড়",
  },
  {
    _id: "q6",
    chapterId: "chap3",
    questionText: "বাংলা বর্ণমালায় কতটি স্বরবর্ণ আছে?",
    options: ["১১", "১২", "১৩", "১৪"],
    correctOption: "১১",
  },

  // chap4 গদ্য ও পদ্য (বাংলা)
  {
    _id: "q7",
    chapterId: "chap4",
    questionText: "কবি কাজী নজরুল ইসলামের কৃতিত্ব কোনটি?",
    options: [
      "বাংলার জাতীয় কবি",
      "বিদ্রোহী কবি",
      "বঙ্গবন্ধু",
      "জাতীয় অধ্যাপক",
    ],
    correctOption: "বিদ্রোহী কবি",
  },
  {
    _id: "q8",
    chapterId: "chap4",
    questionText: "পদ্য কবিতার বৈশিষ্ট্য কী?",
    options: ["ছন্দ", "গদ্য", "নাটক", "গীতিকবিতা"],
    correctOption: "ছন্দ",
  },

  // chap5 Vocabulary (ইংরেজি)
  {
    _id: "q9",
    chapterId: "chap5",
    questionText: "What is the synonym of 'Happy'?",
    options: ["Sad", "Joyful", "Angry", "Tired"],
    correctOption: "Joyful",
  },
  {
    _id: "q10",
    chapterId: "chap5",
    questionText: "What is the antonym of 'Big'?",
    options: ["Small", "Large", "Tall", "Short"],
    correctOption: "Small",
  },

  // chap6 Grammar (ইংরেজি)
  {
    _id: "q11",
    chapterId: "chap6",
    questionText: "Identify the noun in the sentence: 'The cat sleeps.'",
    options: ["cat", "sleeps", "the", "is"],
    correctOption: "cat",
  },
  {
    _id: "q12",
    chapterId: "chap6",
    questionText: "Choose the correct verb form: 'She ___ running.'",
    options: ["is", "are", "am", "be"],
    correctOption: "is",
  },

  // chap7 গতি (পদার্থবিজ্ঞান)
  {
    _id: "q13",
    chapterId: "chap7",
    questionText: "বেগের একক কী?",
    options: ["মিটার/সেকেন্ড", "কেজি", "সেকেন্ড", "লিটার"],
    correctOption: "মিটার/সেকেন্ড",
  },
  {
    _id: "q14",
    chapterId: "chap7",
    questionText: "যদি একটি বস্তুর গতি স্থির থাকে, তার ত্বরণ কত?",
    options: ["০", "১", "৫", "১০"],
    correctOption: "০",
  },

  // chap8 শক্তি
  {
    _id: "q15",
    chapterId: "chap8",
    questionText: "শক্তির একক কী?",
    options: ["জুল", "ওয়াট", "নিউটন", "মিটার"],
    correctOption: "জুল",
  },
  {
    _id: "q16",
    chapterId: "chap8",
    questionText: "কোন শক্তি চালিত হয় পরিবহন মাধ্যমে?",
    options: ["বিদ্যুৎ শক্তি", "রসায়ন শক্তি", "যান্ত্রিক শক্তি", "তাপ শক্তি"],
    correctOption: "যান্ত্রিক শক্তি",
  },

  // chap9 অ্যাসিড ও বেস
  {
    _id: "q17",
    chapterId: "chap9",
    questionText: "অ্যাসিডের স্বাদ কেমন?",
    options: ["তিতা", "মিষ্টি", "খারাপ", "অম্লতা"],
    correctOption: "অম্লতা",
  },
  {
    _id: "q18",
    chapterId: "chap9",
    questionText: "pH মান ৭ এর নিচে হলে কি হয়?",
    options: ["অ্যাসিডিক", "তটস্থ", "ক্ষারীয়", "নিরপেক্ষ"],
    correctOption: "অ্যাসিডিক",
  },

  // chap10 রসায়ন বন্ধন
  {
    _id: "q19",
    chapterId: "chap10",
    questionText: "জলীয় বন্ধন কি?",
    options: ["আয়নিক বন্ধন", "কোভ্যালেন্ট বন্ধন", "ধ্রুবক বন্ধন", "পানি বন্ধন"],
    correctOption: "কোভ্যালেন্ট বন্ধন",
  },
  {
    _id: "q20",
    chapterId: "chap10",
    questionText: "আয়নিক বন্ধন গঠন করে কোনটি?",
    options: ["NaCl", "H2O", "CO2", "O2"],
    correctOption: "NaCl",
  },

  // chap11 প্রাণীজগৎ
  {
    _id: "q21",
    chapterId: "chap11",
    questionText: "মানব দেহের সবচেয়ে বড় অঙ্গ কোনটি?",
    options: ["হৃদয়", "মস্তিষ্ক", "ত্বক", "ফুসফুস"],
    correctOption: "ত্বক",
  },
  {
    _id: "q22",
    chapterId: "chap11",
    questionText: "কোন প্রাণী উড়তে পারে?",
    options: ["হাতি", "গরু", "পাখি", "কুমির"],
    correctOption: "পাখি",
  },

  // chap12 উদ্ভিদজগৎ
  {
    _id: "q23",
    chapterId: "chap12",
    questionText: "গাছ কী দ্বারা পুষ্টি গ্রহণ করে?",
    options: ["মূল", "পাতা", "তना", "ফুল"],
    correctOption: "মূল",
  },
  {
    _id: "q24",
    chapterId: "chap12",
    questionText: "সৌরশক্তি গাছের কোন অংশে রূপান্তরিত হয়?",
    options: ["পাতা", "মূল", "ফুল", "তনা"],
    correctOption: "পাতা",
  },
];
