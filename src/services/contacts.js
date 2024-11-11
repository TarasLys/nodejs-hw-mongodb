import { ContactsCollection } from '../db/models/contacts.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
  userId,
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = ContactsCollection.find({ userId });

  if (filter.contactType) {
    contactsQuery.where('contactType').equals(filter.contactType);
  }

  if (filter.isFavourite !== undefined) {
    contactsQuery.where('isFavourite').equals(filter.isFavourite);
  }

  const contactsCount = await ContactsCollection.find({ userId })
    .merge(contactsQuery)
    .countDocuments();

  const contacts = await contactsQuery
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder === SORT_ORDER.ASC ? 1 : -1 })
    .exec();

  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
};

export const getContactById = async (contactId, userId) => {
  const contacts = await ContactsCollection.findOne({ _id: contactId, userId });
  return contacts;
};

export const createContact = async (payload, userId) => {
  const contact = await ContactsCollection.create({ ...payload, userId });
  return contact;
};

export const deleteContact = async (contactId, userId) => {
  const contact = await ContactsCollection.deleteOne({
    _id: contactId,
    userId,
  });
  return contact;
};

export const updateContact = async (
  contactId,
  userId,
  payload,
  options = {},
) => {
  const rawResult = await ContactsCollection.findOneAndUpdate(
    { _id: contactId, userId },
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



// import { ContactsCollection } from '../db/models/contacts.js';
// import { calculatePaginationData } from '../utils/calculatePaginationData.js'
// import { SORT_ORDER } from '../constants/index.js';

// export const getAllContacts = async ({
//   page = 1,
//   perPage = 10,
//   sortOrder = SORT_ORDER.ASC,
//   sortBy = '_id',
//   filter = {},
//   userId,
// }) => {
//   const limit = perPage;
//   const skip = (page - 1) * perPage;

//   const contactsQuery = ContactsCollection.find({ userId });

//   if (filter.contactType) {
//     contactsQuery.where('contactType').equals(filter.contactType);
//   }

//   if (filter.isFavourite !== undefined) {
//     contactsQuery.where('isFavourite').equals(filter.isFavourite);
//   }

//   const contactsCount = await ContactsCollection.find({ userId })
//     .merge(contactsQuery)
//     .countDocuments();

//   const contacts = await contactsQuery
//     .skip(skip)
//     .limit(limit)
//     .sort({ [sortBy]: sortOrder === SORT_ORDER.ASC ? 1 : -1 })
//     .exec();

//   const paginationData = calculatePaginationData(contactsCount, perPage, page);

//   return {
//     data: contacts,
//     ...paginationData,
//   };
// };

// export const getContactsById = async (contactId, userId) => {
//   const contacts = await ContactsCollection.findOne({ _id: contactId, userId });
//   return contacts;
// };

// export const createContact = async (payload, userId) => {
//   const contact = await ContactsCollection.create({ ...payload, userId });
//   return contact;
// };

// export const deleteContact = async (contactId, userId) => {
//   const contact = await ContactsCollection.deleteOne({
//     _id: contactId,
//     userId,
//   });
//   return contact;
// };

// export const updateContact = async (
//   contactId,
//   userId,
//   payload,
//   options = {},
// ) => {
//   const rawResult = await ContactsCollection.findOneAndUpdate(
//     { _id: contactId, userId },
//     payload,
//     {
//       new: true,
//       includeResultMetadata: true,
//       ...options,
//     },
//   );

//   if (!rawResult || !rawResult.value) return null;

//   return {
//     contact: rawResult.value,
//     isNew: Boolean(rawResult?.lastErrorObject?.upserted),
//   };
// };





