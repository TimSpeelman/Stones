import { DomainError } from "./DomainError";

export class InvalidMoveError extends DomainError {

    public readonly message: string;

    constructor(message: string) {
        super();
        this.message = message;
        Object.setPrototypeOf(this, InvalidMoveError.prototype);
        this.name = this.constructor.name;
    }
}
