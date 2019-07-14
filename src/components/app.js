import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import image from "./download.png";
import MessageList from "./message-list";
import Message, { MessageType, MessageFrom } from "../utils/message";
import { useLocalStorage } from "./hooks/hooks";

export default function App({ currentUser, friend }) {
    const [text, setText] = useState("");
    const [fromMe, setFromMe] = useState(true);
    const [messageHistory, setMessageHistory] = useLocalStorage(
        `${currentUser}_history`,
        { [friend]: [] }
    );

    const messageFrom = useMemo(() => fromMe? MessageFrom.ME : MessageFrom.FRIEND, [fromMe]);

    function handleText() {
        if (text.trim() !== "") {
            const message = new Message(MessageType.TEXT, text, messageFrom);
            setMessageHistory(prevMessage =>
                Object.assign({}, prevMessage, {
                    [friend]: [...prevMessage[friend], message]
                })
            );

            setText("");
        }
    }

    function handleImage() {
        const message = new Message(MessageType.IMAGE, image, messageFrom);
        setMessageHistory(prevMessage =>
            Object.assign({}, prevMessage, {
                [friend]: [...prevMessage[friend], message]
            })
        );
    }

    function handleNotification() {
        const message = new Message(
            MessageType.NOTIFICATION,
            "You recalled a message"
        );
        setMessageHistory(prevMessage =>
            Object.assign({}, prevMessage, {
                [friend]: [...prevMessage[friend], message]
            })
        );
    }

    return (
        <div className="chatting">
            <header className="header">{friend}</header>
            <MessageList messages={messageHistory[friend]} friend={friend} />
            <footer className="footer">
                <div className="input-button">
                    <input
                        className="type-input"
                        type="text"
                        placeholder="type a message..."
                        value={text}
                        onChange={e => setText(e.target.value)}
                    />
                    <button className="enter-button" onClick={handleText}>
                        SEND
                    </button>
                </div>
                <div className="radio-group">
                    <div className="radio-label">
                        <input
                            type="radio"
                            value="other"
                            checked={!fromMe}
                            onChange={() => setFromMe(false)}
                        />
                        <label onClick={() => setFromMe(false)}>OTHER</label>
                    </div>
                    <div className="radio-label">
                        <input
                            type="radio"
                            value="me"
                            checked={fromMe}
                            onChange={() => setFromMe(true)}
                        />
                        <label onClick={() => setFromMe(true)}>ME</label>
                    </div>
                    <button
                        className="enter-button"
                        onClick={handleNotification}
                    >
                        NOTIFICATION
                    </button>
                    <button className="enter-button" onClick={handleImage}>
                        IMAGE
                    </button>
                    <button
                        className="enter-button"
                        onClick={() => setMessageHistory({ [friend]: [] })}
                    >
                        CLEAR
                    </button>
                </div>
            </footer>
        </div>
    );
}

App.propTypes = {
    currentUser: PropTypes.string,
    friend: PropTypes.string
};

App.defaultProps = {
    currentUser: "me",
    friend: "Zjl"
};