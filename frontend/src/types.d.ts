interface User {
    _id: string;
    email: string;
    role: string;
    googleID?: string;
    avatar: string;
    displayName: string;
}

interface RegisterMutation {
    email: string;
    password: string;
    avatar: File | null;
    displayName: string;
}