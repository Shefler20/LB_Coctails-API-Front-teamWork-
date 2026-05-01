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

export interface IIngredient {
  title: string;
  quantity: string;
}

export interface IRating {
  user: {
    _id: string;
    displayName: string;
    email: string;
    role: string;
  };
  rating: number;
}

export interface ICocktail {
  _id: string;
  user: string;
  title: string;
  image: string;
  receipt: string;
  isPublished: boolean;
  ingredients: IIngredient[];
  ratings: IRating[];
}

export interface ICocktailDetailInfo {
  _id: string;
  user: string;
  title: string;
  image: string;
  receipt: string;
  isPublished: boolean;
  ingredients: IIngredient[];
  ratings: IRating[];
  averageRating: number;
  ratingQuantity: number;
}

export interface ICocktailMutation {
  title: string;
  image: File | null;
  receipt: string;
  ingredients: IIngredient[];
}

export interface ICocktailWithoutIngredients {
  title: string;
  image: File | null;
  receipt: string;
}

