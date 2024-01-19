import mongoose from "mongoose";

const schema1=mongoose.Schema({
    User_ID:{type:String,
    require:[true,"Username is required"],
    unique:[true,"username already exist"]
    },
    Pwd:{type:String,
        require:[true,"password is required"],
        unique:[true,"password already exist"]
    }
})
export default mongoose.model.users||mongoose.model("user",schema1)