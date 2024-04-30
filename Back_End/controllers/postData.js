const express = require("express");
const cloudinary = require("cloudinary").v2;
const sharp = require("sharp");
const path = require("path");
const {  save_post, show, del, updateLikeCount, addCommentToPost, getCommentsByPostId } = require("../modals/postModal");

cloudinary.config({
    cloud_name: 'drqm7scy2',
    api_key: '655259685382345',
    api_secret: 'LqWnTHENlF8wD9usgc7HyChSgro'
});

const posts = async (req, res) => {
    try {
        const imgFile = req.file;
        const caption = req.body.caption;

        // Resize and compress image
        await sharp(imgFile.path)
            .resize(400, 400)
            .toFile(path.join(__dirname, "../", 'images', `${imgFile.filename}_overview1.jpg`));

        // Upload image to Cloudinary
        const img1Cloudinary = await cloudinary.uploader.upload(imgFile.path);

        // Save post to database
        const savedPost = await save_post(img1Cloudinary.url, caption);
        
        // Fetch all users from the database
        const users = await show();
        
        // Send response to frontend with user data and post data
        res.json({ users: users });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
let del1=async (req, res) => {
    const postId = req.params.postId;
   let user= await del(postId);
   res.json({user})
}
const getAllPosts = async (req, res) => {
    try {
      const allPosts = await show();
      console.log(allPosts);
      res.json({ allPosts: allPosts });
    } catch (error) {
      console.error("Error fetching all posts:", error);
      res.status(500).json({ error: "Failed to fetch posts" });
    }
  };
module.exports = { posts,del1,getAllPosts };
