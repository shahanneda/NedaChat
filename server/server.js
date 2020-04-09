const express = require("express");
const app = express();

const server = require("http").Server(app); // create the http servere and conenct it to socket io

const io = require("socket.io")(server); // setup socekt io

let path = require("path");
let chats = {};

let userConnections = {};

chats["Group 1"] =
        { 
                name:"Group 1",
                usersInChat:{
                        "shahanneda93835498" : {
                                id:"shahanneda93835498",
                                username:"Shahan",
                        },
                        "samdrubseky435325":{
                                id:"samdrubseky435325",
                                username:"Sam",
                        }
                },
                messages:{},
        }

/*chats["Group 2"] =
        { 
                name:"Group 2",
                usersInChat:{
                        "shahanneda93835498" : {
                                id:"shahanneda93835498",
                                username:"Shahan",
                        },
                        "samdrubseky435325":{
                                id:"samdrubseky435325",
                                username:"Sam",
                        }
                },
                messages:{},
        }
        */
server.listen(80);
console.log("NedaChat Server Started!");


// Add headers
app.use(function (req, res, next) {

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
app.get('/', function (req, res) {
        res.sendFile(path.join(__dirname + '/../client/index.html'));
});
app.use(express.static(path.join(__dirname + '/../client/')));

app.get('/getChats', function(req,res){
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
                if(userConnections[data.user.id]){
                        console.log("Found other user client id, appending");
                        userConnections[data.user.id].push(socket);
                }else{
                        userConnections[data.user.id]  = [socket];  
                }

                console.log("New User Connected: name: " + data.user.name);
        });

        socket.on("newMessage", function(data){
                let chat = chats[data.chatName]; // find chat using unique identifier
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
