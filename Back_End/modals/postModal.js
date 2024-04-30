const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
    comment: String,
});
const imageSchema = new mongoose.Schema({
    url: String,
    caption: String,
    likeCount: { type: Number, default: 0 },
    comments: [commentSchema]
});

const PostModel = mongoose.model("Post", imageSchema);
const save_post = async (url, caption) => {
    try {
        await mongoose.connect('mongodb+srv://seebizbpt0623evdev41:l2Be11O5zei97LtK@tasks.fkxsczr.mongodb.net/', {
            keepAlive: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        } 
    )

        const post = new PostModel({
            url: url,
            caption: caption
        });
        const savedPost = await post.save();
        console.log("Post saved successfully:", savedPost);
        return savedPost;
    } catch (error) {
        console.error("Error saving post to database:", error);
        throw error;
    }
};

// Function to retrieve all posts from the database
const show = async () => {
    try {
        const posts = await PostModel.find();
        return posts;
    } catch (error) {
        console.error("Error fetching posts:", error);
        throw error;
    }
};

// Function to delete a post from the database based on its ID
const del = async (postId) => {
    try {
        const deletedPost = await PostModel.findByIdAndDelete(postId);
        console.log("Deleted post:", deletedPost);
        return deletedPost;
    } catch (error) {
        console.error("Error deleting post:", error);
        throw error;
    }
};

// Function to update the like count for a post in the database
const updateLikeCount = async (postId, likeCount) => {
    try {
        const updatedPost = await PostModel.findByIdAndUpdate(postId, { likeCount: likeCount }, { new: true });
        console.log("Updated like count for post:", updatedPost);
        return updatedPost;
    } catch (error) {
        console.error("Error updating like count:", error);
        throw error;
    }
};

const addCommentToPost = async (postId, comment) => {
    try {
        const post = await PostModel.findById(postId);
        if (!post) {
            throw new Error("Post not found");
        }
        post.comments.push({ comment: comment });
        const savedPost = await post.save();
        console.log("Comment added to post:", savedPost);
        return savedPost;
    } catch (error) {
        console.error("Error adding comment to post:", error);
        throw error;
    }
};

// Function to get comments for a post
const getCommentsByPostId = async (postId) => {
    try {
        const post = await PostModel.findById(postId);
        if (!post) {
            throw new Error("Post not found");
        }
        return post.comments;
    } catch (error) {
        console.error("Error fetching comments:", error);
        throw error;
    }
};

module.exports = { save_post, show, del, updateLikeCount, addCommentToPost, getCommentsByPostId };

// module.exports = { save_post, show, del, updateLikeCount };
