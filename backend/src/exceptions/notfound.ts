import { ErrorCode, httpException } from "./root";

export class notFound extends httpException {
    constructor(message:string, errorCode: ErrorCode, errors:any = null ){
        super(message, errorCode, 404, errors);
        
    }
}