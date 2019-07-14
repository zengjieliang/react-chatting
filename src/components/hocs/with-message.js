import React from "react";
import { MessageFrom } from "../../utils/message";

//HOC: add more common feature for message component (send failed, tool box ...)
//WrappedComponent: customize his own feature
const withMessage = WrappedComponent => {
    const WithMessage = props => {
        const { style, messageFrom, ...passProps } = props;
        const withClass =
            messageFrom === MessageFrom.NONE
                ? "message-item message-none"
                : messageFrom === MessageFrom.ME
                ? "message-item message-from-me"
                : "message-item message-from-other";

        return (
            <div style={style} className={withClass}>
                <WrappedComponent {...passProps} />
            </div>
        );
    };

    WithMessage.displayName = `WithMessage(${WrappedComponent.displayName ||
        WrappedComponent.name ||
        "Component"})`;

    return WithMessage;
};

export default withMessage;
