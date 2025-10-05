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
    type: mongoose.Schema.Types.ObjectId,
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
 const Item=mongoose.model('Item',itemSchema,'traders.users');
 export default Item;