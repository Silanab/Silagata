import fetch from 'node-fetch';
import axios from 'axios';
import fs from 'fs';
let enviando = false;

const handler = async (m, {conn, args, command, usedPrefix}) => {
  const idioma = global.db.data.users[m.sender].language;
  const _translate = JSON.parse(fs.readFileSync(`./src/languages/${idioma}.json`));
  const tradutor = _translate.plugins.descargas_facebook;
  
  const whatsappChannelLink = 'https://whatsapp.com/channel/0029VacrIfU3LdQdklKFR419'; // رابط قناتك على الواتساب
  const imageLink = 'https://telegra.ph/file/f0cf8100d684d80d48c27.jpg'; // رابط الصورة

  if (!args[0]) {
    await m.reply(`_*${tradutor.texto1[0]}*_\n\n*${tradutor.texto1[1]}*\n\n*${tradutor.texto1[2]}* _${usedPrefix + command} https://fb.watch/fOTpgn6UFQ/_\n\nتابع قناتي على الواتساب هنا: ${whatsappChannelLink}`);
    await conn.sendMessage(m.chat, {
      image: { url: imageLink }, // إرسال الصورة من الرابط
      caption: 'هذه الصورة التي طلبتها.'
    }, {quoted: m});
    return;
  }

  /*const linkface = await isValidFacebookLink(args[0]);
  if (!linkface) {
    await m.reply(`_*${tradutor.texto2[0]}*_\n\n*${tradutor.texto2[1]}*\n\n*${tradutor.texto2[2]}* _${usedPrefix + command} https://fb.watch/fOTpgn6UFQ/_\n\nتابع قناتي على الواتساب هنا: ${whatsappChannelLink}`);
    await conn.sendMessage(m.chat, {
      image: { url: imageLink }, // إرسال الصورة من الرابط
      caption: 'هذه الصورة التي طلبتها.'
    }, {quoted: m});
    return;
  }*/

  if (!enviando) enviando = true;
  try {
    await m.reply(`_*${tradutor.texto3}*_\n\nتابع قناتي على الواتساب هنا: ${whatsappChannelLink}`);
    
    const response = await fetch(`${global.MyApiRestBaseUrl}/api/facebook?url=${args[0]}&apikey=${global.MyApiRestApikey}`);
    const data = await response.json();

    if (data?.status === true) {
      const videoBuffer = await getBuffer(data.resultado.data);
      await conn.sendMessage(m.chat, {
        video: videoBuffer, 
        filename: 'video.mp4', 
        caption: `_*${tradutor.texto4}*_\n\nتابع قناتي على الواتساب هنا: ${whatsappChannelLink}`
      }, {quoted: m});
      
      // إرسال الصورة بعد إرسال الفيديو
      await conn.sendMessage(m.chat, {
        image: { url: imageLink }, // إرسال الصورة من الرابط
        caption: 'هذه الصورة التي طلبتها.'
      }, {quoted: m});
      
      enviando = false;
    } else {
      console.error('Failed to fetch video data from API:', data);
      enviando = false;
    }
  } catch (error) {
    console.error('Error occurred:', error);
    enviando = false;
    await conn.sendMessage(m.chat, {
      image: { url: imageLink }, // إرسال الصورة من الرابط
      caption: `_*${tradutor.texto5}*_ \n\nتابع قناتي على الواتساب هنا: ${whatsappChannelLink}`
    }, {quoted: m});
  }
};

handler.command = /^(facebook|fb|facebookdl|fbdl|facebook2|fb2|facebookdl2|fbdl2|facebook3|fb3|facebookdl3|fbdl3|facebook4|fb4|facebookdl4|fbdl4|facebook5|fb5|facebookdl5|fbdl5)$/i;
export default handler;

const getBuffer = async (url, options = {}) => {
  const res = await axios({
    method: 'get', 
    url, 
    headers: {'DNT': 1, 'Upgrade-Insecure-Request': 1},
    ...options, 
    responseType: 'arraybuffer'
  });
  return res.data;
};
