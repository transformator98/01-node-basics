const fs = require('fs');
const path = require('path');
const contactsPath = './01-test/contacts.json';

const test = {
  id: 11,
  name: 'ivan',
  email: 'Donec.elementum@scelerisquescelerisquedui.net',
  phone: '(097) 111-1111',
};

console.log('dirname', __dirname);

console.log('filename', __filename);

fs.readFile(contactsPath, (err, data) => {
  if (err) {
    console.error(err.message);
    return;
  }

  if (!fs.existsSync('./temp')) {
    fs.mkdirSync('./temp');
  }
  const file = `${data.toString()} ${test}`;

  fs.writeFile('./temp/contacts.json', file, err => {
    if (err) {
      console.log(err);
      return;
    }
  });
});
