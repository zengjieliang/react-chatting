import React from "react";
import withMessage from "../hocs/with-message";

const NotificationMessage = withMessage(({ message }) => (
    <span>{message.payload}</span>
));

export default NotificationMessage;