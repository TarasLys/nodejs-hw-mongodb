import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import dotenv from 'dotenv';
import { env } from './utils/env.js';
import { getAllContacts, getContactsById } from './services/contacts.js';

dotenv.config();

// const PORT = 3000;
//const PORT = Number(process.env.PORT);
const PORT = Number(env('PORT', '3000'));

export const setupServer = () => {
  const app = express();

	app.get('/contacts', async (req, res) => {
    const contacts = await getAllContacts();

    res.status(200).json({
      message: "Successfully found contacts!",
      data: contacts,
    });
  });

  app.get('/contacts/:contactsId', async (req, res, next) => {
    const { contactsId } = req.params;
    const contacts = await getContactsById(contactsId);

    // Відповідь, якщо контакт не знайдено
	if (!contacts) {
	  res.status(404).json({
		  message: 'Contacts not found'
	  });
	  return;
	}

	// Відповідь, якщо контакт знайдено
    res.status(200).json({
      message: "Successfully found contact with id {contactId}!",
      data: contacts,
    });
  });

// ++++++


  app.use(express.json());
  app.use(cors());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.get('/', (req, res) => {
    res.json({
      message: 'Hello world!',
    });
  });

  app.use('*', (req, res, next) => {
    res.status(404).json({
      message: 'Not found',
    });
  });

  app.use((err, req, res, next) => {
    res.status(500).json({
      message: 'Something went wrong',
      error: err.message,
    });
  });


  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
