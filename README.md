# NedaChat
## An Instant messaging app feturing group chats, personal messages, and more!

### [Click Here to go to NedaChat (shahan.ca/nedachat)](http://shahan.ca/nedachat)

This app is essentially a clone of Facebook messenger, made with the MERN stack, using mongo db for the databse, express and node js for the server,
and react for the frontend. Another very import library was **socket.io** which provided the instant messing websockets, that allows all users in the chat to 
recieve instant updates when a new chat is sent.


Libries and tools used:
- Mongo D
- Node js for the server side
- Express


There is many optmization tricks used to make the app as responsive and 
### Running

- setup mongo db database, either on atlas or locally
- install required dependensies with npm install 
- creat an auth.json file in the server folder, like the following
```
{
  "dbPassword":"MONGO DB ATLAS DATABASE PASSWORD HERE"
}
```
- Update the uri constant in the server/server.js file to match you mongodb uri
- run ` node server/server.js `


