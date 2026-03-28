const mongoose=require("mongoose");
const Chat=require("./models/chat.js");


main()
.then(()=>{
    console.log("connection successful");
})
.catch(err=> console.log(err));

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

let allChats=[
    {
        from:"neha",
        to:"preety",
        msg:"send notes",
        created_at:new Date(),
    },
    {
        from:"abc",
        to:"xxdd",
        msg:"send notes to me urgent",
        created_at:new Date(),
    },
     {
        from:"abcde",
        to:"xxdd",
        msg:"send notes to me urgent fastly..",
        created_at:new Date(),
    },

];
Chat.insertMany(allChats);