export default class User {
    id: string;
    name: string;
    email: string;
    href: string;
    constructor(id: string, name: string, email: string, href: string) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.href = href;
    }
}