const { exec } = require("child_process");

exports.mochaHooks = {
  afterAll(done) {
    console.log("afterAll");
    this.timeout(10000);
    exec(
      'cross-env TS_NODE_COMPILER_OPTIONS={\\"module\\":\\"ESNext\\"} tsc util/article.ts util/color.ts',
      () => {
        done();
      }
    );
  },
};
