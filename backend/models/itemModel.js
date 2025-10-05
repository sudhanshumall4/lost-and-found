import mongoose from "mongoose";

const itemSchema=new mongoose.Schema({
    title:
    {
        type:String,
        required:true,
        trim:true
    },
    description:
    {
        type:String,
        trim:true,
        required:true
    },
    type:
    {
        type:String,
        enum:["lost","found"],
        required:true
    },
    status:
    {
        type:String,
        enum:["Pending Approval","Approved","Rejected","Claimed"],
        default:"Pending Approval"
    },
    reportedBy:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:false
    },
     claimantId: {
    type: String,
    ref: "User",
    default: null
  },

  dateReported: {
    type: Date,
    default: Date.now
  },

  dateClaimed: {
    type: Date
  }
});

// FIX: The third argument 'traders.users' forces the model to use a collection
// with that name. This is causing the app to look for items in the wrong
// collection. Removing it allows Mongoose to correctly use the "items" collection.
const Item=mongoose.model('Item',itemSchema);

export default Item;