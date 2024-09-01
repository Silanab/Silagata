import fetch from 'node-fetch';

const handler = async (m, {conn, text}) => {
  try {
    // جلب صورة عشوائية من API للكلاب
    const res = await fetch('https://api.thedogapi.com/v1/images/search');
    const img = await res.json();
    
    // إعداد النص التعريفي مع رابط قناتك على الواتساب
    const caption = `_©The Mystic - Bot_ \n\nتابع قناتنا على الواتساب هنا: https://whatsapp.com/channel/0029VacrIfU3LdQdklKFR419`.trim();
    
    // إرسال الصورة إلى الدردشة
    conn.sendFile(m.chat, img[0].url, 'dog.jpg', caption, m);
  } catch {
    // معالجة الأخطاء
    throw '*خطأ!*';
  }
};

// تحديد الأوامر المساعدة، والتصنيف
handler.help = ['dog'];
handler.tags = ['عشوائي'];
handler.command = /^dog$/i;
handler.fail = null;

export default handler;
