
const translations = {
  hi: {
    "Car Travel Services Billing System": "कार यात्रा सेवा बिलिंग प्रणाली",
    "Register": "पंजीकरण करें",
    "Login": "लॉग इन करें",
    "Logout": "लॉगआउट",
    "Add Expense": "खर्च जोड़ें",
    "Your Expenses": "आपके खर्च",
    "Total (USD)": "कुल (USD)",
    "Total (INR)": "कुल (INR)"
  },
  bn: {
    "Car Travel Services Billing System": "গাড়ি ভ্রমণ সেবার বিলিং সিস্টেম",
    "Register": "নিবন্ধন করুন",
    "Login": "লগইন করুন",
    "Logout": "লগআউট",
    "Add Expense": "খরচ যুক্ত করুন",
    "Your Expenses": "আপনার খরচ",
    "Total (USD)": "মোট (USD)",
    "Total (INR)": "মোট (INR)"
  },
  ur: {
    "Car Travel Services Billing System": "کار ٹریول سروسز بلنگ سسٹم",
    "Register": "رجسٹر کریں",
    "Login": "لاگ ان کریں",
    "Logout": "لاگ آؤٹ",
    "Add Expense": "خرچ شامل کریں",
    "Your Expenses": "آپ کے اخراجات",
    "Total (USD)": "کل (USD)",
    "Total (INR)": "کل (INR)"
  },
  zh: {
    "Car Travel Services Billing System": "汽车旅行服务计费系统",
    "Register": "注册",
    "Login": "登录",
    "Logout": "登出",
    "Add Expense": "添加支出",
    "Your Expenses": "你的支出",
    "Total (USD)": "总计 (USD)",
    "Total (INR)": "总计 (INR)"
  }
};

function switchLanguage(lang) {
  const elements = document.body.querySelectorAll("*");
  elements.forEach(el => {
    const text = el.innerText.trim();
    if (translations[lang] && translations[lang][text]) {
      el.innerText = translations[lang][text];
    }
  });
}
