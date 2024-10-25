
import { getAllContacts, getContactsById } from '../services/contacts.js';
import createHttpError from 'http-errors';

export const getContactsController = async (req, res, next) => {
  try {
    const contacts = await getAllContacts();

    res.json({
      status: 200,
      message: "Successfully found contacts!",
      data: contacts,
    });
  } catch (err) {
    next(err);
  }
}

export const getContactsByIdController = async (req, res) => {
    const { contactsId } = req.params;
    const contacts = await getContactsById(contactsId);




    if (!contacts) {
      throw createHttpError(404, 'Contacts not found');
    }

     res.json({
      status: 200,
      message: "Successfully found contact with id {contactId}!",
      data: contacts,
    });
  };


