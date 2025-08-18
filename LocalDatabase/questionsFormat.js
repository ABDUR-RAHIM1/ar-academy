

 export const questionFormatTypes = { 
  bangla: {
    bullets: ["ক)", "খ)", "গ)", "ঘ)", "ঙ)", "চ)", "ছ)", "জ)", "ঝ)", "ঞ)"],
    serial: Array.from({ length: 100 }, (_, i) => (i + 1).toLocaleString("bn-BD")+"।")
  },
  english: {
    bullets: ["a)", "b)", "c)", "d)", "e)", "f)", "g)", "h)", "i)", "j)"],
    serial: Array.from({ length: 100 }, (_, i) => `${i + 1}.`)
  },
  math: {
    bullets: ["i)", "ii)", "iii)", "iv)", "v)", "vi)", "vii)", "viii)", "ix)", "x)"],
    serial: Array.from({ length: 100 }, (_, i) => `${i + 1})`)
  }
};

