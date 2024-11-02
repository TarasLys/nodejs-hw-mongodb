import { ContactsCollection } from '../db/models/contacts.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js'
import { SORT_ORDER } from '../constants/index.js';

//

export const getContactsById = async (contactsId) => {
  const contacts = await ContactsCollection.findById(contactsId);
  return contacts;
};

export const createContact = async (payload) => {
  const contact = await ContactsCollection.create(payload);
  return contact;
};

export const deleteContact = async (contactId) => {
  const contact = await ContactsCollection.findOneAndDelete({
    _id: contactId,
  });
  return contact;

}

export const updateContact = async (contactId, payload, options = {}) => {
  const rawResult = await ContactsCollection.findOneAndUpdate(
    { _id: contactId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );

  if (!rawResult || !rawResult.value) return null;

  return {
    contact: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};


export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = ContactsCollection.find();

  if (filter.contactType) {
    contactsQuery.where('contactType').equals(filter.contactType);
  }
  if (filter.isFavourite !== undefined) {
    contactsQuery.where('isFavourite').equals(filter.isFavourite);
  }

  const contactsCount = await ContactsCollection.find()
    .merge(contactsQuery)
    .countDocuments();

  const contacts = await contactsQuery
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .exec();

  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
};



// export const getAllContacts = async ({
//   page = 1,
//   perPage = 10,
//   sortOrder = SORT_ORDER.ASC,
//   sortBy = '_id',
//   filter = {},
// }) => {
//   const limit = perPage;
//   const skip = (page - 1) * perPage;

//   const contactsQuery = ContactsCollection.find();

  // const parsedType = type;
  // const parsedIsFavourite = parseBoolean(isFavourite);
  // const parsedContactType = parseContactType(contactType);

//    if (filter.gender) {
//     studentsQuery.where('gender').equals(filter.gender);
//   }
//   if (filter.maxAge) {
//     studentsQuery.where('age').lte(filter.maxAge);
//   }
//   if (filter.minAge) {
//     studentsQuery.where('age').gte(filter.minAge);

//   const contactsCount = await ContactsCollection.find()
//     .merge(contactsQuery)
//     .countDocuments();

//   const contacts = await contactsQuery
//     .skip(skip)
//     .limit(limit)
//     .sort({ [sortBy]: sortOrder })
//     .exec();

//   const paginationData = calculatePaginationData(contactsCount, perPage, page);

//   return {
//     data: contacts,
//     ...paginationData,
//   };
// };

// export const getAllContacts = async () => {
//   const contacts = await ContactsCollection.find();
//   return contacts;
// };

// export const getAllContacts = async ({ page, perPage }) => {
//   const limit = perPage;
//   const skip = (page - 1) * perPage;

//   const studentsQuery = StudentsCollection.find();
//   const studentsCount = await StudentsCollection.find()
//     .merge(studentsQuery)
//     .countDocuments();

//   const students = await studentsQuery.skip(skip).limit(limit).exec();

//   const paginationData = calculatePaginationData(studentsCount, perPage, page);

//   return {
//     data: students,
//     ...paginationData,
//   };
// };
