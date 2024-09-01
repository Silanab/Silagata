import {sticker, addExif} from '../src/libraries/sticker.js';
import {Sticker} from 'wa-sticker-formatter';
import fetch from 'node-fetch';
import got from 'got';
import cheerio from 'cheerio';

const CHANNEL_LINK = 'https://whatsapp.com/channel/0029VacrIfU3LdQdklKFR419';

// معالج الأوامر
const handler = async (m, {usedPrefix, conn, args, text, command}) => {
  const datas = global;
  const idioma = datas.db.data.users[m.sender].language;
  const _translate = JSON.parse(fs.readFileSync(`./src/languages/${idioma}.json`));
  const tradutor = _translate.plugins.sticker_semoji;

  let [tipe, emoji] = text.includes('|') ? text.split('|') : args;
  const defaultType = 'apple';
  
  // إذا لم يكن هناك رمز تعبيري، يتم تعيين نوع افتراضي
  if (tipe && !emoji) {
    emoji = '😎';
    tipe = defaultType;
  }

  // رسالة الخطأ في حال عدم إدخال رمز تعبيري
  const err = `${tradutor.texto1[0]}
*◉ ${usedPrefix + command} ${tradutor.texto1[1]}

${tradutor.texto1[0]}
*◉ ${usedPrefix + command}* ${tradutor.texto1[2]}

${tradutor.texto1[3]} 

${tradutor.texto1[4]}
${tradutor.texto1[5]}
${tradutor.texto1[6]}
${tradutor.texto1[7]}
${tradutor.texto1[8]}
${tradutor.texto1[9]}
${tradutor.texto1[10]}
${tradutor.texto1[11]}
${tradutor.texto1[12]}
${tradutor.texto1[13]}
${tradutor.texto1[14]}

${tradutor.texto1[0]}

للحصول على المزيد من المعلومات، يمكنك زيارة قناتنا: ${CHANNEL_LINK}`;
  
  if (!emoji) throw err;
  
  // تعيين نوع الإيموجي وفقاً للمدخل
  if (tipe == 'mo') tipe = 'mozilla';
  if (tipe == 'op') tipe = 'openmoji';
  if (tipe == 'pi') tipe = 'joypixels';
  if (tipe == 'sa') tipe = 'samsung';
  if (tipe == 'go') tipe = 'google';
  if (tipe == 'wha') tipe = 'whatsapp';
  if (tipe == 'fa') tipe = 'facebook';
  if (tipe == 'ap') tipe = 'apple';
  if (tipe == 'mi') tipe = 'microsoft';
  if (tipe == 'ht') tipe = 'htc';
  if (tipe == 'tw') tipe = 'twitter';
  
  try {
    emoji = emoji.trim();
    tipe = tipe.trim().toLowerCase();
    const json = await semoji(emoji);
    let chosenURL;
    
    // البحث عن الرابط المناسب لنوع الإيموجي
    for (let i = 0; i < json.length; i++) {
      if (json[i].nama.includes(tipe)) {
        chosenURL = json[i].url;
        break;
      }
    }
    
    if (!chosenURL) {
      chosenURL = json[0].url;
    }
    
    console.log(chosenURL);
    const stiker = await createSticker(false, chosenURL, global.packname, global.author, 20);
    
    // إرسال الملصق للمستخدم مع رسالة نجاح
    m.reply(`تم إرسال الملصق بنجاح! لمزيد من المعلومات، يمكنك زيارة قناتنا: ${CHANNEL_LINK}`);
    m.reply(stiker);
  } catch {
    // إرسال رسالة خطأ مع رابط القناة
    throw `${tradutor.texto2}\n\nللحصول على المزيد من المعلومات، يمكنك زيارة قناتنا: ${CHANNEL_LINK}`;
  }
};

// تعليمات الاستخدام
handler.help = ['emoji <tipo> <emoji>'];
handler.tags = ['sticker'];
handler.command = ['emoji', 'smoji', 'semoji'];

export default handler;

// وظيفة لتحميل معلومات الإيموجي من Emojipedia
async function semoji(hem) {
  const result = [];
  const data = await got(encodeURI(`https://emojipedia.org/${hem}/`), {method: 'GET', headers: {'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36'}});
  const $ = cheerio.load(data.body);
  
  $('body > div.container > div.content > article > section.vendor-list > ul').each(function(asu, chuwi) {
    $(chuwi).find('li').each(function(sa, na) {
      const res = {nama: $(na).find('div > div.vendor-info > h2 > a').text().trim().toLowerCase(), url: $(na).find('div > div.vendor-image > img').attr('src')};
      result.push(res);
    });
  });
  
  const data2 = [];
  result.map((Data) => {
    if (Data.nama == undefined) return;
    if (Data.url == undefined) return;
    data2.push(Data);
  });
  
  return data2;
}

// وظيفة لإنشاء ملصق من صورة
async function createSticker(img, url, packName, authorName, quality) {
  const stickerMetadata = {type: 'full', pack: packName, author: authorName, quality};
  return (new Sticker(img ? img : url, stickerMetadata)).toBuffer();
}

// وظيفة لتحويل MP4 إلى WebP
async function mp4ToWebp(file, stickerMetadata) {
  if (stickerMetadata) {
    if (!stickerMetadata.pack) stickerMetadata.pack = '‎';
    if (!stickerMetadata.author) stickerMetadata.author = '‎';
    if (!stickerMetadata.crop) stickerMetadata.crop = false;
  } else if (!stickerMetadata) {
    stickerMetadata = {pack: '‎', author: '‎', crop: false};
  }
  
  const getBase64 = file.toString('base64');
  const Format = {file: `data:video/mp4;base64,${getBase64}`, processOptions: {crop: stickerMetadata?.crop, startTime: '00:00:00.0', endTime: '00:00:7.0', loop: 0,
  }, stickerMetadata: {...stickerMetadata}, sessionInfo: {WA_VERSION: '2.2106.5', PAGE_UA: 'WhatsApp/2.2037.6 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36', WA_AUTOMATE_VERSION: '3.6.10 UPDATE AVAILABLE: 3.6.11', BROWSER_VERSION: 'HeadlessChrome/88.0.4324.190', OS: 'Windows Server 2016', START_TS: 1614310326309, NUM: '6247', LAUNCH_TIME_MS: 7934, PHONE_VERSION: '2.20.205.16'},
  config: {sessionId: 'session', headless: true, qrTimeout: 20, authTimeout: 0, cacheEnabled: false, useChrome: true, killProcessOnBrowserClose: true, throwErrorOnTosBlock: false, chromiumArgs: ['--no-sandbox', '--disable-setuid-sandbox', '--aggressive-cache-discard', '--disable-cache', '--disable-application-cache', '--disable-offline-load-stale-cache', '--disk-cache-size=0'], executablePath: 'C:\\\\Program Files (x86)\\\\Google\\\\Chrome\\\\Application\\\\chrome.exe', skipBrokenMethodsCheck: true, stickerServerEndpoint: true}};
  
  const res = await fetch('https://sticker-api.openwa.dev/convertMp4BufferToWebpDataUrl', {method: 'post', headers: {'Accept': 'application/json, text/plain, /', 'Content-Type': 'application/json;charset=utf-8'}, body: JSON.stringify(Format)});
  return Buffer.from((await res.text()).split(';base64,')[1], 'base64');
}
