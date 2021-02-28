



export interface User {
    username: string,
    password: string
}

export interface UserResponse {
    username: string,
    token: string,
    error: boolean,
    errmsg?: string
}

