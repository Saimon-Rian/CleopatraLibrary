"use strict"
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
const { ServiceNotFoundError } = require("moleculer").Errors;

const UserService = {
    name: "UserService",
    settings: {
        defaultName: "UserService"
    },

    actions: {
        newUser: {
            params: {
                name: "string",
                email: {type: "email"},
                username: "string",
                age: "number",
                about: {type: "string", nullable: true}
            },
            async handler(ctx: any): Promise<any> {
                const UserRepository = AppDataSource.getRepository(User)
                
                try {
                    const newUser = UserRepository.create({
                        "name": ctx.params.name,
                        "email": ctx.params.email,
                        "username": ctx.params.username,
                        "age": ctx.params.age,
                        "about": ctx.params.about
                    })
                    
                    await UserRepository.save(newUser)
    
                    return newUser
                } catch (error) {
                    console.log(error)
                    ctx.params.$statusCode = 404
                }
            }
        },

        allUser: {
            async handler(ctx: any): Promise<any>{
                const UserRepository = AppDataSource.getRepository(User)

                // add possibilidade de filtro, /user/?name=Saimon
                const users = UserRepository.find({})

                return users
            }
        },

        getUser: {
           async handler(ctx: any): Promise<any> {
                const { user_id } = ctx.params
                const UserRepository = AppDataSource.getRepository(User)

                const user = UserRepository.findBy({id: Number(user_id)})

                return user
           }
        },

        updateUser: {
            params: {
                name: "string",
                email:{type: "email",},
                username: "string",
                age: "number",
                about: "string"
            },
            async handler(ctx: any): Promise<any>{
                const { user_id } = ctx.params
                const userRepository = AppDataSource.getRepository(User)

                const user = await userRepository.findOneBy({
                    id: user_id,
                })
                
                if(user != null){
                    user.name = ctx.params.name
                    user.email = ctx.params.email
                    user.username = ctx.params.username
                    user.age = ctx.params.age
                    user.about = ctx.params.about

                    userRepository.save(user)
                
                    return user    
                } else {
                    throw new ServiceNotFoundError()
                }
            }
        },

        deleteUser: {
            async handler(ctx: any): Promise<any>{
                const { user_id } = ctx.params
                const userRepository = AppDataSource.getRepository(User)

                const user = await userRepository.findOneBy({
                    id: user_id,
                })
                
                if(user != null){
                    const user = userRepository.delete({id: Number(user_id)})
                    ctx.meta.$statusCode = 202
                } else {
                    throw new ServiceNotFoundError()
                }
            }
        }
    }
}

export default UserService