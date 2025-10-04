import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  username:{
    type:String,
    required:true,
  },
  password: {
    type: String,
    required: true,
  },
  isBlock:{
    type:Boolean,
    default:false
  }
});

export default mongoose.model('user',userSchema);