import * as migration_20260929_130109_initial_schema from './20260929_130109_initial_schema';
import * as migration_20261002_101558 from './20261002_101558';
import * as migration_20261002_102841 from './20261002_102841';
import * as migration_20261002_104639 from './20261002_104639';
import * as migration_20261002_145005 from './20261002_145005';
import * as migration_20261003_034549 from './20261003_034549';
import * as migration_20261003_035333 from './20261003_035333';
import * as migration_20261003_054528 from './20261003_054528';
import * as migration_20261003_200457 from './20261003_200457';
import * as migration_20261006_092551 from './20261006_092551';
import * as migration_20261010_120000 from './20261010_120000';

export const migrations = [
  {
    up: migration_20260929_130109_initial_schema.up,
    down: migration_20260929_130109_initial_schema.down,
    name: '20260929_130109_initial_schema',
  },
  {
    up: migration_20261002_101558.up,
    down: migration_20261002_101558.down,
    name: '20261002_101558',
  },
  {
    up: migration_20261002_102841.up,
    down: migration_20261002_102841.down,
    name: '20261002_102841',
  },
  {
    up: migration_20261002_104639.up,
    down: migration_20261002_104639.down,
    name: '20261002_104639',
  },
  {
    up: migration_20261002_145005.up,
    down: migration_20261002_145005.down,
    name: '20261002_145005',
  },
  {
    up: migration_20261003_034549.up,
    down: migration_20261003_034549.down,
    name: '20261003_034549',
  },
  {
    up: migration_20261003_035333.up,
    down: migration_20261003_035333.down,
    name: '20261003_035333',
  },
  {
    up: migration_20261003_054528.up,
    down: migration_20261003_054528.down,
    name: '20261003_054528',
  },
  {
    up: migration_20261003_200457.up,
    down: migration_20261003_200457.down,
    name: '20261003_200457',
  },
  {
    up: migration_20261006_092551.up,
    down: migration_20261006_092551.down,
    name: '20261006_092551'
  },
  {
    up: migration_20261010_120000.up,
    down: migration_20261010_120000.down,
    name: '20261010_120000',
  },
];
