// const fs = require('fs').promises;
const fs = require('fs');
const path = require('path');
const shortid = require('shortid');

// const contactsPath = './db/contacts.json';
const contactsPath = path.join('./db/contacts.json');

// console.log('contactsPath', contactsPath);

// function listContacts() {
//   fs.readFile(contactsPath, (err, data) => {
//     console.log(data);
//     console.log(err);
//   });
//   // .then(data => console.log(data.toString()))
//   // .catch(err => console.log(err.message));
// }
function listContacts() {
  fs.readFile(contactsPath, (err, data) => {
    if (err) {
      console.error(err.message);
      return;
    }
    console.log(data.toString());
  });
}

function getContactById(contactId) {
  // ...твой код
}

function removeContact(contactId) {
  // ...твой код
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath, (err, data) => {
    if (err) {
      console.error(err.message);
      return;
    }
    if (!fs.existsSync('./db')) {
      fs.mkdirSync('./db');
    }
    const contact = {
      id: shortid.generate(),
      name: name,
      email: email,
      phone: phone,

      toString() {
        return `{"id":"${this.id}","name":"${this.name}","email":"${this.email}","phone":"${this.phone}"}`;
      },
    };
    console.log('data', data.toString());
    const testData = data.toString();

    const file = `...${testData} ${contact}`;
    console.log(file);

    fs.writeFile('./db/contacts.json', `${file}`, err => {
      if (err) {
        console.log(err);
        return;
      }
    });
  });
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
