import * as path from 'path';
import * as spawn from 'cross-spawn';

const getGitLastUpdatedTimeStamp = (filePath: string): number | undefined => {
  try {
    const timestamp = spawn
      .sync('git', ['log', '-1', '--format=%at', path.basename(filePath)], {
        cwd: path.dirname(filePath)
      })
      // .stdout.toString('utf-8')
      .stdout.toString();

    return parseInt(timestamp) * 1000;
  } catch (e) {
    /* do not handle for now */
    return undefined;
  }
};

export default getGitLastUpdatedTimeStamp;
