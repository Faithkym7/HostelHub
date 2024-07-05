import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true, 
        min:2,
        max:100
     },
     email:{
        type: String,
        required: true,       
        max: 50,
        uinque: true
      },
    password: {
         type: String,
          required: true 
    },
    role: { 
        type: String, 
        enum: ['user', 'admin'], 
        default: 'user'
    }
},
{ timestamps: true }
);

const  User = mongoose.model("User", UserSchema);
export default User;
