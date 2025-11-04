export class httpException extends Error{
    message: string;
    statusCode: number;
    errorCode: ErrorCode;
    errors: any;

    constructor(message:string, errorCode: any , statusCode: number, errors:any){
        super(message)
        this.message = message,
        this.errorCode = errorCode,
        this.statusCode = statusCode,
        this.errors = errors
    }


}
export  enum  ErrorCode {
    USER_NOT_FOUND = "USER_NOT_FOUND",
    USER_ALREADY_EXISTS = "USER_ALREADY_EXISTS",
    INVALID_CREDENTIALS = "INVALID_CREDENTIALS",
    UNAUTHORIZED = "UNAUTHORIZED",
    INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
    BAD_REQUEST = "BAD_REQUEST",
    NOT_FOUND = "NOT_FOUND",
    CONFLICT = "CONFLICT",
    UNPROCESSABLE_ENTITY = "UNPROCESSABLE_ENTITY",

}