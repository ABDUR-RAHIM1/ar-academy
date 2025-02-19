import React from 'react'

export default function Test() {
    function decodeBanglaText(text) {
        return decodeURIComponent(text);
      }
      
      function convertToSlug(text) {
        const decodedText = decodeBanglaText(text)
          .replace(/[^\w\u0980-\u09FF\s-]/g, '') // শুধুমাত্র বাংলা, ইংরেজি, সংখ্যা ও স্পেস/হাইফেন রাখবে
          .replace(/\s+/g, '-') // স্পেসকে `-` দিয়ে রিপ্লেস করবে
          .toLowerCase()
          .trim();
      
        return decodedText;
      }
      
      // Example usage:
      const encodedText = "বড়%20%2C%20ছোট%20তালিকা?chapter=সবচেয়ে+বড়দের+তালিকা";
      const slug = convertToSlug(encodedText);
      
      console.log(slug);

    return (
        <div>Test</div>
    )
}
