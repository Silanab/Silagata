import { watchFile, unwatchFile } from 'fs'
import fs from 'fs'
import chalk from 'chalk'
import { fileURLToPath } from 'url'

global.setting = {
 autoclear: false,
 addReply: true
 }

global.owner = [
['212774074637', 'Rayane', true],
['212723378180', 'Rayane', false],
['', '', false]
]

global.info = {
 nomerbot: '212723378180',
 pairingNumber: '212649515064',
 nameown: 'Rayane',
 nomerown: '212774074637',
 packname: 'sticker by ',
 author: 'Rayane',
 namebot: '𝐑𝐀𝐘𝐀𝐍𝐄',
 wm: ''-'_꩜ 𝐑𝐀𝐘𝐀𝐍𝐄 ꩜_'-'',
 stickpack: 'Whatsapp',
 stickauth: '𝐑𝐀𝐘𝐀𝐍𝐄 '
}

// Thumbnail 
global.media = {
 profil: 'https://telegra.ph/file/3a555bd69c4300341788e.jpg',
 did: 'https://telegra.ph/file/b0e0a6540dc4578893d05.jpg',
 rules: 'https://telegra.ph/file/b0e0a6540dc4578893d05.jpg',
 thumbnail: 'https://telegra.ph/file/b0e0a6540dc4578893d05.jpg',
 thumb: 'https://telegra.ph/file/b0e0a6540dc4578893d05.jpg',
 logo: 'https://telegra.ph/file/b0e0a6540dc4578893d05.jpg',
 unReg: 'https://telegra.ph/file/b0e0a6540dc4578893d05.jpg',
 registrasi: 'https://telegra.ph/file/b0e0a6540dc4578893d05.jpg',
 confess: 'https://telegra.ph/file/b0e0a6540dc4578893d05.jpg',
 akses: 'https://telegra.ph/file/b0e0a6540dc4578893d05.jpg', 
 wel: 'https://telegra.ph/file/b0e0a6540dc4578893d05.jpg', // gif welcome 
 bye: 'https://telegra.ph/file/b0e0a6540dc4578893d05.jpg', // gif good bye
 sound: 'https://media.vocaroo.com/mp3/1awgSZYHXP3B' // untuk menu
}

// Sosmed
global.url = {
 sch: 'https://whatsapp.com/channel/0029VacrIfU3LdQdklKFR419',
 sgh:  'https://github.com/Silanab/Silagata/tree/main',
 sgr: 'https://chat.whatsapp.com/LZwYVOsaGDhDc6RiNi9LbM'
}

global.wait =` انتظر .. أنا أحاول تلبية طلبك ...`

// Info Wait
global.msg = {
 wait: '⏱️ *Please be patient*\n\> Running command from *User*!',
 eror: '🤖*Bot Information*\n\> Sorry for the inconvenience in using *𝐑𝐀𝐘𝐀𝐍𝐄 𝐁𝐎𝐓*. There was an error in the system while executing the command.'
}

global.multiplier = 69
global.rpg = {
  emoticon(string) {
    string = string.toLowerCase();
      let emot = {
      agility: '🤸‍♂️',
      arc: '🏹',
      armor: '🥼',
      bank: '🏦',
      bibitanggur: '🍇',
      bibitapel: '🍎',
      bibitjeruk: '🍊',
      bibitmangga: '🥭',
      bibitpisang: '🍌',
      bow: '🏹',
      bull: '🐃',
      cat: '🐈',
      chicken: '🐓',
      common: '📦',
      cow: '🐄',
      crystal: '🔮',
      darkcrystal: '♠️',
      diamond: '💎',
      dog: '🐕',
      dragon: '🐉',
      elephant: '🐘',
      emerald: '💚',
      exp: '✉️',
      fishingrod: '🎣',
      fox: '🦊',
      gems: '🍀',
      giraffe: '🦒',
      gold: '👑',
      health: '❤️',
      horse: '🐎',
      intelligence: '🧠',
      iron: '⛓️',
      keygold: '🔑',
      keyiron: '🗝️',
      knife: '🔪',
      legendary: '🗃️',
      level: '🧬',
      limit: '🌌',
      lion: '🦁',
      magicwand: '⚕️',
      mana: '🪄',
      money: '💵',
      mythic: '🗳️',
      pet: '🎁',
      petFood: '🍖',
      pickaxe: '⛏️',
      pointxp: '📧',
      potion: '🥤',
      rock: '🪨',
      snake: '🐍',
      stamina: '⚡',
      strength: '🦹‍♀️',
      string: '🕸️',
      superior: '💼',
      sword: '⚔️',
      tiger: '🐅',
      trash: '🗑',
      uncommon: '🎁',
      upgrader: '🧰',
      wood: '🪵'
    }
    let results = Object.keys(emot).map(v => [v, new RegExp(v, 'gi')]).filter(v => v[1].test(string));
    if (!results.length) return '';
    else return emot[results[0][0]];
  }
}

// Apikey
global.api = {
 lol: 'GataDios'

}
global.APIs = {
  lol: "https://api.lolhumaan.xyz"
}

//Apikey
global.APIKeys = {
    "https://api.lolhumaan.xyz": "GataDios"
}

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update 'settings.js'"))
  import(`${file}?update=${Date.now()}`)
})
