import * as fs from 'fs/promises';

import colors from 'colors';

import createDirname from './lib/dirname.js';
const { __dirname } = createDirname(import.meta.url);
import path from 'path';

import { customAlphabet } from 'nanoid/non-secure';
const nanoid = customAlphabet('1234567890', 4);

const contactsPath = path.join(__dirname, './db/contacts.json');

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
    const contacts = await parsedContact();
    console.table(contacts);
  } catch (error) {
    console.log(error.message);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await parsedContact();
    const contactFilterId = contacts.find(
      contact => Number(contact.id) === Number(contactId),
    );

    if (!contactFilterId)
      return console.error(`Пользователя с id ${contactId} не найден`.red);

    console.log(contactFilterId);
    return contactFilterId;
  } catch (error) {
    console.log(error.message);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await parsedContact();

    const delContactId = contacts.filter(
      contact => Number(contact.id) !== Number(contactId),
    );
    if (contacts.length === delContactId.length)
      return console.log(`Пользователя с id ${contactId} не найден`.red);

    fs.writeFile(contactsPath, JSON.stringify(delContactId, null, 2), err => {
      if (err) {
        console.log(err);
        return;
      }
    });
    console.table(delContactId);
  } catch (error) {
    console.log(error.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await parsedContact();

    const contactAdd = {
      id: nanoid(),
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
const contactsFn = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};

export default contactsFn;
