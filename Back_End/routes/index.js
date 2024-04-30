let express=require("express");
let app=express();
let route=express.Router();
let path=require("path");
let multer=require("multer");
let cloudinary=require("cloudinary");
let sharp=require("sharp");
let {sign,login}=require("../controllers/connect");
let {posts,del1,getAllPosts }=require("../controllers/postData")
// let{ save_post, show, del, updateLikeCount, addCommentToPost, getCommentsByPostId }=require("../modals/postModal")
let {profileC}=require("../controllers/profileC")
let cors=require("cors");

app.use(cors())

//image work 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, "../images"));
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname); 
    },
  });
const upload = multer({ storage: storage });

// route.get("/",show)
route.post("/sign",sign);
route.post("/login",login);
route.post("/upload",upload.single("image"),posts);
route.post("/profile",profileC)
route.delete('/deletePost/:postId',del1 );
route.get("/posts", getAllPosts);

module.exports= route;