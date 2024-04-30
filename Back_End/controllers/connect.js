let {saveData,check}=require("../modals/connectModal");
let jwt = require("jsonwebtoken");
let secretKey = "your-secret-key";

let path=require("path");

let show=(re,res)=>{
    res.sendFile(path.join(__dirname,"..","../Front_End/index.html"))
}

let sign=async(req,res)=>{
    let {name, phno,email,password}=req.body
    let getData=await saveData(name,phno,email,password);
    console.log("======",getData);
    res.send({getData})
    return getData;
}

let login=async(req,res)=>{
    let {email,password}=req.body;
    let getData=await check(email,password);
    if(getData==false){
        res.send({ message: "Your passsword is not correct" });
} else {
  jwt.sign({ email }, secretKey, { expiresIn: "1h" }, (err, token) => {
    return res.status(200).json({ token: token});
  });
}
}



module.exports={show,sign,login}