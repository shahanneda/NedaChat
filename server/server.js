const express = require("express");
const app = express();

const server = require("http").Server(app); // create the http servere and conenct it to socket io

const io = require("socket.io")(server); // setup socekt io

let path = require("path");
let chats = {};

let userConnections = {};

let users = {};
users["shahanneda"] = 
{ 
        id:"shahanneda", 
        username:"Shahan", 
        chatsUserIsIn:["Group 1","Group 2","Group 3","Group 4","Group 5"],
}

users["sam"] = 
{ 
        id:"sam", 
        username:"sam", 
        chatsUserIsIn:["Group 1","Group 2","Group 3","Group 4","Group 5", "Group 6"],

}
users["bob"] = 
{ 
        id:"bob", 
        username:"bob", 
        chatsUserIsIn:[ "Group 6"],
}

chats["Group 1"] =
        { 
                id:"Group 1",
                name:"Group 1",
                usersInChat:{
                        "shahanneda": users["shahanneda"],
                        "sam": users["sam"],
                },
                messages:{},
        }
chats["Group 2"] =
        { 
                id:"Group 2",
                name:"Group 2",
                usersInChat:{
                        "shahanneda": users["shahanneda"],
                        "sam": users["sam"],
                },
                messages:{},
        }
chats["Group 3"] =
        { 
                id:"Group 3",
                name:"Group 3",
                usersInChat:{
                        "shahanneda": users["shahanneda"],
                        "sam": users["sam"],
                },
                messages:{},
        }
chats["Group 4"] =
        { 
                id:"Group 4",
                name:"Group 4",
                usersInChat:{
                        "shahanneda": users["shahanneda"],
                        "sam": users["sam"],
                },
                messages:{},
        }
chats["Group 5"] =
        { 
                id:"Group 5",
                name:"Group 5",
                usersInChat:{
                        "shahanneda": users["shahanneda"],
                        "sam": users["sam"],
                },
                messages:{},
        }

chats["Group 6"] =
        { 
                id:"Group 6",
                name:"Group 6",
                usersInChat:{
                        "bob" : {
                                id:"bob",
                                username:"bob",
                        },
                        "sam":{
                                id:"sam",
                                username:"Sam",
                        }
                },
                messages:{},
        }
        
server.listen(80);
console.log("NedaChat Server Started!");


// Add headers
app.use(function (req, res, next) {

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        res.setHeader('Access-Control-Allow-Credentials', true);
        next();
});
app.get('/', function (req, res) {
        res.sendFile(path.join(__dirname + '/../client/index.html'));
});
app.use(express.static(path.join(__dirname + '/../client/')));

app.get('/getChats/:userid', function(req,res){
        console.log("apiEndpoint: getchats triggered");
        let userid = req.params.userid; 
        let storedChats = {};
        let user = users[userid];

        if(user){
                for(let chatId of user.chatsUserIsIn){
                        storedChats[chatId] = chats[chatId];
                }
                let jsonChats = JSON.stringify(storedChats);
                res.send(jsonChats);
        }else{
                res.send({});
        }

});
app.get('/searchForUser/:username', function(req,res){
        let username = req.params.username;
        username = username.toLowerCase();
        let usersToSend = {};
        console.log(users);
        for(let userid of Object.keys(users)){
                console.log(userid);
                if(userid.indexOf(username) != -1){
                      usersToSend[userid] = users[userid].username;  
                }
        }
        console.log(usersToSend);
        res.send(JSON.stringify(usersToSend));

});


io.on('connection', function (socket) {

        socket.on("connection", function(data){

        });

        socket.on("NewConnection", function(data){
                if(userConnections[data.user.id]){
                        console.log("Found other user client id, appending");
                        userConnections[data.user.id].push(socket);
                }else{
                        userConnections[data.user.id]  = [socket];  
                }
                
                if(!(data.user.id in users)){
                        users[data.user.id] = {
                                id: data.user.id,
                                username:data.user.id,
                                chatsUserIsIn:[],
                        };
                        console.log("new user created: " + data.user.id); 
                }
                console.log(users[data.user.id]);
                console.log("New User Connected: name: " + data.user.id);
        });

        socket.on("newMessage", function(data){
                let chat = chats[data.chatId]; // find chat using unique identifier
                chat.messages[data.id] = data; //  data is the message object 

                let usersInChat = chat.usersInChat;
                console.log(usersInChat);
                for(let userid in usersInChat){
                        console.log("user id :" + userid);
                        let userConnectionsForId = userConnections[userid];
                        console.log("trying gto get user: " + userid + " user connections " + userConnections);
                        //console.log(userConnections);
                        if(userConnectionsForId){ //  we have to check whether user is actually in chat or not

                                userConnectionsForId.map( userConnection => { // map through all of the clients of the user, the same id could have multiple sessions
                                        if(userConnection){
                                                userConnection.emit("chatUpdate", chat);
                                                console.log("sending message to " + userid );
                                        }
                                });
                        }
                }

                //socket.broadcast.emit("newMessage", data);
                console.log("New Message: ");
                //console.log(chat);
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
                        messages: {},
                };

                chats += newChat;
        });

});
