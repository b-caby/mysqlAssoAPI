class UserPayload {

    constructor(id: number, login: string, role: string) {
        this.id = id;
        this.login = login;
        this.role = role;
    }

    public readonly id: number;
    public readonly login: string;
    public readonly role: string;
}

export default UserPayload;