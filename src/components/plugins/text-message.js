import React from "react";
import withMessage from "../hocs/with-message";

const TextMessage = withMessage(({ message }) => (
    <span className="message-text">{message.payload}</span>
));

export default TextMessage;