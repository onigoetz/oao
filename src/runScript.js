// @flow

import minimatch from 'minimatch';
import multiRun from './utils/multiRun';

type Options = {
  src: string,
  ignoreSrc?: string,
  tree?: boolean,
  parallel?: boolean,
  parallelLogs?: boolean,
  parallelLimit?: number,
  ignoreErrors?: boolean,
  relativeTime?: boolean,
};

const run = (script: string, options: Options) =>
  multiRun(options, specs => {
    const { scripts } = specs;
    if (!scripts) return [];
    const scriptNames = Object.keys(scripts).filter(o => minimatch(o, script));
    if (!scriptNames.length) return [];
    return scriptNames.map(o => `yarn run ${o}`);
  });

export default run;
