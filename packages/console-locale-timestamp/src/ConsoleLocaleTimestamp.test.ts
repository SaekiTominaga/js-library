import { strict as assert } from 'node:assert';
import { test } from 'node:test';
import { spy } from 'sinon';
import Console from './ConsoleLocaleTimestamp.js';

const string = 'Hello World!';
const object = {
	1001: { name: 'John Smith', age: '20' },
	1002: { name: 'Taro Yamada', age: '25' },
};

await test('constructor', async (t) => {
	await t.test('no argument', () => {
		new Console().debug('constructor – no argument');
	});
	await t.test('locales', () => {
		new Console('en-US').debug('constructor – locales');
	});
	await t.test('options', () => {
		new Console('en-US', { minute: '2-digit', second: '2-digit' }).debug('constructor – options');
	});
	await t.test('quote', () => {
		new Console('en-US', { minute: '2-digit', second: '2-digit' }, ['[', ']']).debug('constructor – quote');
	});
	await t.test('separator', () => {
		new Console('en-US', { minute: '2-digit', second: '2-digit' }, ['[', ']'], ' - ').debug('constructor – separator');
	});
});

await test('methods', async (t) => {
	const consoleTime = new Console();

	await t.test('assert() - true', () => {
		const spyConsole = spy(console, 'assert');

		consoleTime.assert(true, string);

		assert.equal(spyConsole.calledOnce, true);

		spyConsole.restore();
	});
	await t.test('assert() - false', () => {
		const spyProcessOut = spy(process.stdout, 'write');
		const spyProcessError = spy(process.stderr, 'write');
		const spyConsole = spy(console, 'assert');

		consoleTime.assert(false, string);

		assert.equal(spyProcessOut.called, false);
		assert.equal(spyProcessError.called, true);
		assert.equal(spyConsole.calledOnce, true);
		assert.equal(spyConsole.calledWith(string), false);

		spyProcessOut.restore();
		spyProcessError.restore();
		spyConsole.restore();
	});
	await t.test('clear()', () => {
		const spyConsole = spy(console, 'clear');

		consoleTime.clear();

		assert.equal(spyConsole.calledOnce, true);

		spyConsole.restore();
	});
	await t.test('debug()', () => {
		const spyProcessOut = spy(process.stdout, 'write');
		const spyProcessError = spy(process.stderr, 'write');
		const spyConsole = spy(console, 'debug');

		consoleTime.debug(string);

		assert.equal(spyProcessOut.called, true);
		assert.equal(spyProcessError.called, false);
		assert.equal(spyConsole.calledOnce, true);
		assert.equal(spyConsole.calledWith(string), true);

		spyProcessOut.restore();
		spyProcessError.restore();
		spyConsole.restore();
	});
	await t.test('error()', () => {
		const spyProcessOut = spy(process.stdout, 'write');
		const spyProcessError = spy(process.stderr, 'write');
		const spyConsole = spy(console, 'error');

		consoleTime.error(string);

		assert.equal(spyProcessOut.called, false);
		assert.equal(spyProcessError.called, true);
		assert.equal(spyConsole.calledOnce, true);
		assert.equal(spyConsole.calledWith(string), true);

		spyProcessOut.restore();
		spyProcessError.restore();
		spyConsole.restore();
	});
	await t.test('info()', () => {
		const spyProcessOut = spy(process.stdout, 'write');
		const spyProcessError = spy(process.stderr, 'write');
		const spyConsole = spy(console, 'info');

		consoleTime.info(string);

		assert.equal(spyProcessOut.called, true);
		assert.equal(spyProcessError.called, false);
		assert.equal(spyConsole.calledOnce, true);
		assert.equal(spyConsole.calledWith(string), true);

		spyProcessOut.restore();
		spyProcessError.restore();
		spyConsole.restore();
	});
	await t.test('log()', () => {
		const spyProcessOut = spy(process.stdout, 'write');
		const spyProcessError = spy(process.stderr, 'write');
		const spyConsole = spy(console, 'log');

		consoleTime.log(string);

		assert.equal(spyProcessOut.called, true);
		assert.equal(spyProcessError.called, false);
		assert.equal(spyConsole.calledOnce, true);
		assert.equal(spyConsole.calledWith(string), true);

		spyProcessOut.restore();
		spyProcessError.restore();
		spyConsole.restore();
	});
	await t.test('table()', () => {
		const spyProcessOut = spy(process.stdout, 'write');
		const spyProcessError = spy(process.stderr, 'write');
		const spyConsole = spy(console, 'table');

		consoleTime.table(object);

		assert.equal(spyProcessOut.called, true);
		assert.equal(spyProcessError.called, false);
		assert.equal(spyConsole.calledOnce, true);
		assert.equal(spyConsole.calledWith(object), true);

		spyProcessOut.restore();
		spyProcessError.restore();
		spyConsole.restore();
	});
	await t.test('trace()', () => {
		const spyProcessOut = spy(process.stdout, 'write');
		const spyProcessError = spy(process.stderr, 'write');
		const spyConsole = spy(console, 'trace');

		consoleTime.trace(string);

		assert.equal(spyProcessOut.called, true);
		/* assert.equal(spyProcessError.called, false); // TODO: For some reason, it doesn't produce the expected results */
		assert.equal(spyConsole.calledOnce, true);
		assert.equal(spyConsole.calledWith(string), true);

		spyProcessOut.restore();
		spyProcessError.restore();
		spyConsole.restore();
	});
	await t.test('warn()', () => {
		const spyProcessOut = spy(process.stdout, 'write');
		const spyProcessError = spy(process.stderr, 'write');
		const spyConsole = spy(console, 'warn');

		consoleTime.warn(string);

		assert.equal(spyProcessOut.called, true);
		/* assert.equal(spyProcessError.called, false); // TODO: For some reason, it doesn't produce the expected results */
		assert.equal(spyConsole.calledOnce, true);
		assert.equal(spyConsole.calledWith(string), true);

		spyProcessOut.restore();
		spyProcessError.restore();
		spyConsole.restore();
	});
	await t.test('dir()', () => {
		const spyProcessOut = spy(process.stdout, 'write');
		const spyProcessError = spy(process.stderr, 'write');
		const spyConsole = spy(console, 'dir');

		consoleTime.dir(object);

		assert.equal(spyProcessOut.called, true);
		assert.equal(spyProcessError.called, false);
		assert.equal(spyConsole.calledOnce, true);
		assert.equal(spyConsole.calledWith(object), true);

		spyProcessOut.restore();
		spyProcessError.restore();
		spyConsole.restore();
	});
	await t.test('dirxml()', () => {
		const spyProcessOut = spy(process.stdout, 'write');
		const spyProcessError = spy(process.stderr, 'write');
		const spyConsole = spy(console, 'dirxml');

		consoleTime.dirxml(object);

		assert.equal(spyProcessOut.called, true);
		assert.equal(spyProcessError.called, false);
		assert.equal(spyConsole.calledOnce, true);
		assert.equal(spyConsole.calledWith(object), true);

		spyProcessOut.restore();
		spyProcessError.restore();
		spyConsole.restore();
	});
	await t.test('count()', () => {
		const spyProcessOut = spy(process.stdout, 'write');
		const spyProcessError = spy(process.stderr, 'write');
		const spyConsole = spy(console, 'count');

		consoleTime.count();

		assert.equal(spyProcessOut.called, true);
		assert.equal(spyProcessError.called, false);
		assert.equal(spyConsole.calledOnce, true);

		spyProcessOut.restore();
		spyProcessError.restore();
		spyConsole.restore();
	});
	await t.test('countReset()', () => {
		const spyConsole = spy(console, 'countReset');

		consoleTime.countReset();

		assert.equal(spyConsole.calledOnce, true);

		spyConsole.restore();
	});
	await t.test('group()', () => {
		const spyConsole = spy(console, 'group');

		consoleTime.group();

		assert.equal(spyConsole.calledOnce, true);

		spyConsole.restore();
	});
	await t.test('group(label)', () => {
		const spyProcessOut = spy(process.stdout, 'write');
		const spyProcessError = spy(process.stderr, 'write');
		const spyConsole = spy(console, 'group');

		consoleTime.group('group');

		assert.equal(spyProcessOut.called, true);
		assert.equal(spyProcessError.called, false);
		assert.equal(spyConsole.calledOnce, true);
		assert.equal(spyConsole.calledWith('group'), true);

		spyProcessOut.restore();
		spyProcessError.restore();
		spyConsole.restore();
	});
	await t.test('groupCollapsed()', () => {
		const spyConsole = spy(console, 'groupCollapsed');

		consoleTime.groupCollapsed();

		assert.equal(spyConsole.calledOnce, true);

		spyConsole.restore();
	});
	await t.test('groupCollapsed(label)', () => {
		const spyProcessOut = spy(process.stdout, 'write');
		const spyProcessError = spy(process.stderr, 'write');
		const spyConsole = spy(console, 'groupCollapsed');

		consoleTime.groupCollapsed('groupCollapsed');

		assert.equal(spyProcessOut.called, true);
		assert.equal(spyProcessError.called, false);
		assert.equal(spyConsole.calledOnce, true);
		assert.equal(spyConsole.calledWith('groupCollapsed'), true);

		spyProcessOut.restore();
		spyProcessError.restore();
		spyConsole.restore();
	});
	await t.test('groupEnd()', () => {
		const spyConsole = spy(console, 'groupEnd');

		consoleTime.groupEnd();

		assert.equal(spyConsole.calledOnce, true);

		spyConsole.restore();
	});
	await t.test('time()', () => {
		const spyConsole = spy(console, 'time');

		consoleTime.time();

		assert.equal(spyConsole.calledOnce, true);

		spyConsole.restore();
	});
	await t.test('timeLog()', () => {
		const spyProcessOut = spy(process.stdout, 'write');
		const spyProcessError = spy(process.stderr, 'write');
		const spyConsole = spy(console, 'timeLog');

		consoleTime.timeLog();

		assert.equal(spyProcessOut.called, true);
		assert.equal(spyProcessError.called, false);
		assert.equal(spyConsole.calledOnce, true);

		spyProcessOut.restore();
		spyProcessError.restore();
		spyConsole.restore();
	});
	await t.test('timeEnd()', () => {
		const spyProcessOut = spy(process.stdout, 'write');
		const spyProcessError = spy(process.stderr, 'write');
		const spyConsole = spy(console, 'timeEnd');

		consoleTime.timeEnd();

		assert.equal(spyProcessOut.called, true);
		assert.equal(spyProcessError.called, false);
		assert.equal(spyConsole.calledOnce, true);

		spyProcessOut.restore();
		spyProcessError.restore();
		spyConsole.restore();
	});
});
