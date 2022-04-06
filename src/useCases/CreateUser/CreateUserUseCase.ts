import { User } from "../../entities/User";
import { IUsersRepository } from "../../interfaces/IUsersRepository";
import { IMailProvider } from "../../providers/IMailProvider";
import { ICreateUserRequestDTO } from "./CreateUserDTO";

export class CreateUserUseCase{
    constructor( 
        private usersRepository : IUsersRepository, 
        private mailProvider: IMailProvider, ){

    }

    async execute(data: ICreateUserRequestDTO){
        const UserAlreadyExists = this.usersRepository.findByEmail(data.email)

        if (UserAlreadyExists){
            throw new Error ('User Already Exists.')
        }

        const user = new User(data)
        
        await this.usersRepository.save(user)

        await this.mailProvider.sendMail({
            to: {
                name: data.name,
                email: data.email
            },
            from:{
                name: 'Victor Castro',
                email: 'victorcastro.dev@hotmail.com'
            },
            subject: 'Seja Bem vindo a plataforma',
            body: '<h1> Você já consegue acessar a plataforma através de nosso email! <h1>'
        })
    }
}