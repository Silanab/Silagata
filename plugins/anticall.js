conn.ev.on("call", async (json) => {
    for (let id of json) {
        if (id.status === "offer") {
            let msg = await conn.sendMessage(id.from, { text: "`لقد تم حظرك من البوت لأنك قمت بالاتصال به. قم بالدخول إلى قناة البوت لتتواصل مع مطور البوت`\n\nhttps://whatsapp.com/channel/0029VacrIfU3LdQdklKFR419" });

            conn.sendContact(id.from, global.owner, msg);
            await conn.rejectCall(id.id, id.from);

            // Block the user
            await conn.updateBlockStatus(id.from, 'block');
        }
    }
});
