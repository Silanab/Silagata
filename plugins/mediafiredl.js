import { mediafiredl } from '@bochilteam/scraper'
let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) throw التحميل من ميديافاير \n\nمثال:\n\n *.mediafiredl* https://www.mediafire.com/file/941xczxhn27qbby/GBWA_V12.25FF-By.SamMods-.apk/file
    let res = await mediafiredl(args[0])
    let { url, url2, filename, ext, aploud, filesize, filesizeH } = res
    let caption = `
    [ https://whatsapp.com/channel/0029VacrIfU3LdQdklKFR419 ]
📮 اسم الملف: ${filename}
📁 حجم الملف: ${filesizeH}
🗂 نوع الملف: ${ext}
📨 تاريخ رفع الملف: ${aploud}
`.trim()
    m.reply(caption)
    await conn.sendFile(m.chat, url, filename, '', m, null, { mimetype: ext, asDocument: true })
}
handler.help = ['mediafiredl']
handler.tags = ['downloader']
handler.command = /^(mediafiredl)$/i
export default handler

//BY RAYANE ZAMRANE
//JANGAN DI HAPUS CREDITS!
