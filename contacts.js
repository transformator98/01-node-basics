const fs = require('fs').promises;

const path = require('path');
const shortid = require('shortid');

const contactsPath = path.join(__dirname, './db/contacts.json');

program.option(
  '-l, --action="list" ',
  '-g, --action="get" `--id=${id}` ',
  '-a, --action="add" `--name=${name} --email=${email} --phone=${phone}`',
  '-r, --action="remove" `--id=${id}`',
);

async function parsedContact() {
  try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data.toString());
  } catch (error) {
    return console.log(error.message);
  }
}

async function listContacts() {
  try {
    await fs.readFile(contactsPath, (_, data) => {
      console.log(data.toString());
    });
  } catch (error) {
    console.log(error.message);
  }
}

function getContactById(contactId) {
  // ...твой код
}

function removeContact(contactId) {
  // ...твой код
}

async function addContact(name, email, phone) {
  try {
    const contacts = await parsedContact();

    const contactAdd = {
      id: shortid.generate(),
      name,
      email,
      phone,
    };

    const newContacts = [...contacts, contactAdd];

    fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2), err => {
      if (err) {
        console.log(err);
        return;
      }
    });
    console.table(newContacts);
    return newContacts;
  } catch (error) {
    return console.log(error.message);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
