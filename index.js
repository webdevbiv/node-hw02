const contacts = require("./contacts");
const argv = require("yargs").argv;

async function invokeAction({ action, id, name, email, phone }) {
  try {
    switch (action) {
      case "list":
        try {
          const data = await contacts.listContacts();
          if (data.contacts !== null) {
            console.log(data.message);
            console.table(data.contacts);
          } else {
            console.log(data.message);
          }
        } catch (err) {
          console.error(err.message);
        }
        break;

      case "get":
        try {
          const data = await contacts.getContactById(id);
          if (data.contact !== null) {
            console.log(data.message);
            console.table(data.contact);
          } else {
            console.log(data.message);
          }
        } catch (err) {
          console.error(err.message);
        }
        break;

      case "add":
        try {
          const data = await contacts.addContact(name, email, phone);
          if (data.contacts !== null) {
            console.log(data.message);
            console.table(data.contacts);
          } else {
            console.log(data.message);
          }
        } catch (err) {
          console.error(err.message);
        }
        break;

      case "remove":
        try {
          const data = await contacts.removeContact(id);
          if (data.contact !== null) {
            console.log(data.message);
            console.table(data.contact);
          } else {
            console.log(data.message);
          }
        } catch (err) {
          console.error(err.message);
        }
        break;

      default:
        console.warn("\x1B[31m Unknown action type!");
    }
  } catch (err) {
    console.error(err);
  }
}

invokeAction(argv);
