import axios from 'axios';

const handler = async (m, {command, conn, usedPrefix}) => {
  // جلب بيانات الأنمي من الإنترنت بناءً على الأمر
  const res = (await axios.get(`https://raw.githubusercontent.com/BrunoSobrino/TheMystic-Bot-MD/master/src/JSON/anime-${command}.json`)).data;
  
  // اختيار صورة عشوائية من البيانات
  const haha = await res[Math.floor(res.length * Math.random())];
  
  // إرسال الصورة إلى الدردشة مع تعليق يتضمن اسم الأمر
  conn.sendFile(m.chat, haha, 'error.jpg', `_${command}_\n\nتابع قناتنا على الواتساب هنا: https://whatsapp.com/channel/0029VacrIfU3LdQdklKFR419`, m);
  
  // إرسال زر تكرار الرسالة
  conn.sendButton(m.chat, `_${command}_`.trim(), 'Author', haha, [['🔄 التالي 🔄', `${usedPrefix + command}`]], m);
};

// تحديد الأوامر المساعدة، والتصنيف
handler.command = handler.help = ['akira', 'akiyama', 'anna', 'asuna', 'ayuzawa', 'boruto', 'chiho', 'chitoge', 'deidara', 'erza', 'elaina', 'eba', 'emilia', 'hestia', 'hinata', 'inori', 'isuzu', 'itachi', 'itori', 'kaga', 'kagura', 'kaori', 'keneki', 'kotori', 'kurumi', 'madara', 'mikasa', 'miku', 'minato', 'naruto', 'nezuko', 'sagiri', 'sasuke', 'sakura', 'cosplay'];
handler.tags = ['anime'];

export default handler;
