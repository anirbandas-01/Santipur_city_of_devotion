import mongoose, { Types } from "mongoose";

const reviewSchema = new mongoose.Schema({
    name: 
    {
        type: String,
        required: true 
    },
    email:
     {
       type: String 
     },
     rating: 
     {
        type: Number,
        min: 1,
        max: 5
     },
     message:
      {
        type: String,
        required: true 
     },
     suggestion:
     {
       type: String
     },
     createdAt:
      {
       type: Date,
       default: Date.now
     },
});

export default mongoose.model("Review", reviewSchema);