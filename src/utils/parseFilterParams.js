const parseBoolean = (value) => {
  if (typeof value === 'string') {
    return value.toLowerCase() === 'true';
  }
  return Boolean(value);
};

const parseContactType = (contactType) => {
  const isString = typeof contactType === 'string';
  if (!isString) return;
  const validContactTypes = ['work', 'home', 'personal'];
  if (validContactTypes.includes(contactType)) {
    return contactType;
  }
};

export const parseFilterParams = (query) => {
  const { isFavourite, contactType } = query;

  const parsedIsFavourite = parseBoolean(isFavourite);
  const parsedContactType = parseContactType(contactType);

  return {
    isFavourite: parsedIsFavourite,
    contactType: parsedContactType,
  };
};


// const parseBoolean = (value) => {
//   if (typeof value === 'string') {
//     return value.toLowerCase() === 'true';
//   }
//   return Boolean(value);
// };

// const parseContactType = (contactType) => {
//   const isString = typeof contactType === 'string';
//   if (!isString) return;
//   const validContactTypes = ['work', 'home', 'personal'];
//   if (validContactTypes.includes(contactType)) {
//     return contactType;
//   }
// };

// export const parseFilterParams = (query) => {
//   const { type, isFavourite, contactType } = query;

//   const parsedType = type;
//   const parsedIsFavourite = parseBoolean(isFavourite);
//   const parsedContactType = parseContactType(contactType);

//   return {
//     type: parsedType,
//     isFavourite: parsedIsFavourite,
//     contactType: parsedContactType,
//   };
// };

// const parseBoolean = (value) => {
//   if (typeof value === 'string') {
//     return value.toLowerCase() === 'true';
//   }
//   return Boolean(value);
// };

// export const parseFilterParams = (query) => {
//   const { type, isFavourite, contactType } = query;

//   const parsedType = type;
//   const parsedIsFavourite = parseBoolean(isFavourite);
//   const parsedContactType = contactType;

//   return {
//     type: parsedType,
//     isFavourite: parsedIsFavourite,
//     contactType: parsedContactType,
//   };
// };
