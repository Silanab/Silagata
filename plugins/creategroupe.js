let handler = async (m, { conn, text }) => {
   
   if (!text) return m.reply('_ضع امام الامر اسم المجموعة التي تريد إنشاءها مثلا!_\n*.creategroupe Abdelhak & Rayane bot*')
   try{
    m.reply(wait)
    let group = await conn.groupCreate(text, [m.sender])
    let link = await conn.groupInviteCode(group.gid)
    let url = 'https://chat.whatsapp.com/' + link;

    m.reply('_تم إنشاء المجموعة بنجاح: *' + text + '*_\n\n*الاسم:* ' + text + '\n*ID:* ' + group.gid + '\n*رابطها:* ' + url + '\n\n*تابع قناتنا على WhatsApp:* https://whatsapp.com/channel/0029VacrIfU3LdQdklKFR419')
  } catch (e) {
    m.reply(`Error`)
  }
}
handler.help = ['creategroup']
handler.tags = ['owner']
handler.command = /^creategroup$/
handler.owner = true
handler.premium = false
export default handler
