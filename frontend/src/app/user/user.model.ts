export interface User{
 "refresh": string,
 "access": string
}


export interface UserDetails {
    exp: number,
    iat: number,
    jti: string,
    token_type: string,
    user_id: number
}

