const mongoose=require("mongoose");


const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    
    },
    isAvatarImageSet: {
        type: Boolean,
        default: false,
      },
      avatarImage: {
        type: String,
        default: "",
      },
});
const user=new mongoose.model("user",userSchema);
module.exports=user;