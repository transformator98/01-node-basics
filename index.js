const contacts = require('./contacts.js');

// const ivan = {
//   'ivan',
//   'Donec.elementum@scelerisquescelerisquedui.net',
//   '(097) 111-1111',
// };

// console.log('contact', contacts.listContacts());
console.log(
  'ADDcontact',
  contacts.addContact(
    'ivan',
    'Donec.elementum@scelerisquescelerisquedui.net',
    '(097) 111-1111',
  ),
);
