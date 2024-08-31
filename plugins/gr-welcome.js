const handler = async (m, { conn, text, isROwner, isOwner }) => {
  // إذا تم توفير النص
  if (text) {
    // تعيين رسالة الترحيب للمجموعة
    global.db.data.chats[m.chat].sWelcome = text;
    // إرسال رد تأكيد
    m.reply('🎉 تم تعيين رسالة الترحيب بنجاح! 🎉\n\nسنكون سعداء باستقبال أي عضو جديد! 🌟\n\nإذا كان لديك أي استفسار، لا تتردد في طرحه.');
  } else {
    // إذا لم يتم توفير النص، إرسال رسالة خطأ مع تعليمات الاستخدام
    throw '📜 يرجى تقديم النص لرسالة الترحيب.\n\nتنسيق الرسالة يجب أن يكون كالتالي:\n*- @user (إشارة المستخدم)*\n*- @group (اسم المجموعة)*\n*- @desc (وصف المجموعة)*';
  }
};

// بيانات التعريف للأمر
handler.help = ['setwelcome <text>'];
handler.tags = ['group'];
handler.command = ['setwelcome'];
handler.admin = true;

export default handler;
