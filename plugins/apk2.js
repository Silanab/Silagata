import axios from 'axios';

let handler = async (m, { conn, text }) => {
    if (!text) return m.reply("ex : *apk2 whatsapp*");
    try {
        m.reply("المرجو الانتظار قليلاً إشترك في القناة لتستفيد من البوتات!     https://whatsapp.com/channel/0029VacrIfU3LdQdklKFR419");
        let { data } = await axios.get("https://manaxu-seven.vercel.app/api/tools/apk?query=" + text);
        var { name, download } = data.result;
        conn.sendMessage(m.chat, { 
            document: { url: download }, 
            mimetype: 'application/vnd.android.package-archive', 
            fileName: name + '.apk', 
            caption: null 
        }, { quoted: m });
    } catch (e) {
        return m.reply("حدث خطأ في الوظيفة");
    }
};

handler.command = handler.help = ["apk2"];
handler.tags = ["التطبيقات"];

export default handler;
