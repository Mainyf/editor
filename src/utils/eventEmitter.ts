export interface IEventEmitter {

    getMaxListeners: number;

    setMaxListeners(count: number): void;

    emit(type: string, ...args: any[]): number;

    on(type: string, callback: (...args: any[]) => void, flag: boolean): void;

    prependListener(type: string, callback: (...args: any[]) => void): void;

    once(type: string, callback: (...args: any[]) => void, flag: boolean): void;

    removeListener(type: string, callback: (...args: any[]) => void): void;

    removeAllListeners(type?: string): void;

    listeners(type: string): any[];

}

export interface IHandlerGroup {
    [type: string]: Function[];
}

export class EventEmitter implements IEventEmitter {

    private static _defaultMaxListeners = 10;
    private _events: IHandlerGroup = Object.create(null);
    private _count?: number;
    private _NEW_LISTENER = 'newListener';

    public setMaxListeners(count: number) {
        this._count = count;
    }

    public get getMaxListeners(): number {
        return this._count || EventEmitter._defaultMaxListeners;
    }

    public emit(type: string, ...args: any[]): number {
        let result = 0;
        if(this._events[type]) {
            this._events[type].forEach((fn: Function) => {
                fn.apply(this, args);
                result++;
            });
        }
        return result;
    }

    public on(type: string, callback: (...args: any[]) => void, flag: boolean = false) {
        this._fixInherits();
        this._triggerNewListener(type);
        if (this._events[type]) {
            if (flag) {
                this._events[type].unshift(callback);
            } else {
                this._events[type].push(callback);
            }
        } else {
            this._events[type] = [callback];
        }
        const maxListeners = this.getMaxListeners;
        const currentLength = this._events[type].length - 1;
        if (currentLength >= maxListeners) {
            throw Error(`listeners count already maxnumber, maxListeners: ${maxListeners}, currentCount: ${currentLength}`);
        }
    }

    public prependListener(type: string, callback: (...args: any[]) => void) {
        this.on(type, callback, true);
    }

    public once(type: string, callback: (...args: any[]) => void, flag: boolean = false) {
        const wrap: any = () => {
            callback();
            this.removeListener(type, wrap);
        };
        wrap._realCallback = callback;
        this.on(type, wrap, flag)
    }

    public removeListener(type: string, callback: any) {
        if (this._events[type]) {
            this._events[type] = this._events[type].filter((fn: Function) => {
                return fn !== callback && fn !== callback._realCallback;
            });
        }
    }

    public removeAllListeners(type?: string): void {
        if (type) {
            this._events[type] = [];
        } else {
            this._resetEvent();
        }
    }

    public listeners(type: string): Function[] {
        return this._events[type];
    }

    private _resetEvent() {
        this._events = Object.create(null);
    }

    private _fixInherits() {
        if (!this._events) {
            this._resetEvent();
        }
    }

    private _triggerNewListener(type: string) {
        if (type === this._NEW_LISTENER) {
            if (this._events[this._NEW_LISTENER] && this._events[this._NEW_LISTENER].length) {
                this._events[this._NEW_LISTENER].forEach((fn: Function) => fn(type))
            }
        }
    }

}