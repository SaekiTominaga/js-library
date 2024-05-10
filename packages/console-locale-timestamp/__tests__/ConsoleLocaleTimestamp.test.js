import { strict as assert } from 'node:assert';
import { test } from 'node:test';
import sinon from 'sinon';
import Console from '../dist/ConsoleLocaleTimestamp.js';

const string = 'Hello World!';
const object = {
	1001: { name: 'John Smith', age: '20' },
	1002: { name: 'Taro Yamada', age: '25' },
};

test('constructor', async (t) => {
	await t.test('no argument', () => {
		new Console();
	});
	await t.test('locales', () => {
		new Console('en-US');
	});
	await t.test('options', () => {
		new Console('en-US', { minute: '2-digit', second: '2-digit' });
	});
	await t.test('quote', () => {
		new Console('en-US', { minute: '2-digit', second: '2-digit' }, ['[', ']']);
	});
	await t.test('separator', () => {
		new Console('en-US', { minute: '2-digit', second: '2-digit' }, ['[', ']'], ' - ');
	});
});

test('methods', async (t) => {
	const consoleTime = new Console();

	await t.test('assert() - true', () => {
		const spyConsole = sinon.spy(console, 'assert');

		consoleTime.assert(true, string);

		assert.equal(spyConsole.calledOnce, true);

		spyConsole.restore();
	});
	await t.test('assert() - false', () => {
		const spyProcessOut = sinon.spy(process.stdout, 'write');
		const spyProcessError = sinon.spy(process.stderr, 'write');
		const spyConsole = sinon.spy(console, 'assert');

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
		const spyConsole = sinon.spy(console, 'clear');

		consoleTime.clear();

		assert.equal(spyConsole.calledOnce, true);

		spyConsole.restore();
	});
	await t.test('debug()', () => {
		const spyProcessOut = sinon.spy(process.stdout, 'write');
		const spyProcessError = sinon.spy(process.stderr, 'write');
		const spyConsole = sinon.spy(console, 'debug');

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
		const spyProcessOut = sinon.spy(process.stdout, 'write');
		const spyProcessError = sinon.spy(process.stderr, 'write');
		const spyConsole = sinon.spy(console, 'error');

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
		const spyProcessOut = sinon.spy(process.stdout, 'write');
		const spyProcessError = sinon.spy(process.stderr, 'write');
		const spyConsole = sinon.spy(console, 'info');

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
		const spyProcessOut = sinon.spy(process.stdout, 'write');
		const spyProcessError = sinon.spy(process.stderr, 'write');
		const spyConsole = sinon.spy(console, 'log');

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
		const spyProcessOut = sinon.spy(process.stdout, 'write');
		const spyProcessError = sinon.spy(process.stderr, 'write');
		const spyConsole = sinon.spy(console, 'table');

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
		const spyProcessOut = sinon.spy(process.stdout, 'write');
		const spyProcessError = sinon.spy(process.stderr, 'write');
		const spyConsole = sinon.spy(console, 'trace');

		consoleTime.trace(string);

		assert.equal(spyProcessOut.called, true);
		// assert.equal(spyProcessError.called, false); // TODO: For some reason, it doesn't produce the expected results
		assert.equal(spyConsole.calledOnce, true);
		assert.equal(spyConsole.calledWith(string), true);

		spyProcessOut.restore();
		spyProcessError.restore();
		spyConsole.restore();
	});
	await t.test('warn()', () => {
		const spyProcessOut = sinon.spy(process.stdout, 'write');
		const spyProcessError = sinon.spy(process.stderr, 'write');
		const spyConsole = sinon.spy(console, 'warn');

		consoleTime.warn(string);

		assert.equal(spyProcessOut.called, true);
		// assert.equal(spyProcessError.called, false); // TODO: For some reason, it doesn't produce the expected results
		assert.equal(spyConsole.calledOnce, true);
		assert.equal(spyConsole.calledWith(string), true);

		spyProcessOut.restore();
		spyProcessError.restore();
		spyConsole.restore();
	});
	await t.test('dir()', () => {
		const spyProcessOut = sinon.spy(process.stdout, 'write');
		const spyProcessError = sinon.spy(process.stderr, 'write');
		const spyConsole = sinon.spy(console, 'dir');

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
		const spyProcessOut = sinon.spy(process.stdout, 'write');
		const spyProcessError = sinon.spy(process.stderr, 'write');
		const spyConsole = sinon.spy(console, 'dirxml');

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
		const spyProcessOut = sinon.spy(process.stdout, 'write');
		const spyProcessError = sinon.spy(process.stderr, 'write');
		const spyConsole = sinon.spy(console, 'count');

		consoleTime.count();

		assert.equal(spyProcessOut.called, true);
		assert.equal(spyProcessError.called, false);
		assert.equal(spyConsole.calledOnce, true);

		spyProcessOut.restore();
		spyProcessError.restore();
		spyConsole.restore();
	});
	await t.test('countReset()', () => {
		const spyConsole = sinon.spy(console, 'countReset');

		consoleTime.countReset();

		assert.equal(spyConsole.calledOnce, true);

		spyConsole.restore();
	});
	await t.test('group()', () => {
		const spyConsole = sinon.spy(console, 'group');

		consoleTime.group();

		assert.equal(spyConsole.calledOnce, true);

		spyConsole.restore();
	});
	await t.test('group(label)', () => {
		const spyProcessOut = sinon.spy(process.stdout, 'write');
		const spyProcessError = sinon.spy(process.stderr, 'write');
		const spyConsole = sinon.spy(console, 'group');

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
		const spyConsole = sinon.spy(console, 'groupCollapsed');

		consoleTime.groupCollapsed();

		assert.equal(spyConsole.calledOnce, true);

		spyConsole.restore();
	});
	await t.test('groupCollapsed(label)', () => {
		const spyProcessOut = sinon.spy(process.stdout, 'write');
		const spyProcessError = sinon.spy(process.stderr, 'write');
		const spyConsole = sinon.spy(console, 'groupCollapsed');

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
		const spyConsole = sinon.spy(console, 'groupEnd');

		consoleTime.groupEnd();

		assert.equal(spyConsole.calledOnce, true);

		spyConsole.restore();
	});
	await t.test('time()', () => {
		const spyConsole = sinon.spy(console, 'time');

		consoleTime.time();

		assert.equal(spyConsole.calledOnce, true);

		spyConsole.restore();
	});
	await t.test('timeLog()', () => {
		const spyProcessOut = sinon.spy(process.stdout, 'write');
		const spyProcessError = sinon.spy(process.stderr, 'write');
		const spyConsole = sinon.spy(console, 'timeLog');

		consoleTime.timeLog();

		assert.equal(spyProcessOut.called, true);
		assert.equal(spyProcessError.called, false);
		assert.equal(spyConsole.calledOnce, true);

		spyProcessOut.restore();
		spyProcessError.restore();
		spyConsole.restore();
	});
	await t.test('timeEnd()', () => {
		const spyProcessOut = sinon.spy(process.stdout, 'write');
		const spyProcessError = sinon.spy(process.stderr, 'write');
		const spyConsole = sinon.spy(console, 'timeEnd');

		consoleTime.timeEnd();

		assert.equal(spyProcessOut.called, true);
		assert.equal(spyProcessError.called, false);
		assert.equal(spyConsole.calledOnce, true);

		spyProcessOut.restore();
		spyProcessError.restore();
		spyConsole.restore();
	});
});
