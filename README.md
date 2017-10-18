# scripts-sort

Sort `package.scripts`.

## Installation

```
npm i scripts-sort -S
```

## Usage

``` javascript
const { sortScripts } = require('scripts-sort');

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

console.dir(result);

// { preinstall: 'preinstall',
//   open: 'open',
//   prepare: 'prepare',
//   prex: 'prex',
//   pretest: 'pretest',
//   test: 'test',
//   prey: 'prey',
//   y: 'y' }
```

## License

MIT
