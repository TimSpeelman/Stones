export class DomainError extends Error {
    // You have to extend Error, set the __proto__ to Error, and use
    // Object.setPrototypeOf in order to have a proper custom error type in JS.
    // Because JS/TS are dumb sometimes, and all three are needed to make this
    // work in all browsers.
    public __proto__ = Error;

    constructor() {
        super();
        Object.setPrototypeOf(this, DomainError.prototype);
        this.name = this.constructor.name;
    }
}
