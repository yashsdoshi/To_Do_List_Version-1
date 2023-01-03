//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
var items = [];
const app = express();
const workitems = [];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
const port = 3000

app.get('/', (req, res) => {
    var today = new Date();
    var options ={
        weekday: "long",
        day: "numeric",
        month: "long"
    };
    var day = today.toLocaleDateString("en-US", options);
    res.render("lists", {listtitle: day, newitem: items});
});

app.post("/work", function(req, res){
    let item = req.body.newitem;
    workitems.push(item);
    res.redirect("/work");
});

app.post("/", function(req, res){
    let item = req.body.newitem;
    if(req.body.list === "Work"){
        workitems.push(item);
        res.redirect("/work");
    }else{
        items.push(item)
        res.redirect("/");
    }
});

app.get("/work", function(req, res){
    res.render("lists", {listtitle: "Work List", newitem: workitems});
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});