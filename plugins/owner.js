import fetch from 'node-fetch'

let handler = async (m, { conn }) => {
  let caption = `
*「 معلومات عن صاحب البوت 」*

*Number :*\nwa.me/212774074637

*Whatsapp Channel:*\nhttps://whatsapp.com/channel/0029VacrIfU3LdQdklKFR419

*Whatsapp Group:*\nhttps://chat.whatsapp.com/LZwYVOsaGDhDc6RiNi9LbM

*script bot :* https://github.com/Silanab/Silagata/tree/main

`.trim()
  m.reply(caption)
}

handler.help = ['owner']
handler.tags = ['infobot']
handler.command = /^(owner)$/i
handler.limit = false

export default handler
