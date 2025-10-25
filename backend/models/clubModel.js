import mongoose from "mongoose";

const clubSchema = new mongoose.Schema({
    clubName:  
      {
         type: String, 
         required: true
      },
      festivalType:
      {
        type: String, 
        required: true
      },
      description: String,
      images: [String],
      email: String,
      /* status: 
      {
        type: String,
        default: "pending"
      },
      dateAdded: 
      {
        type: Date,
        default: Date.now
      } */
}, { timestamps: true});

export default mongoose.model("Club", clubSchema);