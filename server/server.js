const express = require("express")();

const server = require("http").Server(express); // create the http servere and conenct it to socket io

const io = require("socket.io")(server); // setup socekt io


let chats = {};

let userConnections = [];

chats["Group 1"] =
        { 
                name:"Group 1",
                usersInChat:["shahanneda", "sam"],
                messages:[],
        }

chats["Group 2"] =
        { 
                name:"Group 2",
                usersInChat:["shahanneda", "sam"],
                messages:[],
        }

server.listen(80);
console.log("NedaChat Server Started!");


// Add headers
express.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
express.get('/', function (req, res) {
        //res.sendFile(__dirname + '/index.html');
});
express.get('/getChats', function(req,res){
        console.log("apiEndpoint: getchats triggered");
        let storedChats = chats;
        console.log(storedChats);
        let jsonChats = JSON.stringify(storedChats);
        console.log(jsonChats);
        res.send(jsonChats);
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
                let chat = chats[data.chatName]; // find chat using unique identifier
                chat.messages += data; //  data is the message object 
                
                let usersInChat = chat.usersInChat;
                console.log(usersInChat);
                for(let username of usersInChat){

                        let userConnection = userConnections[username];
                        console.log("trying gto get user: " + username + " user connections " + userConnections);
                        if(userConnection){
                                userConnection.emit("chatUpdate", chat);
                        }
                }

                //socket.broadcast.emit("newMessage", data);
                console.log("New Message: " + data);
        });


/*        socket.on("getChats", function(data){
                console.log(chats);
                let info = [{hola: "HEOOLL"}];
                console.log(info);
                socket.emit("allChatUpdate", { test:{chats} });
        });
*/

        socket.on("createChat", function(data){
                let newChat = {
                        name:data.name,
                        usersInChat: data.usersInChat,
                        messages: [],
                };

                chats += newChat;
        });

});
