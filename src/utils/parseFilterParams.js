const parseContactType = (contactType) => {
  const isString = typeof contactType === 'string';
  if (!isString) return;
  const isContactType = (contactType) =>
    ['work', 'home', 'personal'].includes(contactType);

  if (isContactType(contactType)) return contactType;
};

const parseBoolean = (value) => {
  if (typeof value === 'string') {
    if (value.toLowerCase() === 'true') return true;
    if (value.toLowerCase() === 'false') return false;
  }
  return undefined;
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
//   const { isFavourite, contactType } = query;

//   const parsedIsFavourite = parseBoolean(isFavourite);
//   const parsedContactType = parseContactType(contactType);

//   return {
//     isFavourite: parsedIsFavourite,
//     contactType: parsedContactType,
//   };
// };


