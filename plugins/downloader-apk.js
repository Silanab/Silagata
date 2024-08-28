import pkg from '@whiskeysockets/baileys';
import fetch from 'node-fetch';
const { generateWAMessageFromContent, proto, prepareWAMessageMedia } = pkg;

const whatsappChannelUrl = 'https://whatsapp.com/channel/0029VacrIfU3LdQdklKFR419';

let handler = async (m, { conn, args, text, usedPrefix, command }) => {
    if (command === 'apk') {
        if (!args[0]) throw 'Ex: ' + usedPrefix + command + ' Facebook lite';
        await m.reply("*LOADING...*");

        let q = text;
        let apiUrl = `https://lovely-moral-asp.ngrok-free.app/api/apkpure?q=${q}`;
        let response = await fetch(apiUrl);

        if (!response.ok) throw 'Error fetching APK data';
        
        let apkData = await response.json();

        // Ensure the API response is valid
        if (!Array.isArray(apkData)) throw 'Invalid APK data';

        const list = apkData.map((app, index) => {
            let json = JSON.stringify({
                downloadUrl: app.downloadUrl,
                downloadType: app.downloadType,
                packageName: app.packageName
            });

            return {
                title: `App ${index + 1}: ${app.title}`,
                rows: [
                    {
                        title: app.title,
                        id: `${usedPrefix}doapk ${json}`
                    }
                ]
            };
        });

        const sections = list.map((item) => {
            return {
                title: item.title,
                rows: item.rows
            };
        });

        const buttonParamsJson = JSON.stringify({
            title: "Available APKs",
            sections: sections
        });

        const interactiveMessage = {
            body: { text: `Choose an APK to download:\n\nFor more updates, join our WhatsApp channel: ${whatsappChannelUrl}` },
            footer: { text: "_by Mee6Team_" },
            header: {
                hasMediaAttachment: true,
                ...(await prepareWAMessageMedia({ image: { url: apkData[0].icon } }, { upload: conn.waUploadToServer }))
            },
            nativeFlowMessage: {
                buttons: [{
                    name: "single_select",
                    buttonParamsJson
                }]
            }
        };

        const message = {
            messageContextInfo: { deviceListMetadata: {}, deviceListMetadataVersion: 2 },
            interactiveMessage
        };

        await conn.relayMessage(m.chat, { viewOnceMessage: { message } }, {});
    } else if (command === 'doapk') {
        if (!text) throw 'Error: No APK data provided';

        try {
            const parsedData = JSON.parse(text);

            const { downloadUrl, downloadType = 'apk', packageName } = parsedData;

            if (!downloadUrl || !packageName) throw 'Error: Missing download URL or package name';

            await m.reply(`إنتظر قليلا من فضلك\n\nلماذا لا تتابع قناة الصانع: ${whatsappChannelUrl}`);

            let mimetype = (await fetch(downloadUrl, { method: 'HEAD' })).headers.get('content-type');
            const size = parseInt((await fetch(downloadUrl, { method: 'HEAD' })).headers.get('Content-Length'), 10);

            if (size > 999 * 1024 * 1024) throw 'File size exceeds 999 MB';

            const fileName = `${packageName}.${downloadType}`;

            await conn.sendMessage(
                m.chat,
                { document: { url: downloadUrl }, mimetype: mimetype, fileName: fileName },
                { quoted: m }
            );
        } catch (e) {
            await m.reply('Error processing APK data: ' + e.message);
        }
    }
};

handler.command = /^(apk|doapk)$/i;
export default handler;
