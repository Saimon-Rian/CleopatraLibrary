"use strict"
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
const { ServiceNotFoundError } = require("moleculer").Errors;
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

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
                password: "string",
            },
            async handler(ctx: any): Promise<any> {
                const UserRepository = AppDataSource.getRepository(User)
                const password = await bcrypt.hash(ctx.params.password, 10)

                try {
                    const newUser = UserRepository.create({
                        "name": ctx.params.name,
                        "email": ctx.params.email,
                        "password": password,
                        "username": ctx.params.username,
                    })
                    
                    await UserRepository.save(newUser)
    
                    return newUser
                } catch (error) {
                    console.log(error)
                    ctx.meta.$statusCode = 404
                }
            }
        },

        allUser: {
            async handler(ctx: any): Promise<any>{
                const UserRepository = AppDataSource.getRepository(User)

                try {
                    const users = UserRepository.find({})

                    return users     
                } catch (error) {
                    console.log(error)
                    ctx.meta.$statusCode = 204
                }
            }
        },

        getUser: {
           async handler(ctx: any): Promise<any> {
                const { user_id } = ctx.params
                const UserRepository = AppDataSource.getRepository(User)

                try {
                    const user = UserRepository.findBy({id: Number(user_id)})

                    return user    
                } catch (error) {
                    console.log(error)
                    ctx.meta.$statusCode = 404
                }
           }
        },

        updateUser: {
            params: {
                name: "string",
                email:{type: "email",},
                username: "string",
            },
            async handler(ctx: any): Promise<any>{
                const { user_id } = ctx.params
                const userRepository = AppDataSource.getRepository(User)

                const user = await userRepository.findOneBy({
                    id: user_id,
                })
                
                try {
                    if(user != null){
                        user.name = ctx.params.name
                        user.email = ctx.params.email
                        user.username = ctx.params.username
    
                        userRepository.save(user)
                    
                        return user    
                    } else {
                        throw new ServiceNotFoundError()
                    }    
                } catch (error) {
                    console.log(error)
                    ctx.meta.$statusCode = 304
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
                
                try {
                    if(user != null){
                        const user = userRepository.delete({id: Number(user_id)})
                        ctx.meta.$statusCode = 202
                    } else {
                        throw new ServiceNotFoundError()
                    }    
                } catch (error) {
                    console.log(error)
                    ctx.meta.$statusCode = 400 
                }
            }
        },

        userLogin: {
            params: {
                username: "string",
                password: "string"
            },
            async handler(ctx: any): Promise<any>{
                const {username, password} = ctx.params
                const userRepository = AppDataSource.getRepository(User)
                const user: any = await userRepository.findOneBy({ username })

                if (!user){
                    ctx.meta.$statusCode = 400
                }

                const verifyPass = await bcrypt.compare(password, user.password)

                if (!verifyPass) {
                    ctx.meta.$statusCode = 400
                }

                const token = jwt.sign({id: user.id}, "secret", {expiresIn: '48h'})

                const {password:_, ...userLogin} = user

                return {
                    user: userLogin,
                    token: token
                }
            }
        },
    }
}

export default UserService