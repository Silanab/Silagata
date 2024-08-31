import uploadFile from '../lib/uploadFile.js'
import uploadImage from '../lib/uploadImage.js'

let handler = async (m) => {
  let quotedMessage = m.quoted ? m.quoted : m
  let mimeType = (quotedMessage.msg || quotedMessage).mimetype || ''
  
  if (!mimeType) {
    throw 'هذا الأمر خاص برفع الصور لموقع:\nhttps://telegra.ph/\nيرجى الإشارة إلى الصورة التي تريد رفعها للموقع وسوف تحصل على رابطها. قم بالإشارة إليها ثم اكتب\n*.telegraph*'
  }
  
  let media = await quotedMessage.download()
  let isImageOrVideo = /image\/(png|jpe?g|gif)|video\/mp4/.test(mimeType)
  let uploadFunction = isImageOrVideo ? uploadImage : uploadFile
  
  try {
    let link = await uploadFunction(media)
    m.reply(`▢ ${media.length} Byte(s) 
▢ ${isImageOrVideo ? 'صورة/فيديو' : 'نوع غير معروف'}
▢ *هذا هو رابط الصورة:* ${link}\n\n\nتابع صاحب البوت على قناته على الواتساب: https://whatsapp.com/channel/0029VacrIfU3LdQdklKFR419`)
  } catch (error) {
    m.reply(`حدث خطأ أثناء رفع الصورة: ${error.message}`)
  }
}

handler.help = ['tourl']
handler.tags = ['uploader']
handler.command = ['telegraph', 'tourl', 'dir']

export default handler;
