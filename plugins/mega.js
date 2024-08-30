import { File } from "megajs";
import path from "path";

let handler = async (m, { conn, args, usedPrefix, text, command }) => {
    try {
        if (!text) return m.reply(`هذا الامر خاص بتحميل ملفات منصة ميغا مثال :
${usedPrefix + command} https://mega.nz/file/ovJTHaQZ#yAbkrvQgykcH_NDKQ8eIc0zvsN7jonBbHZ_HTQL6lZ8`);

        const file = File.fromURL(text);
        await file.loadAttributes();

        if (file.size >= 900000000) return m.reply('Error: File size is too large (Maximum Size: 900MB)');

        const downloadingMessage = `🌩️ جاري التحميل صبر جميل يا صديقي....
للمزيد من التفاصيل أو الدعم، تابع قناتنا على واتساب: https://whatsapp.com/channel/0029VacrIfU3LdQdklKFR419`;
        m.reply(downloadingMessage);

        const data = await file.downloadBuffer();
        const caption = `*_تم بنجاح تحميل..._*
File: ${file.name}
Size: ${formatBytes(file.size)}

للمزيد من التفاصيل أو الدعم، تابع قناتنا على واتساب: https://whatsapp.com/channel/0029VacrIfU3LdQdklKFR419`;

        const fileExtension = path.extname(file.name).toLowerCase();
        const mimeTypes = {
            ".mp4": "video/mp4",
            ".pdf": "application/pdf",
            ".zip": "application/zip",
            ".rar": "application/x-rar-compressed",
            ".7z": "application/x-7z-compressed",
            ".jpg": "image/jpeg",
            ".jpeg": "image/jpeg",
            ".png": "image/png",
        };

        let mimetype = mimeTypes[fileExtension] || "application/octet-stream";

        await conn.sendFile(m.chat, data, file.name, caption, m, null, { mimetype, asDocument: true });

    } catch (error) {
        return m.reply(`Error: ${error.message}`);
    }
}

handler.help = ["mega"]
handler.tags = ["downloader"]
handler.command = /^(mega)$/i
export default handler

function formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}
