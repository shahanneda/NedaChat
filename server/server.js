const express = require("express")();

const server = require("http").Server(express); // create the http servere and conenct it to socket io

const io = require("socket.io")(server); // setup socekt io


let chats = [];

let userConnections = [];

chats += [{
        name:"Group 1",
        usersInChat:["shahanneda", "sam"],
        messages:[],
}];

server.listen(80);
console.log("NedaChat Server Started!");


express.get('/', function (req, res) {
        //res.sendFile(__dirname + '/index.html');
});


io.on('connection', function (socket) {

        socket.on("connection", function(data){
                
        });

        socket.on("NewConnection", function(data){
                io.emit("newUser", data);
                userConnections[data.user.name]  = socket;  
                console.log("New User Connected: name: " + data.user.name);
        });

        socket.on("newMessage", function(data){
                let chat = chats[data.indexOfChat]; // find chat using unique identifier
                chat.messages += data; //  data is the message object 
                
                let usersInChat = chat.usersInChat;

                for(let user of usersInChat){
                        let userConnection = userConnections[user.name];
                         
                        userConnection.emit("chatUpdate", chat);
                }

                socket.broadcast.emit("newMessage", data);
                console.log("New Message: " + data);
        });


        socket.on("getChats", function(data){
                socket.emit(chats);
        });


        socket.on("createChat", function(data){
                let newChat = {
                        name:data.name,
                        usersInChat: data.usersInChat,
                        messages: [],
                };

                chats += newChat;
        });

});
