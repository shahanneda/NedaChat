import React from "react";
import ReactDOM from "react-dom";
import io from 'socket.io-client';
import Chat from "./chat.jsx";

const wrapper = document.getElementById("container");

ReactDOM.render(
        <div>
                <Chat username="shahanneda"/>
        </div>
, wrapper);



