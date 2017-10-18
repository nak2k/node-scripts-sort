const test = require('tape');
const { sortScripts } = require('..');

test('test sortScripts', t => {
  t.plan(1);

  const result = sortScripts({
    open: 'open',

    /*
     * This task is treated as without modifier, because the task `x` not exists.
     */
    prex: 'prex',

    /*
     * This task is treated as one with modifier.
     */
    prey: 'prey',
    y: 'y',

    test: 'test',
    pretest: 'pretest',
    prepare: 'prepare',

    /*
     * This task is treated as without modifier, even if `install` not exists.
     */
    preinstall: 'preinstall',
  });

  const keys = Object.keys(result);
  t.deepEqual(keys, ['preinstall', 'open', 'prepare', 'prex', 'pretest', 'test', 'prey', 'y']);
});
