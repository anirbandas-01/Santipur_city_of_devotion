import mongoose from "mongoose";

const clubSchema = new mongoose.Schema({
    clubName:  
      {
         type: String, 
         require: true
      },
      festivalType:
      {
        type: String, 
        require: true
      },
      description: String,
      images: [String],
      email: String,
      status: 
      {
        type: String,
        default: "pending"
      },
      dateAdded: 
      {
        type: Date,
        default: Date.now
      }
})

export default mongoose.model("Club", clubSchema);