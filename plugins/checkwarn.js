let handler = async (m, { conn }) => {
    // تحديد المستخدم المستهدف
    let who = m.mentionedJid && m.mentionedJid[0] 
              ? m.mentionedJid[0] 
              : m.fromMe 
                ? conn.user.jid 
                : m.sender;
    
    // جلب عدد التحذيرات من قاعدة البيانات
    let { warn } = db.data.users[who];

    // إعداد الرسالة بناءً على وجود تحذيرات أو عدمه
    let message = warn 
                  ? `لديه تحذيرات: ${warn}` 
                  : 'لا يوجد تحذيرات';
    
    // إرسال الرد مع الإشارة إلى المستخدم المستهدف
    await conn.reply(m.chat, `@${who.split('@')[0]} ${message}`, m, {
        contextInfo: { mentionedJid: [who] }
    });

    // إرسال الصورة
    await conn.sendMessage(m.chat, { 
        image: { url: 'https://telegra.ph/file/f0cf8100d684d80d48c27.jpg' }, 
        caption: `@${who.split('@')[0]}`, 
        contextInfo: { mentionedJid: [who] }
    });
};

// إعدادات الأمر
handler.help = handler.command = ['checkwarn'];
handler.tags = ['group'];
handler.group = true;

export default handler;
