//add more info for message
export default class Message {
    constructor(type, payload, from = MessageFrom.NONE) {
        this.type = type;
        this.payload = payload;
        this.from = from;
        //this.time = "",
        //this.success = true;
    }
}

//add more message type
export const MessageType = Object.freeze({
    TEXT: 0,
    IMAGE: 1,
    NOTIFICATION: 2
});

export const MessageFrom = Object.freeze({
    NONE: 0,
    ME: 1,
    FRIEND: 2
});