import { ErrorCode, httpException } from "./root";

export class unAuthorized extends httpException {
    constructor(message:string, errorCode: ErrorCode, errors:any = null ){
        super(message, errorCode, 401, errors);
        
    }
}