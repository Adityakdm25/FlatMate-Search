import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    city:{
      type: String,
      required: true,
    },
    gender:{
      type: String,
      required: true,
    },
    postby:{
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    furnished: {
      type: Boolean,
      required: true,
    },
    amenities: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    Totalrent: {
      type: Number,
      required: true,
    },
    Totaldeposit: {
      type: Number,
      required: true,
    },
    brokerage: {
      type: String,
      required: true,
    },
    availablefrom:{
      type:Date,
      required:true,
    },
    imageUrls: {
      type:Array,
      required: true,
    },
    contact:{
      type:String,
      required:true,

    },
    userRef: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);
export default Post;