const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = 3001;
const cors = require("cors");

const messagesFile = path.join(__dirname, "messages.json");


const allowedOrigins = ['https://aryxnsrivastava10.netlify.app'];

app.use(cors({
  origin: function (origin, callback) {
    if(!origin || allowedOrigins.includes(origin)){
      callback(null, true);
    } 
    else{
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

app.use(express.json());


if(!fs.existsSync(messagesFile)){
  fs.writeFileSync(messagesFile, "[]");
}

app.post("/api/messages", (req, res) =>{
  const { name, subject, message } = req.body;

  const safeName = name.replace(/[^\w\s\-\'À-ÿ]/g, "");
  const safeSubject = subject.replace(/[^A-Za-z\s]/g, "");
  const safeMessage = message.replace(/[<>]/g, "");

  const newMessage ={
    name: safeName,
    subject: safeSubject,
    message: safeMessage,
  };

  const existing = JSON.parse(fs.readFileSync(messagesFile));
  existing.push(newMessage);
  fs.writeFileSync(messagesFile, JSON.stringify(existing, null, 2));

  res.json({ status: "Message saved" });
});

app.get("/api/messages", (req, res) =>{
  const messages = JSON.parse(fs.readFileSync(messagesFile));
  res.json(messages);
});

app.listen(PORT, () =>{
  console.log(`Backend running at http://localhost:${PORT}`);
});