export type User = {
    id: string,
    username: string;
    email: string;
    password: string;
    disabled?: boolean;
}