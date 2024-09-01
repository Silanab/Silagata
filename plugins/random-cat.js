import fetch from 'node-fetch';

const handler = async (m, {conn, text}) => {
  try {
    // جلب صورة عشوائية من API للقطط
    const res = await fetch('https://api.thecatapi.com/v1/images/search');
    const img = await res.json();
    
    // إعداد النص التعريفي مع رابط قناتك على الواتساب
    const caption = `
_©The Mystic - Bot_
تابع قناتنا على الواتساب هنا: https://whatsapp.com/channel/0029VacrIfU3LdQdklKFR419
`.trim();
    
    // إرسال الصورة إلى الدردشة
    conn.sendFile(m.chat, img[0].url, 'cat.jpg', caption, m);
  } catch (e) {
    // تسجيل الخطأ وإلقاء استثناء
    console.log(e);
    throw '*خطأ!*';
  }
};

// تحديد الأوامر المساعدة، والتصنيف
handler.help = ['cat'];
handler.tags = ['عشوائي'];
handler.command = /^cat$/i;
handler.fail = null;

export default handler;
