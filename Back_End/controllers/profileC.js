const { save_profile } = require("../modals/profile");
let profileC=async(req,res)=>{
    let{name,about}=req.body;
    console.log("==========>",name,about);
   let getData= await save_profile(name, about);
    console.log("Data saved successfully");
    res.send({name:name,about:about})
    return getData;
}
module.exports={profileC};