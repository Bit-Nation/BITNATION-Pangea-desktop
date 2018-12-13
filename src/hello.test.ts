import * as Hello from "./hello";

const testSuite = 'Hello';
describe(testSuite, () => {
    test('Hello', async () => {return Hello.greeter("World");});
});
