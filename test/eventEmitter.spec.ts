import { EventEmitter } from '../src/utils/eventEmitter';

test('eventEmitter on and emit', () => {
    const eventEmitter = new EventEmitter();

    const demo = 'demo';

    eventEmitter.on(demo, () => console.log('demo...'));

    expect(eventEmitter.listeners(demo).length).not.toBe(0);

    expect(eventEmitter.emit(demo)).not.toBe(0);

});

test('eventEmitter once', () => {
    const eventEmitter = new EventEmitter();

    const demo = 'demo';

    eventEmitter.once(demo, () => console.log('demo...'));

    expect(eventEmitter.listeners(demo).length).not.toBe(0);

    expect(eventEmitter.emit(demo)).not.toBe(0);

    expect(eventEmitter.emit(demo)).toBe(0);

});

test('eventEmitter prependListener', () => {
    const eventEmitter = new EventEmitter();

    const demo = 'demo';
    let infos: string[] = [];

    eventEmitter.on(demo, () => infos.push('demo...'));

    eventEmitter.prependListener(demo, () => infos.push('prepend...'));

    expect(eventEmitter.listeners(demo).length).toBe(2);

    eventEmitter.emit(demo);

    expect(infos).toHaveLength(2);

    expect(infos[0]).toEqual('prepend...');

    expect(infos[1]).toEqual('demo...')

});
