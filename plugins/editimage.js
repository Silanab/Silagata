import FormData from "form-data";
import Jimp from "jimp";

let handler = async (m, { conn, usedPrefix, command }) => {
    switch (command) {
        case "dehaze":
            {
                conn.enhancer = conn.enhancer ? conn.enhancer : {};
                let q = m.quoted ? m.quoted : m;
                let mime = (q.msg || q).mimetype || q.mediaType || "";
                if (!mime)
                    throw `ارسل للبوت اي صورة وسوف يقوم  بإضافة لمسة يجعلها جميلة وجذابة

ارسل الصورة تم أشر اليها واكتب 
*.dehaze*`;
                if (!/image\/(jpe?g|png)/.test(mime))
                    throw `Mime ${mime} not support`;
                else conn.enhancer[m.sender] = true;
                m.reply(`🌟 جاري التحميل صبر جميل يا صديقي...
للمزيد من التفاصيل أو الدعم، تابع قناتنا على واتساب: https://whatsapp.com/channel/0029VacrIfU3LdQdklKFR419`);
                let img = await q.download?.();
                let error;
                try {
                    const This = await processing(img, "dehaze");
                    conn.sendFile(m.chat, This, "", "تمت المعالجة", m);
                } catch (er) {
                    error = true;
                } finally {
                    if (error) {
                        m.reply("*فشلت العملية*😣");
                    }
                    delete conn.enhancer[m.sender];
                }
            }
            break;
        case "recolor":
            {
                conn.recolor = conn.recolor ? conn.recolor : {};
                let q = m.quoted ? m.quoted : m;
                let mime = (q.msg || q).mimetype || q.mediaType || "";
                if (!mime)
                    throw `ارسل للبوت اي صورة وسوف يقوم بالتلاعب وتغيير بعض الالوان في الصورة

ارسل الصورة تم أشر اليها واكتب 
*.recolor*`;
                if (!/image\/(jpe?g|png)/.test(mime))
                    throw `Mime ${mime} not support`;
                else conn.recolor[m.sender] = true;
                m.reply(`🌟 جاري التحميل صبر جميل يا صديقي...
للمزيد من التفاصيل أو الدعم، تابع قناتنا على واتساب: https://whatsapp.com/channel/0029VacrIfU3LdQdklKFR419`);
                let img = await q.download?.();
                let error;
                try {
                    const This = await processing(img, "recolor");
                    conn.sendFile(m.chat, This, "", "تمت المعالجة", m);
                } catch (er) {
                    error = true;
                } finally {
                    if (error) {
                        m.reply("*فشلت العملية*😣");
                    }
                    delete conn.recolor[m.sender];
                }
            }
            break;
        case "hd":
            {
                conn.hdr = conn.hdr ? conn.hdr : {};
                let q = m.quoted ? m.quoted : m;
                let mime = (q.msg || q).mimetype || q.mediaType || "";
                if (!mime)
                    throw `ارسل للبوت اي صورة وسوف يقوم برفع جودتها لتصبح HD

ارسل الصورة تم أشر اليها واكتب 
*.hd*`;
                if (!/image\/(jpe?g|png)/.test(mime))
                    throw `Mime ${mime} not support`;
                else conn.hdr[m.sender] = true;
                m.reply(`🌟 جاري التحميل صبر جميل يا صديقي...
للمزيد من التفاصيل أو الدعم، تابع قناتنا على واتساب: https://whatsapp.com/channel/0029VacrIfU3LdQdklKFR419`);
                let img = await q.download?.();
                let error;
                try {
                    const This = await processing(img, "enhance");
                    conn.sendFile(m.chat, This, "", "تمت المعالجة", m);
                } catch (er) {
                    error = true;
                } finally {
                    if (error) {
                        m.reply("*فشلت العملية*😣");
                    }
                    delete conn.hdr[m.sender];
                }
            }
            break;
    }
};

handler.help = ["dehaze","recolor","hd"];
handler.tags = ["tools"];
handler.command = ["dehaze","recolor","hd"];
export default handler;

async function processing(urlPath, method) {
    return new Promise(async (resolve, reject) => {
        let Methods = ["enhance", "recolor", "dehaze"];
        Methods.includes(method) ? (method = method) : (method = Methods[0]);
        let buffer,
            Form = new FormData(),
            scheme = "https" + "://" + "inferenceengine" + ".vyro" + ".ai/" + method;
        Form.append("model_version", 1, {
            "Content-Transfer-Encoding": "binary",
            contentType: "multipart/form-data; charset=uttf-8",
        });
        Form.append("image", Buffer.from(urlPath), {
            filename: "enhance_image_body.jpg",
            contentType: "image/jpeg",
        });
        Form.submit(
            {
                url: scheme,
                host: "inferenceengine" + ".vyro" + ".ai",
                path: "/" + method,
                protocol: "https:",
                headers: {
                    "User-Agent": "okhttp/4.9.3",
                    Connection: "Keep-Alive",
                    "Accept-Encoding": "gzip",
                },
            },
            function (err, res) {
                if (err) reject();
                let data = [];
                res
                    .on("data", function (chunk, resp) {
                        data.push(chunk);
                    })
                    .on("end", () => {
                        resolve(Buffer.concat(data));
                    });
                res.on("error", (e) => {
                    reject();
                });
            }
        );
    });
}
