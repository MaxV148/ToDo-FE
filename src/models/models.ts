export interface User{
    username: string;
    userid: string;
    token: string;
    expiresat: number;
}
export interface ShareUser{
    Username:string;
    ID:string
}

export interface ToDo{
    id: number,
    title: string,
    content: string,
    done: boolean,
    category: string,
    createdAt: number
    
}

export interface Category{
    ID: number,
    Name: string
}

export interface CreateToDoRequest{
    title: string,
    content: string,
    category: number

}