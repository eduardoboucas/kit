import { test } from 'uvu';
import * as assert from 'uvu/assert';
import { execSync } from 'node:child_process';
import path from 'node:path';

test('$lib/*.server.* is not statically importable from the client', () => {
	assert.throws(
		() =>
			execSync('pnpm build', {
				cwd: path.join(process.cwd(), 'apps/server-only-module'),
				stdio: 'pipe',
				timeout: 15000
			}),
		/.*Error: Cannot import \$lib\/test.server.js into client-side code:.*/gs
	);
});

test('$lib/*.server.* is not dynamically importable from the client', () => {
	assert.throws(
		() =>
			execSync('pnpm build', {
				cwd: path.join(process.cwd(), 'apps/server-only-module-dynamic-import'),
				stdio: 'pipe',
				timeout: 15000
			}),
		/.*Error: Cannot import \$lib\/test.server.js into client-side code:.*/gs
	);
});

test.run();
