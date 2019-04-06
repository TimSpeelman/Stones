import { DomainError } from "./DomainError";

export class OutOfBoundsError extends DomainError {

    public readonly message: string;

    constructor(message: string) {
        super();
        this.message = message;
        Object.setPrototypeOf(this, OutOfBoundsError.prototype);
        this.name = this.constructor.name;
    }
}
