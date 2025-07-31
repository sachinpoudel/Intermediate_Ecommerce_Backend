import { ErrorCode, httpException } from "./root";

export class badRequest extends httpException{
    constructor(message: string, errorCode: ErrorCode){
super(message, errorCode, 401, null)
    }
    
}