const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const port = 8080;
const route = require("../Back_End/routes/index");
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const { save_post, show, del, updateLikeCount, addCommentToPost, getCommentsByPostId } = require("./modals/postModal");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(route);

io.on('connection', (socket) => {
  console.log('a user connected');
  
  socket.on('likeClicked', async (count) => {
    // Save like count to the database
    try {
      const postId = count.postId;
      await updateLikeCount(postId, count.count);
      io.emit('updateLikeCount', count);
      console.log(`Like count updated for post ${postId}:`, count.count);
      socket.emit('likeClickedConsoleLog', `Like count updated for post ${postId}: ${count.count}`);
    } catch (error) {
      console.error("Error saving like count to database:", error);
    }
  });

  socket.on('newComment', async (data) => {
    try {
      const { postId, comment } = data;
      // Add comment to the post
      await addCommentToPost(postId, comment);
      // Get updated comments for the post
      const updatedComments = await getCommentsByPostId(postId);
      // Emit updated comments to all clients
      io.emit('updateComments', { postId: postId, comments: updatedComments }); // Updated this line
      console.log("Comment added and updated comments emitted:", updatedComments);
    } catch (error) {
      console.error("Error adding comment and emitting updated comments:", error);
    }
  });
});

server.listen(port, (err) => {
  if (err) {
    console.log("Internal Server Error");
  } else {
    console.log(`Server is running on ${port}`);
  }
});
