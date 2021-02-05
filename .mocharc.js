process.env.TS_NODE_COMPILER_OPTIONS = '{"module": "commonjs"}'
process.env.TEST_SERVER = 'http://localhost:3000'

module.exports = {
    spec: "test",
    extension: ["test.ts", "test.js"],
    recursive: true,
    require: "ts-node/register"
}