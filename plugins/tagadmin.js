let handler = async (m, { conn, participants, groupMetadata, args, usedPrefix, text, command }) => {
  if (!text) return m.reply(يرجى إدخال نص لطلب حضور المشرفين.)
  const pp = await conn.profilePictureUrl(m.chat, 'image').catch(_ => null) || './src/admins.jpg'
  const groupAdmins = participants.filter(p => p.admin)
  const listAdmin = groupAdmins.map((v, i) => *» ${i + 1}. @${v.id.split('@')[0]}*).join('\n')
  const owner = groupMetadata.owner || groupAdmins.find(p => p.admin === 'superadmin')?.id || m.chat.split`-`[0] + '@s.whatsapp.net'
  let pesan = args.join` `
  let oi = رسالة: _${pesan}_

  let textoA = 
  `*⊱ ──── 《.⋅ 🐈 ⋅.》 ──── ⊰*
  الرجاء حضور المشرفين.
  ${oi}
  ⊱ ──── 《.⋅ تنبيه ⋅.》 ──── ⊰

  تابعوا قناتنا على واتساب: 
  https://whatsapp.com/channel/0029VacrIfU3LdQdklKFR419`

  let textoB = 
  `${listAdmin}

  ⛔ يرجى عدم تجاهل هذا الطلب ⛔`.trim()
  
  await conn.sendFile(m.chat, pp, 'admins.jpg', textoA + textoB, m, false, { mentions: [...groupAdmins.map(v => v.id), owner] })
}

handler.command = /^(admins|@admins|dmins)$/i
handler.group = true
export default handler
