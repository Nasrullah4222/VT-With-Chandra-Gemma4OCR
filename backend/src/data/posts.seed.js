/**
 * Starter blog posts. Used to seed MongoDB on first run, and served directly
 * when MONGO_URI is not configured yet.
 */
export const seedPosts = [
  {
    slug: "convert-handwritten-bengali-to-text",
    title: "How to Convert Handwritten Bengali to Text with AI",
    excerpt:
      "A practical walkthrough of turning a photo of handwritten Bengali into editable digital text, and how to get cleaner results.",
    category: "Guide",
    language: "en",
    readMinutes: 5,
    publishedAt: new Date("2026-10-08"),
    sections: [
      {
        heading: "Why handwriting is harder than print",
        paragraphs: [
          "Printed text uses consistent letter shapes, so classic OCR handles it well. Handwriting varies from person to person, and Bengali adds joined letters, vowel signs above and below the line, and the matra that connects characters.",
          "Modern vision-language models read the whole page in context instead of matching isolated shapes, which is why they cope with messy handwriting far better than older engines.",
        ],
      },
      {
        heading: "Step by step",
        paragraphs: [
          "Photograph the page in even light with the paper flat. Upload the image on the home page and wait for processing to finish.",
          "Review the extracted passages. Each paragraph appears as its own block, with the detected language and an English translation for Bengali text. Copy the text or download it as TXT, Markdown or JSON.",
        ],
      },
      {
        heading: "Getting cleaner results",
        paragraphs: [
          "Avoid shadows and glare, crop out the desk, and keep the image sharp. If a result looks off, re-shoot at a higher resolution before blaming the model.",
          "Always proofread names, dates and numbers. They are the details that matter most and the easiest to misread.",
        ],
      },
    ],
  },
  {
    slug: "ocr-vs-icr-printed-vs-handwritten",
    title: "OCR vs ICR: Reading Print and Reading Handwriting",
    excerpt:
      "Two related technologies, two different jobs. Learn which one your documents actually need.",
    category: "Explainer",
    language: "en",
    readMinutes: 4,
    publishedAt: new Date("2026-10-05"),
    sections: [
      {
        heading: "OCR in one paragraph",
        paragraphs: [
          "Optical character recognition converts images of printed text into machine-readable characters. It works best on clean, uniform fonts such as books, invoices and typed forms.",
        ],
      },
      {
        heading: "Where ICR comes in",
        paragraphs: [
          "Intelligent character recognition targets handwriting. Because every writer is different, it relies on learned models rather than fixed templates, and it usually reports a confidence level so you know what to double-check.",
        ],
      },
      {
        heading: "Which one do you need?",
        paragraphs: [
          "If your documents are typed, plain OCR is enough. If they contain handwritten notes, filled-in forms or mixed content, you need handwriting-aware recognition. This app handles both Bengali and English in the same document.",
        ],
      },
    ],
  },
  {
    slug: "chobi-theke-bangla-lekha-ber-korar-dhap",
    title: "ছবি থেকে বাংলা লেখা বের করার ধাপগুলো",
    excerpt:
      "স্ক্যান বা ছবি থেকে বাংলা ও ইংরেজি লেখা ডিজিটাল টেক্সটে রূপান্তর করার সহজ নির্দেশিকা।",
    category: "বাংলা",
    language: "bn",
    readMinutes: 3,
    publishedAt: new Date("2026-10-02"),
    sections: [
      {
        heading: "শুরুর আগে",
        paragraphs: [
          "পরিষ্কার আলোতে তোলা ছবি সবচেয়ে ভালো ফল দেয়। কাগজ যেন সমতল থাকে এবং লেখা ঝাপসা না হয়, সেদিকে খেয়াল রাখুন।",
        ],
      },
      {
        heading: "ধাপে ধাপে",
        paragraphs: [
          "প্রথমে ছবি বা পিডিএফ ফাইলটি আপলোড অংশে ফেলুন। কিছুক্ষণের মধ্যেই সিস্টেম লেখা শনাক্ত করে অনুচ্ছেদ অনুযায়ী সাজিয়ে দেখাবে।",
          "ফলাফল দেখার পর প্রয়োজনে টেক্সট কপি করুন অথবা JSON ও টেক্সট ফাইল হিসেবে ডাউনলোড করুন।",
        ],
      },
      {
        heading: "ভুল কমানোর উপায়",
        paragraphs: [
          "হাতের লেখা খুব ছোট বা কাছাকাছি হলে ছবির রেজোলিউশন বাড়ান। শেষে গুরুত্বপূর্ণ তথ্য, যেমন নাম ও সংখ্যা, একবার মিলিয়ে নিন।",
        ],
      },
    ],
  },
];
