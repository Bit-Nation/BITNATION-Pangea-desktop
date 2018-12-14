export function greeter(person : string) {
    return "Hello, " + person;
}

const user = "World";
document.body.innerHTML = greeter(user);
