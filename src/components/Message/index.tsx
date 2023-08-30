import React from "react";

import './Message.css';

const cssStyleTable = {
    "error": {
        "color": "red",
        "border": "1px red solid"
    },
    "success": {
        "color": "green",
        "border": "1px green solid"
    },
    "info": {
        "color": "blue",
        "border": "1px blue solid"
    }
};

export interface MessageProps {
    type: "error" | "success" | "info",
    msg: string
};

const Message = ({type, msg}: MessageProps):JSX.Element => {
    
    return (
        <div style={cssStyleTable[type]} className="message-box">
            {msg}
        </div>
    )
}

Message.displayName = "Message";
export default Message;