import React from "react";
import withMessage from "../hocs/with-message";

const ImageMessage = withMessage(({ message, measure }) => (
    <img
        className="message-image"
        src={message.payload}
        alt=""
        onLoad={measure}
    />
));

export default ImageMessage;