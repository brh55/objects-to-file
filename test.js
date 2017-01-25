import fs from 'fs';
import path from 'path';
import test from 'ava';
import ProgressBar from 'progress';
import objectsToFile from './index';

fs.mkdirSync('./output');

const data = [
	{
		name: 'Henry',
		age: 24,
		occupation: 'Developer'
	},
	{
		name: 'David',
		age: 25,
		occupation: 'Chef'
	},
	{
		name: 'Sarah',
		age: 22,
		occupation: 'Designer',
		height: '63'
	},
];

test('File creation ', async t => {
	t.plan(2);
	const filePath = await objectsToFile(data, './output/test.csv');
	t.is(filePath, './output/test.csv');
	t.notThrows(() => fs.accessSync(filePath), 'Checks for file existent');
});

test('Error for no data', async t => {
	const error = await t.throws(objectsToFile('./output/test.csv'));
	t.is(error.message, 'data is not an array');
});

test('Error for no path', async t => {
	const error = await t.throws(objectsToFile('./output/test.csv'));
	t.is(error.message, 'data is not an array');
});

test('Error for count greater than data available', async t => {
	const error = await t.throws(objectsToFile(data, './output/test.csv', { count: 4 }));
	t.is(error.message, 'count is greater than available data inputted.');;
});

test('Test for options', async t => {
	const opts = {
		header: true,
		EOL: '\\t',
		keys: ['age', 'occupation'],
		delimiter: ' | '
	};

	const filePath = await objectsToFile(data, path.join(__dirname, '/output/', 'test-opts.txt'), opts);
	const contents = fs.readFileSync(filePath);

	t.true(contents.indexOf('occupation') > 0, 'Contains occupation');
	t.false(contents.indexOf('name') > 0, 'Only contains age and occupation');

	t.false(contents.indexOf('name') === 0, 'Does not include the name key in the header');

	t.true(contents.indexOf('|') > 0, 'Replaces the default delimiter');
	t.false(contents.indexOf(',') === 0, 'Does not contain the default delimiter');
});

test('Test progress bar tick', t => {
	let bar = new ProgressBar('Writing data [:bar] :percent :etas', {
		complete: '|',
		incomplete: '.',
		width: 35,
		total: data.length
	});

	t.is(bar.curr, 0, 'Progress bar is at a 0 start')

	const opts = { bar };
	objectsToFile(data, './output/test-bar.txt', opts)
	.then(() => {
		t.is(bar.curr, 3, 'Progress bar ticked three times');
	});
});

test('Test for raw output', async  t => {
	const opts = {
		raw: true
	};

	const filePath = await objectsToFile(data, './output/test-raw.txt', opts);
	const contents = fs.readFileSync(filePath);

	t.true(contents.indexOf('63') > 0, 'Should contain the raw object contents');
});
