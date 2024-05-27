import { getDB } from "../../config/mongodb.js";
import applicationError from "../../error-handler/applicationError.js";

export default class UserModel{
    constructor(name,email,password,type){
        this.name = name;
        this.email = email;
        this.password = password;
        this.type = type;
    }

    static getAll(){
        return users;
    }
}

const users = [
    {
        id: 1,
        name: 'user',
        email: 'user@email.com',
        password: 'abcd',
        type: 'seller',
    },
    {
        id: 2,
        name: 'customer',
        email: 'customer@email.com',
        password: 'abcd',
        type: 'customer',
    }
]

/* 
{
    "email": "cutomer@gmail.com",
    "password": "abcd" 
}    
*/
 