let mongoose=require("mongoose");
let schema=mongoose.Schema({
    name:String,
    about:String
});

let modal=mongoose.model("profile_data",schema);
let mongUrl="mongodb+srv://seebizbpt0623evdev41:l2Be11O5zei97LtK@tasks.fkxsczr.mongodb.net/";

let save_profile=async(name,about)=>{
   await  mongoose.connect(mongUrl);
   let user=new modal({
    name:name,
    about:about
   });
   await user.save();
}

module.exports={save_profile}