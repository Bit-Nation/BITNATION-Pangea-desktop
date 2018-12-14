import * as Hello from "./hello";

const testSuite = 'Hello';
describe(testSuite, () => {
	test('Hello', async () => Hello.greeter("World"));
});
