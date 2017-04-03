
var EventEmitter = require('events').EventEmitter;

/**
 * Simple state management
 * 
 * Instead of having multiple mutators for states,
 * a single set(key, val) method 
 */
class Store extends EventEmitter 
{
    constructor() {
        super();
        this.state = {}
        this.readOnlyKeys = [];
    }
    
    /**
     * Event name emitted in Set operation
     */
    get eventSet() { return 'event_set'; }

    /**
     * Event name emitted in get ooperation
     */
    get eventGet() { return 'event_get'; }

    /**
     * access state information
     * @note currently not performing access validation
     * @param {String} key
     * @param {any} defaultValue if key is not found, it will return back this value
     */
    get(key, defaultValue) {
        this.emit(this.eventGet, key, this);
        if(key in this.state) return this.state[key];
        else return defaultValue;
    }

    /**
     * store information in the state
     * @note currently not performing any validation
     * @param {String} key
     * @param {any} value
     * @throws
     */
    set(key, value) {
        if(this.readOnlyKeys.find(key) !== undefined) {
            throw new Error("Cannot mutate read only property.");
        }

        this.emit(this.eventSet, key, value, this);
        this.state[key] = value;
    }
}

module.exports = Store;
