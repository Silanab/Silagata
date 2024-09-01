const handler = async (m, {conn, usedPrefix, command}) => {
  const datas = global; // الحصول على البيانات العامة
  const idioma = datas.db.data.users[m.sender].language; // تحديد اللغة المستخدمة من قاعدة البيانات للمستخدم الذي أرسل الرسالة
  const _translate = JSON.parse(fs.readFileSync(`./src/languages/${idioma}.json`)); // قراءة وتحميل ملف الترجمة المناسب للغة المحددة
  const tradutor = _translate.plugins.gc_delete; // تحميل النصوص المترجمة الخاصة بإدارة الحذف في المجموعات

  if (!m.quoted) throw tradutor.texto1; // إذا لم يكن هناك رسالة مقتبسة، يظهر رسالة خطأ مترجمة
  try {
    const delet = m.message.extendedTextMessage.contextInfo.participant; // الحصول على معرف المشارك في الرسالة المقتبسة
    const bang = m.message.extendedTextMessage.contextInfo.stanzaId; // الحصول على معرف الرسالة المقتبسة
    return conn.sendMessage(m.chat, {delete: {remoteJid: m.chat, fromMe: false, id: bang, participant: delet}}); // محاولة حذف الرسالة المقتبسة من الدردشة
  } catch {
    return conn.sendMessage(m.chat, {delete: m.quoted.vM.key}); // في حال فشل المحاولة الأولى، محاولة حذف الرسالة باستخدام طريقة بديلة
  }
};

handler.help = ['del', 'delete']; // قائمة الأوامر التي يساعد فيها هذا الكود
handler.tags = ['group']; // تصنيف الكود كأداة لإدارة المجموعات
handler.command = /^del(ete)?$/i; // الأوامر التي يمكن استخدامها لتفعيل الكود (del أو delete)
handler.group = true; // التأكد من أن الأمر يعمل فقط في المجموعات
handler.admin = true; // التأكد من أن المستخدم الذي يقوم بالأمر هو مدير
handler.botAdmin = true; // التأكد من أن الروبوت نفسه لديه صلاحيات المدير في المجموعة
export default handler; // تصدير الكود كجزء من وحدة برمجية

/* 
let handler = function (m) { 
  if (!m.quoted) throw false; // إذا لم يكن هناك رسالة مقتبسة، يرفض العملية
  let { chat, fromMe, isBaileys } = m.quoted; // الحصول على معلومات الرسالة المقتبسة
  if (!fromMe) throw false; // إذا لم تكن الرسالة من المرسل (الروبوت)، يرفض العملية
  if (!isBaileys) throw '*[❗إشعار❗] هذا الرسالة لم تُرسل من قِبلي، لا يمكنني حذفها*'; // إذا لم تُرسل الرسالة باستخدام مكتبة Baileys، يعرض رسالة خطأ
  conn.sendMessage(chat, { delete: m.quoted.vM.key }); // حذف الرسالة المقتبسة
}
handler.help = ['del', 'delete']; // قائمة الأوامر التي يساعد فيها هذا الكود
handler.tags = ['tools']; // تصنيف الكود كأداة
handler.command = /^del(ete)?$/i; // الأوامر التي يمكن استخدامها لتفعيل الكود (del أو delete)
handler.group = true; // التأكد من أن الأمر يعمل فقط في المجموعات
handler.admin = true; // التأكد من أن المستخدم الذي يقوم بالأمر هو مدير
export default handler; // تصدير الكود كجزء من وحدة برمجية
*/
