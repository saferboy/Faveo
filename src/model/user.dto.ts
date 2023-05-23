export interface UserDto {
    email: string,
    password: string,
    name: string,
    surname: string,
    username: string,
    birthday: string,
    phone: string,
}


export interface UserDetail {
    email: string,
    name: string,
    surname: string,
    birthday: string,
    phone: string
}

export interface AccessDetail {
    password: string,
    role: string 
}