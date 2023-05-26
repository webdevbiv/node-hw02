const fs = require("fs").promises;
const path = require("path");
const shortid = require("shortid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

console.log("Contacts file path:", contactsPath);

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return { message: "listContacts: Here is current list of users in Data Base", contacts };
  } catch (err) {
    console.error(err.message);
    return { message: "listContacts: Error occurred while reading contacts file", contacts: null };
  }
}

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const contact = contacts.find((contact) => contact.id === contactId);
    if (contact) {
      const message = `getContactById: Contact with ID ${contactId} found`;
      return { message, contact };
    }
    return { message: `getContactById: Contact with ID ${contactId} not found`, contact: null };
  } catch (err) {
    console.log(err.message);
    return { message: "getContactById: Error occurred while reading contacts file", contact: null };
  }
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const contact = contacts.find((contact) => contact.id === contactId);
    if (contact) {
      const filteredContacts = contacts.filter((contact) => contact.id !== contactId);
      const updatedData = JSON.stringify(filteredContacts);
      try {
        await fs.writeFile(contactsPath, updatedData);
        return { message: `removeContact: Contact with ID ${contactId} removed`, contact };
      } catch (err) {
        console.log(err.message);
        return { message: "removeContact: Error occurred while writing to contacts file", contact: null };
      }
    } else {
      return { message: `removeContact: Contact with ID ${contactId} not found`, contact: null };
    }
  } catch (err) {
    console.log(err.message);
    return { message: "removeContact: Error occurred while reading contacts file", contact: null };
  }
}

async function addContact(name, email, phone) {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const id = shortid();
    const sameName = contacts.find((contact) => contact.name === name);

    if (!sameName) {
      const newContact = { name, email, phone, id };
      contacts.push(newContact);
      const updatedData = JSON.stringify(contacts);

      try {
        await fs.writeFile(contactsPath, updatedData);
        const message = `addContact: Contact with ID ${id} added`;
        return { message, contacts };
      } catch (err) {
        console.log(err.message);
        return { message: "addContact: Error occurred while writing to contacts file", contacts: null };
      }
    } else {
      const message = `addContact: Contact with name: ${name} already exists`;
      return { message, contacts: null };
    }
  } catch (err) {
    console.log(err.message);
    return { message: "addContact: Error occurred while reading contacts file", contacts: null };
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
