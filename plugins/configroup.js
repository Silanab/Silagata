
let handler = async (m, { conn, args, usedPrefix, command }) => {
  const صورة_المجموعة = await conn.profilePictureUrl(m.chat, 'image').catch(_ => null) || './src/grupos.jpg';
  let حالة_المجموعة = {
    'فتح': 'not_announcement',
    'غلق': 'announcement',
    'مفتوح': 'not_announcement',
    'مغلق': 'announcement',
    'افتح': 'not_announcement',
    'اغلق': 'announcement',
  }[(args[0] || '')];
  
  if (حالة_المجموعة === undefined)
    throw `*╭━[ ${wm} ]━⬣*
*┃➥ ${usedPrefix + command} افتح*
*┃➥ ${usedPrefix + command} اغلق*
*╰━━━━━[ 𓃠 ${vs} ]━━━━━⬣*
`.trim();
  
  await conn.groupSettingUpdate(m.chat, حالة_المجموعة);
  
  if (حالة_المجموعة === 'not_announcement'){
    m.reply(`حاضر يا سيدي ${m.sender.split('@')[0]}، تم فتح المجموعة. يمكن للجميع الآن الكتابة!`);
    await conn.sendButton(m.chat, `يمكن للجميع الآن الكتابة في هذه المجموعة!`, `المجموعة مفتوحة\n${wm}`, صورة_المجموعة, [['وصف المجموعة', `.description`], ['العودة إلى القائمة الرئيسية', `/menu`]], m);
  }
  
  if (حالة_المجموعة === 'announcement'){
    m.reply(`حاضر يا سيدي ${m.sender.split('@')[0]}، تم غلق المجموعة. يمكن للمشرفين فقط الكتابة!`);
    await conn.sendButton(m.chat, `تم إغلاق المجموعة، يمكن للمشرفين فقط الكتابة!`, `المجموعة مغلقة\n${wm}`, صورة_المجموعة, [['وصف المجموعة', `.description`], ['العودة إلى القائمة الرئيسية', `/menu`]], m);
  }
}

handler.help = ['group open / close', 'grupo abrir / cerrar'];
handler.tags = ['group'];
handler.command = /^(group|grupo)$/i;
handler.admin = true;
handler.botAdmin = true;
handler.exp = 200;

export default handler;
