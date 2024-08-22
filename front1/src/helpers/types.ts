export interface IUser {
    id?: number,
    name: string,
    surname: string,
    login: string,
    password: string,
    picture?: string,
    cover?: string,
    followers?: IUser[],
    following?: IUser[],
    isPrivate?: number,
}

export interface IResponse {
    status: string,
    message?: string,
    user?: IUser,
    payload: unknown,
}

export interface IPost {
    id: number,
    title: string,
    picture: string,
    likes: IUser[],
}

export interface IPassword {
    old: string,
    newpwd: string,
}
export interface ILogin {
    password: string,
    login: string,
}

export interface IContext {
    account: IUser;
    setAccount: (obj: IUser) => void;
}

export interface VisibilityContextType {
    isPrivate: boolean;
    setIsPrivate: (isPrivate: boolean) => void;
}


export type PartialUser = Partial<IUser>;
