import { Schema } from 'mongoose';

// const contactSchema = new Schema(
export const ContactsCollection = new Schema(
{
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
    contactType: {
      type: String,
      enum: ['work', 'home', 'personal'],
      required: true,
      default: 'personal',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

// const contactsSchema = new Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//     },
//     age: {
//       type: Number,
//       required: true,
//     },
//     gender: {
//       type: String,
//       required: true,
//       enum: ['male', 'female', 'other'],
//     },
//     avgMark: {
//       type: Number,
//       required: true,
//     },
//     onDuty: {
//       type: Boolean,
//       required: true,
//       default: false,
//     },
//   },
//   {
//     timestamps: true,
//     versionKey: false,
//   },
// );
