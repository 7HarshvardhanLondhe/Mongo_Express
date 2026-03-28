const express=require("express");
const app=express();

const mongoose =require("mongoose");
const path=require("path");
//chat page
const Chat=require("./models/chat.js");
const methodOverride=require("method-override");

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
//77imp-req.body se data pass sathi
app.use(express.urlencoded({extended:true}));

app.use(methodOverride('_method'));

main()
.then(()=>{
    console.log("connection successful");
})
.catch(err=> console.log(err));

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

// let chat1=new Chat({
//     from:"neha",
//     to:"priya",
//     msg:"send me",
//     created_at:new Date() //utc
// });
// chat1.save().then((res)=>{
//     console.log(res);
// })

//index route
app.get("/chats",async (req,res)=>{
    let chats=await Chat.find();
    // console.log(chats);
    res.render("index.ejs",{ chats });
})

//new route
app.get("/chats/new",(req,res)=>{
    res.render("new.ejs");
});

//create route for new chat 
app.post("/chats",(req,res)=>{
    //77 imp-access form data :new chat create
    let { from,to,msg }=req.body;
    let newChat=new Chat({
        from: from,
        to:to,
        msg:msg,
        created_at:new Date()
    });
    newChat.save().then(res=>{//chat db save sathi
        console.log("chat was saved successfully");
    }).catch(err=>{console.log(err);
    });
    res.redirect("/chats");
});

//edit route
app.get("/chats/:id/edit",async (req,res)=>{
    let { id }=req.params;
    let chat=await Chat.findById(id);
    res.render("edit.ejs",{ chat });
})

//update route
app.put("/chats/:id",async (req,res)=>{
    let { id }=req.params;
    let { msg: newMsg }=req.body;
    let updateChat=await Chat.findByIdAndUpdate(
        id,
        { msg:newMsg },
        { runValidators: true ,new: true}
    );
    console.log(updateChat);
    res.redirect("/chats");
});
//delete route
app.delete("/chats/:id",async (req,res)=>{
    let { id }=req.params;
    let deleteChat=await Chat.findByIdAndDelete(id);
    console.log("deleted chat:",deleteChat);
    res.redirect("/chats");
});

app.get("/",(req,res)=>{
    res.send("root is working!");
})
app.listen(9999,()=>{
    console.log("server listening on this port");
})

