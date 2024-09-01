import axios from 'axios'; // استيراد مكتبة axios لجلب البيانات من الإنترنت

const handler = async (m, {conn, usedPrefix, command}) => {
  // رابط قناتك على الواتساب
  const whatsappChannelLink = 'https://whatsapp.com/channel/0029VacrIfU3LdQdklKFR419';

  // جلب بيانات كريستيانو رونالدو من الإنترنت
  const cristiano = (await axios.get(`https://raw.githubusercontent.com/BrunoSobrino/TheMystic-Bot-MD/master/src/JSON/CristianoRonaldo.json`)).data;

  // اختيار صورة عشوائية من البيانات
  const ronaldo = cristiano[Math.floor(cristiano.length * Math.random())];

  // إرسال الصورة إلى الدردشة
  conn.sendFile(m.chat, ronaldo, 'error.jpg', `*Siiiuuuuuu* \n\nتابع قناتنا على الواتساب هنا: ${whatsappChannelLink}`, m);
};

// تحديد الأوامر المساعدة، التصنيف، والنمط الذي يستجيب له المعالج
handler.help = ['cristianoronaldo', 'cr7'];
handler.tags = ['الإنترنت'];
handler.command = /^(cristianoronaldo|cr7)$/i;

// تصدير المعالج
export default handler;
