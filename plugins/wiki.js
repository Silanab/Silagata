import axios from 'axios';
import cheerio from 'cheerio';
import fs from 'fs';  // إضافة استيراد مكتبة fs

const channelLink = "https://whatsapp.com/channel/0029VacrIfU3LdQdklKFR419";  // رابط قناتك
const imageUrl = "https://telegra.ph/file/f0cf8100d684d80d48c27.jpg";  // رابط الصورة

async function wikipedia(query, datas) {
  const idioma = datas.db.data.users[m.sender].language;  // الحصول على لغة المستخدم
  const _translate = JSON.parse(fs.readFileSync(`./src/languages/${idioma}.json`));  // قراءة ملف الترجمة المناسب
  const tradutor = _translate.plugins.buscador_wikipedia;

  try {
    // إرسال طلب إلى ويكيبيديا باستخدام العنوان المقدم من المستخدم
    const link = await axios.get(`https://es.wikipedia.org/wiki/${encodeURIComponent(query)}`);
    const $ = cheerio.load(link.data);  // تحميل محتوى الصفحة باستخدام cheerio
    const judul = $('#firstHeading').text().trim();  // استخراج العنوان الرئيسي للصفحة
    const thumb = $('#mw-content-text').find('div.mw-parser-output > div:nth-child(1) > table > tbody > tr:nth-child(2) > td > a > img').attr('src') || `//i.ibb.co/nzqPBpC/http-error-404-not-found.png`;  // استخراج رابط الصورة الرئيسية أو استخدام صورة افتراضية
    const isi = [];
    // استخراج كل الفقرات النصية في الصفحة
    $('#mw-content-text > div.mw-parser-output > p').each(function() {
      const penjelasan = $(this).text().trim();  // استخراج النص من كل فقرة
      if (penjelasan) {
        isi.push(penjelasan);  // إضافة النصوص إلى المصفوفة
      }
    });

    // إرجاع النتيجة بما في ذلك العنوان، الرابط إلى الصورة، والنصوص
    return {
      status: link.status,
      result: {
        judul: judul,
        thumb: 'https:' + thumb,
        isi: isi.join('\n\n')  // دمج النصوص مع فواصل بين الفقرات
      }
    };
  } catch (err) {
    // معالجة الأخطاء في حال فشل الطلب
    return {
      status: err.response ? err.response.status : 500,
      Pesan: err.message
    };
  }
}

// معالج للأوامر المستخدمة لاسترجاع المعلومات من ويكيبيديا
const handler = async (m, { conn, text, usedPrefix, command, datas }) => {
  const idioma = datas.db.data.users[m.sender].language;  // الحصول على لغة المستخدم
  const _translate = JSON.parse(fs.readFileSync(`./src/languages/${idioma}.json`));  // قراءة ملف الترجمة المناسب
  const tradutor = _translate.plugins.buscador_wikipedia;

  // التحقق مما إذا كان النص مدخلًا وإظهار رسالة في حال عدم وجوده
  if (!text) throw `*${tradutor.texto1[0]}* ${usedPrefix + command} ${tradutor.texto1[1]} *${usedPrefix + command} Estrellas*`;

  try {
    const res = await wikipedia(text, datas);  // استدعاء دالة wikipedia لجلب المعلومات
    // إرسال الرد للمستخدم مع تضمين رابط القناة والصورة
    m.reply(`*${tradutor.texto2}*\n\n${res.result.isi}\n\nللمزيد من المعلومات، قم بزيارة قناتي: ${channelLink}\n\n![Image](${imageUrl})`);
  } catch {
    // إرسال رسالة خطأ في حال فشل الجلب مع تضمين رابط القناة والصورة
    m.reply(`*${tradutor.texto3}*\n\nللمزيد من المساعدة، قم بزيارة قناتي: ${channelLink}\n\n![Image](${imageUrl})`);
  }
};

// تحديد الأوامر المدعومة والمرتبطة بهذه الدالة
handler.help = ['wikipedia'].map((v) => v + ' <apa>');
handler.tags = ['internet'];
handler.command = /^(wiki|wikipedia)$/i;

// تصدير المعالج ليتمكن من استخدامه في أماكن أخرى
export default handler;
