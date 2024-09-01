import axios from 'axios';

const handler = async (m, {conn, usedPrefix, command}) => {
  // جلب بيانات ميسي من الإنترنت
  const res = (await axios.get(`https://raw.githubusercontent.com/BrunoSobrino/TheMystic-Bot-MD/master/src/JSON/Messi.json`)).data;
  
  // اختيار صورة عشوائية من البيانات
  const url = await res[Math.floor(res.length * Math.random())];
  
  // إرسال الصورة إلى الدردشة مع تعليق يتضمن اسم الأمر ورابط قناتك على الواتساب
  conn.sendFile(m.chat, url, 'error.jpg', `*Messi*\n\nتابع قناتنا على الواتساب هنا: https://whatsapp.com/channel/0029VacrIfU3LdQdklKFR419`, m);
  
  // إرسال زر تكرار الرسالة (السطر معلق في الكود الأصلي)
  // conn.sendButton(m.chat, "*Messi*", author, url, [['⚽ التالي ⚽', `${usedPrefix + command}`]], m);
};

// تحديد الأوامر المساعدة، والتصنيف
handler.help = ['messi'];
handler.tags = ['الإنترنت'];
handler.command = /^(messi)$/i;

export default handler;
