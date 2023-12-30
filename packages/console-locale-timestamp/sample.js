import Console from './dist/ConsoleLocaleTimestamp.js';

const string = 'Hello World!';
const object = {
	1001: { name: 'John Smith', age: '20' },
	1002: { name: 'Taro Yamada', age: '25' },
};

const console1 = new Console();
console1.log(string);

const console2 = new Console('en-US', { minute: '2-digit', second: '2-digit' }, ['[', ']'], ' - ');
console2.log(string);

const console99 = new Console();
console.log('--- assert start');
console99.assert();
console99.assert(true, `${string} (assert: true)`);
console99.assert(false, `${string} (assert: false)`);
console.log('--- debug start');
console99.debug();
console99.debug(string);
console.log('--- error start');
console99.error();
console99.error(string);
console.log('--- info start');
console99.info();
console99.info(string);
console.log('--- log start');
console99.log();
console99.log(string);
console.log('--- table start');
console99.table();
console99.table(object);
console.log('--- trace start');
console99.trace();
console99.trace(string);
console.log('--- warn start');
console99.warn();
console99.warn(string);
console.log('--- dir start');
console99.dir();
console99.dir(object);
console.log('--- dirxml start');
console99.dirxml();
console99.dirxml(object);
console.log('--- count start');
console99.count();
console99.count(string);
console99.count(string);
console99.count();
console99.countReset();
console99.count();
console99.countReset(string);
console99.count(string);
console.log('--- group start');
console99.group();
console99.log(string);
console99.group('group');
console99.log(string);
console99.groupEnd();
console99.log(string);
console99.groupCollapsed();
console99.log(string);
console99.groupCollapsed('groupCollapsed');
console99.log(string);
console99.groupEnd();
console99.groupEnd();
console99.groupEnd();
console.log('--- time start');
console99.time();
console99.time('time');
console99.timeLog();
console99.timeLog('time');
console99.timeEnd();
console99.timeEnd('time');
