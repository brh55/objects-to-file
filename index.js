'use strict';
const assert = require('assert');
const createWriteStream = require('fs').createWriteStream;

module.exports = (data, outputPath, options) =>
	new Promise((resolve, reject) => {
		assert.ok(typeof data === 'object', 'data is not an array');
		assert.ok(data.length > 0, 'Data is empty');
		assert.ok(outputPath);

		const opts = options || {};

		if (opts.count > data.length) {
			reject(Error('count is greater than available data inputted.'));
		}
		const count = opts.count || data.length - 1;
		const delimiter = opts.delimiter || ',';
		const encoding = opts.encoding || 'utf8';
		const EOL = opts.EOL || '\n';
		let keys = opts.keys || Object.getOwnPropertyNames(data[0]);

		const writer = createWriteStream(outputPath);
		writer.setDefaultEncoding(encoding);

		if (opts.header === true) {
			writer.write(keys.join(delimiter) + EOL);
		}

		for (var i = 0; i < count + 1; i++) {
			if (opts.bar) {
				opts.bar.tick();
			}

			if (opts.raw === true) {
				keys = Object.getOwnPropertyNames(data[i]);
			}

			const chunk = build(data[i], keys, delimiter, EOL);

			if (i === count) {
				writer.end(chunk);
			} else {
				writer.write(chunk);
			}
		}

		writer.on('close', () => {
			resolve(outputPath);
		});
		writer.on('error', reject);
	});

function build(item, keys, delimiter, EOL) {
	let line = '';
	keys.forEach((key, index) => {
		if (item[key]) {
			line += item[key];
		}

		if (index !== keys.length - 1) {
			line += delimiter;
		}
	});
	return line + EOL;
}
