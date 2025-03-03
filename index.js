const contactsFunction = require("./contacts.js");

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <string>", "choose action")
  .option("-i, --id <string>", "user id")
  .option("-n, --name <string>", "user name")
  .option("-e, --email <string>", "user email")
  .option("-p, --phone <string>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      try {
        await contactsFunction.listContacts();
      } catch (err) {
        console.log(err.message);
      }
      break;
    case "get":
      try {
        await contactsFunction.getContactById(id);
      } catch (err) {
        console.log(err.message);
      }
      break;
    case "add":
      try {
        await contactsFunction.addContact(name, email, phone);
      } catch (err) {
        console.log(err.message);
      }
      break;
    case "remove":
      try {
        await contactsFunction.removeContact(id);
      } catch (err) {
        console.log(err.message);
      }
      break;
    default:
      console.warn("\x1B[31n Unknown action type!");
  }
}

invokeAction(argv);