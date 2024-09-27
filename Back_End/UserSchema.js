const mongoose = require("mongoose");

// User Schema
// const userSchema = new mongoose.Schema({
//     firstname: {
//         type: String,
//         required: true
//     },
//     lastname: {
//         type: String,
//         required: true
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     confirmEmail: {
//         type: String,
//         required: true
//     },
//     password: {
//         type: String,
//         required: true
//     },
//     confirmPassword: {
//         type: String,
//         required: true
//     },
//     gender: {
//         type: String,
//         enum: ['Male', 'Female', 'Other'],
//         required: true
//     },
//     dateOfBirth: {
//         type: Date,
//         required: true
//     },
//     selectedTopics: [{
//         type: String
//     }],
//     data:[{
//         fullname:[{
//             type:String
//         }],
//         location:[{
//             type:String
//         }],
//         age:[{
//             type:Number
//         }],
//         professional:[{
//             type:String
//         }],
//         workingAt:[{
//             type:String
//         }],
//         about:[{
//             type:String
//         }],
//         profileImage:[{
//             type:String
//         }]
//     }]
// });

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  confirmEmail: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmPassword: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  selectedTopics: [
    {
      type: String,
    },
  ],
  data: [
    {
      fullname: [
        {
          type: String,
        },
      ],
      location: [
        {
          type: String,
        },
      ],
      age: [
        {
          type: Number,
        },
      ],
      professional: [
        {
          type: String,
        },
      ],
      workingAt: [
        {
          type: String,
        },
      ],
      about: [
        {
          type: String,
        },
      ],
      profileImage: [
        {
          type: String,
        },
      ],
    },
  ],
});

// Post Schema
const postSchema = new mongoose.Schema({
  post: {
    type: String,
  },
  mediaFile: {
    type: String,
  },
  added_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
  },
  date: {
    type: String,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);
const Post = mongoose.model("Post", postSchema);
module.exports = { User, Post };
