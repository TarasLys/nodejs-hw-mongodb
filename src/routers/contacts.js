import { Router } from "express";
import {
    getContactsController,
    getContactsByIdController,
    createContactController,
    deleteContactController,
    upsertContactController,
    patchContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from "../utils/ctrlWrapper.js";


const router = Router();

router.get('/contacts', ctrlWrapper(getContactsController));
router.get('/contacts/:contactsId', ctrlWrapper(getContactsByIdController));
router.post('/contacts', ctrlWrapper(createContactController));
router.delete('/contacts/:contactId', ctrlWrapper(deleteContactController));
router.put('/contacts/:contactId', ctrlWrapper(upsertContactController));
router.patch('/contacts/:contactId', ctrlWrapper(patchContactController));
export default router;





//import { Router } from "express";
// import { getAllContacts, getContactsById } from './services/contacts.js';

// const router = Router();

// 	router.get('/contacts', async (req, res) => {
//     const contacts = await getAllContacts();

//     res.status(200).json({
//       status: 200,
//       message: "Successfully found contacts!",
//       data: contacts,
//     });
//   });

//   router.get('/contacts/:contactsId', async (req, res, next) => {
//     const { contactsId } = req.params;
//     const contacts = await getContactsById(contactsId);


// 	if (!contacts) {
// 	  res.status(404).json({
// 		  message: 'Contacts not found'
// 	  });
// 	  return;
// 	}


//     res.status(200).json({
//       status: 200,
//       message: "Successfully found contact with id {contactId}!",
//       data: contacts,
//     });
//   });

// export default router;
