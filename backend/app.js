const express = require("express");
const bodyParser = require("body-parser");
const Post = require('../backend/models/posts');
const mongoose = require('mongoose')
const app = express();
mongoose.connect('mongodb://localhost:27017/local', {useNewUrlParser: true})
  .then(()=>{
    console.log('connected');
  }).catch((err)=>{
    console.log(err)
  });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title:req.body.title,
    content:req.body.content
  });

  post.save().then((response)=>{
    res.status(201).json({
      message: 'Post added successfully',
      postId:response._id
    });

  })

});

app.get("/api/posts", (req, res, next) => {
  Post.find()
      .then((document)=>{

        res.status(200).json({
          message: "Posts fetched successfully!",
          posts: document
        });
      });
 
});

app.delete("/api/posts/:id",(req,res,next)=>{
  console.log("called");

  Post.deleteOne({_id:req.params.id})
      .then((response)=>{
        res.status(200).json({message:"post deleted"})
      });
 
})

module.exports = app;
