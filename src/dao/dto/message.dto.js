class MessageDTO {
    constructor(message) {
        this.id = message._id;
        this.user = message.user;
        this.content = message.message;
        this.timestamp = message.timestamp;
    }
}