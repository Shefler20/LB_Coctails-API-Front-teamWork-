interface User {
    _id: string;
    email: string;
    role: string;
    googleID?: string;
    avatar?: string;
    displayName: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}

export interface GlobalError {
  error: string;
}

export interface RegisterMutation {
  email: string;
  password: string;
  avatar: File | null;
  displayName: string;
}

export interface LoginMutation {
  email: string;
  password: string;
}

