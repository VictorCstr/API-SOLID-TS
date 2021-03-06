import { randomUUID } from 'crypto'

export class User{
    public readonly id: String;
    public name: String
    public email: String
    public password: String

    constructor(props: Omit<User, 'id'>, id?: string){
        Object.assign( this, props)

        if(!id){
            this.id = randomUUID()
        }
    }
}