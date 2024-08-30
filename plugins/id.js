import axios from 'axios';

let handler = async (m, { conn, args, text, usedPrefix, command }) => {
    if (!text) throw 'Example: ' + usedPrefix + command + ' 12345678';
    await m.reply("Fetching player info...");
    let playerId = text;
    let playerInfo = await getInfo(playerId);
    let uidStatus = await checkUid(playerId);
    await m.reply(
        `ID: ${playerId}
Nickname: ${playerInfo.nickname}
Region: ${playerInfo.region}
Account Status: ${uidStatus}

للمزيد من التفاصيل أو الدعم، تابع قناتنا على واتساب: https://whatsapp.com/channel/0029VacrIfU3LdQdklKFR419`
    );
};

handler.command = /^(id)$/i;
handler.help = ['id'];
handler.tags = ['tools'];
export default handler;

async function getInfo(id) {
    const url = "https://shop2game.com/api/auth/player_id_login";
    const payload = {
        app_id: 100067,
        login_id: id,
        app_server_id: 0
    };
    const headers = {
        "Accept": "application/json",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "en-US,en;q=0.9,en;q=0.8",
        "Content-Type": "application/json",
        "x-datadome-clientid": "D7ag5AhKjooy7F1W~Z9As2ld63JSSIi7clfyfWzE2B5aZjZkluJak4SMU1Qi~46Rg4w8CeLAdU20~gkP4uqVpa7cYvPuotKjb3U6ThMkkaovHWuliv66UN4GK2YH9MNB",
        "sec-ch-ua": '"Google Chrome";v="111", "Not(A:Brand";v="8", "Chromium";v="111"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "Windows",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-origin",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36",
        "Referer": "https://shop2game.com/app/100067/buy/0"
    };

    try {
        const response = await axios.post(url, payload, { headers: headers });
        if (response.status === 200) {
            const data = response.data;
            const nickname = data.nickname || "";
            const region = data.region || "";
            return { nickname: nickname, region: region };
        } else {
            console.log(`Failed to fetch info. Status code: ${response.status}`);
            return "ERROR";
        }
    } catch (error) {
        console.log(`Error fetching info: ${error}`);
        return `Error: ${error}`;
    }
}

async function checkUid(uid) {
    const url = 'https://ff.garena.com/api/antihack/check_banned';
    const params = {
        'lang': 'en',
        'uid': uid
    };
    const headers = {
        'Accept': 'application/json, text/plain, */*',
        'X-Requested-With': 'B6FksShzIgjfrYImLpTsadjS86sddhFH'
    };

    try {
        const response = await axios.get(url, { params: params, headers: headers });
        if (response.status === 200) {
            const data = response.data.data || {};
            const is_banned = data.is_banned;
            const period = data.period;

            if (is_banned == 1) {
                return "الحساب مبند.";
            } else {
                return "الحساب غير مبند.";
            }
        } else {
            console.log(`Failed to check UID. Status code: ${response.status}`);
            return `فشل الحصول على الاستجابة. كود الحالة: ${response.status}`;
        }
    } catch (error) {
        console.log(`Error checking UID: ${error}`);
        return `خطأ: ${error}`;
    }
}
