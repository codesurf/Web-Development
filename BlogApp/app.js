var express = require("express");
var app = express();
var expressSanitizer = require("express-sanitizer");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");

// APP CONFIG
mongoose.connect("mongodb://localhost/blog-app", {useUnifiedTopology: true, useNewUrlParser: true});
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.set("view engine", "ejs");
app.use(methodOverride("_method"));

// MONGO DB CONFIG
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);

// Blog.create({
//     title: "Test Blog",
//     body: "This ia a testing blog"
// });

// ROUTES

app.get("/", function(req,res){
    res.redirect("/blogs");
});

// INDEX ROUTE
app.get("/blogs", function(req, res){
    Blog.find({}, function(error, blogs){
        if(error){
            console.log(error);
        }
        else{
            res.render("index", {blogs: blogs});
        }
    });
});

//NEW ROUTE
app.get("/blogs/new",function(req,res){
    res.render("new");
});

//CREATE ROUTE
app.post("/blogs", function(req,res){
    req.body.blog.body = req.sanitize(req.body.blog.body);
    var data = req.body.blog;
    Blog.create(data, function(error, blog){
        if(error){
            console.log(error);
        }
        else{
            res.redirect("/blogs");
        }
    });
});

//SHOW ROUTE
app.get("/blogs/:id", function(req,res){
    Blog.findById(req.params.id, function(error, foundBlog){
        if(error){
            console.log(error);
        }
        else{
            res.render("show", {blog: foundBlog});
        }
    });
});

//EDIT ROUTE
app.get("/blogs/:id/edit", function(req,res){
    Blog.findById(req.params.id, function(error, foundBlog){
        if(error){
            console.log(error);
        }
        else{
            res.render("edit", {blog: foundBlog});
        }
    });
});

//UPDATE ROUTE
app.put("/blogs/:id", function(req,res){
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(error, updatedBlog){
        if(error){
            console.log(error);
        }
        else{
            res.redirect("/blogs/" + req.params.id);
        }
    });
});

//DELETE ROUTE
app.delete("/blogs/:id", function(req,res){
    Blog.findByIdAndRemove(req.params.id, function(error){
        if(error){
            console.log(error);
        }
        else{
            res.redirect("/blogs");
        }
    });
});

app.listen("3000", function(){
    console.log("Server is Started!");
});

