
const STANDARD_TASKS = {
  prepublish: {
    name: 'prepublish',
    task: 'publish',
    modifier: 0,
  },
  prepare: {
    name: 'prepare',
    task: 'prepare',
    modifier: 1,
  },
  prepublishOnly: {
    name: 'prepublishOnly',
    task: 'publish',
    modifier: 0,
  },
  prepack: {
    name: 'prepack',
    task: 'pack',
    modifier: 0,
  },
  postpack: {
    name: 'postpack',
    task: 'pack',
    modifier: 2,
  },
  publish: {
    name: 'publish',
    task: 'publish',
    modifier: 1,
  },
  postpublish: {
    name: 'postpublish',
    task: 'publish',
    modifier: 2,
  },
  preinstall: {
    name: 'preinstall',
    task: 'install',
    modifier: 0,
  },
  install: {
    name: 'install',
    task: 'install',
    modifier: 1,
  },
  postinstall: {
    name: 'postinstall',
    task: 'install',
    modifier: 2,
  },
  preuninstall: {
    name: 'preuninstall',
    task: 'uninstall',
    modifier: 0,
  },
  uninstall: {
    name: 'uninstall',
    task: 'uninstall',
    modifier: 1,
  },
  postuninstall: {
    name: 'postuninstall',
    task: 'uninstall',
    modifier: 2,
  },
  preversion: {
    name: 'preversion',
    task: 'version',
    modifier: 0,
  },
  version: {
    name: 'version',
    task: 'version',
    modifier: 1,
  },
  postversion: {
    name: 'postversion',
    task: 'version',
    modifier: 2,
  },
  pretest: {
    name: 'pretest',
    task: 'test',
    modifier: 0,
  },
  test: {
    name: 'test',
    task: 'test',
    modifier: 1,
  },
  posttest: {
    name: 'posttest',
    task: 'test',
    modifier: 2,
  },
  prestop: {
    name: 'prestop',
    task: 'stop',
    modifier: 0,
  },
  stop: {
    name: 'stop',
    task: 'stop',
    modifier: 1,
  },
  poststop: {
    name: 'poststop',
    task: 'stop',
    modifier: 2,
  },
  prestart: {
    name: 'prestart',
    task: 'start',
    modifier: 0,
  },
  start: {
    name: 'start',
    task: 'start',
    modifier: 1,
  },
  poststart: {
    name: 'poststart',
    task: 'start',
    modifier: 2,
  },
  prerestart: {
    name: 'prerestart',
    task: 'restart',
    modifier: 0,
  },
  restart: {
    name: 'restart',
    task: 'restart',
    modifier: 1,
  },
  postrestart: {
    name: 'postrestart',
    task: 'restart',
    modifier: 2,
  },
  preshrinkwrap: {
    name: 'preshrinkwrap',
    task: 'shrinkwrap',
    modifier: 0,
  },
  shrinkwrap: {
    name: 'shrinkwrap',
    task: 'shrinkwrap',
    modifier: 1,
  },
  postshrinkwrap: {
    name: 'postshrinkwrap',
    task: 'shrinkwrap',
    modifier: 2,
  },
};

function sortScripts(scripts) {
  const keys = Object.keys(scripts);
  const sortedKeys = keys
    .map(key => {
      let data = STANDARD_TASKS[key];

      if (data) {
        return data;
      }

      /*
       * Split a name of the script into the task and the modifier.
       */
      if (key.startsWith('pre')) {
        data = {
          name: key,
          task: key.substr(3),
          modifier: 0,
        };
      } else if (key.startsWith('post')) {
        data = {
          name: key,
          task: key.substr(4),
          modifier: 2,
        };
      } else {
        data = {
          name: key,
          task: key,
          modifier: 1,
        };
      }

      /*
       * Check an existance of a task without modifier corresponding
       * to the non-standard task.
       */
      if (!keys.includes(data.task)) {
        return {
          name: key,
          task: key,
          modifier: 1,
        }
      }

      return data;
    })
    .sort((lhs, rhs) => {
      if (lhs.task < rhs.task) {
        return -1;
      } else if (lhs.task > rhs.task) {
        return 1;
      } else {
        return lhs.modifier - rhs.modifier;
      }
    })
    .map(({ name }) => name);

  const result = Object.create(null);

  sortedKeys.forEach(key => result[key] = scripts[key]);

  return result;
}

/*
 * Exports.
 */
exports.sortScripts = sortScripts;
