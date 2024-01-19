import mongoose from "mongoose";

const schema=mongoose.Schema({
    name:{type:String},
    lang:{type:String},
    cate:{type:String},
    dir:{type:String},
    rev:{type:String},
    time:{type:String},
    disc:{type:String},
    rate:{type:String},
    poster:{type:String},
    bg:{type:String}
})
export default mongoose.model.Movies||mongoose.model("Movie",schema);