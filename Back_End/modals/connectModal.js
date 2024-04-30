let mongoose=require("mongoose");
let jwt=require("jsonwebtoken");
let schema=mongoose.Schema({
    name:String,
    phno: Number,
    email:String,
    password:String,
});

let modal=mongoose.model("project_sign_up",schema);
let mongUrl="mongodb+srv://seebizbpt0623evdev41:l2Be11O5zei97LtK@tasks.fkxsczr.mongodb.net/";

let saveData=async(name,phno,email,password)=>{
   await  mongoose.connect(mongUrl);
   let user=new modal({
    name:name,
    phno:phno,
    email:email,
    password:password
   });
   await user.save();
}

let check=async(email,password)=>{
    await  mongoose.connect(mongUrl);
    let result=await modal.findOne({email:email,password:password})
    if(result==null){
        console.log("false");
        return false;
    }else{
        console.log("password is correct");
        return result;
    }
}
module.exports={saveData,check}