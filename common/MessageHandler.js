export class messageHandler {
    constructor(statusCode, message) {
        this.statusCode = statusCode;
        this.message = message;
    }
}


export class responseHandler{
    constructor(data,error = null){
        this.data = data;
        this.error = error;
     }
}