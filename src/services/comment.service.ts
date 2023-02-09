"use strict"
import { Context } from "moleculer";
import { AppDataSource } from "../data-source"
import { Comment } from "../entity/Comment"
const { ServiceNotFoundError } = require("moleculer").Errors;

const CommentService = {
    name: "CommentService",
    settings: {
        defaultName: "CommentService"
    },
    actions: {
        newComment: {
            params: {
                user: {type: "number"},
                book: {type: "number"},
                about: {type: "string"},
                body: {type: "string"},
            },
            async handler(ctx: any): Promise<any>{
                const commentRepository = AppDataSource.getRepository(Comment)
            
                try {
                    const newComment = commentRepository.create({
                        "user": ctx.params.user,
                        "book": ctx.params.book,
                        "about": ctx.params.about,
                        "body": ctx.params.body,
                    })

                    await commentRepository.save(newComment)

                    ctx.meta.$statusCode = 201
                    return newComment
                } catch (error) {
                    console.log(error)
                    ctx.meta.$statusCode = 400 
                }
            }
        },

        allComment: {
            async handler(ctx: any){
                const commentRepository = AppDataSource.getRepository(Comment)

                try {
                    const comments = commentRepository.find({})

                    return comments
    
                } catch (error) {
                    console.log(error)
                    ctx.meta.$statusCode = 204
                }
            }
        },

        getComment: {
            async handler(ctx: any){
                const { comment_id } = ctx.params
                const commentRepository = AppDataSource.getRepository(Comment)

                try {
                    const comment = commentRepository.findBy({id: Number(comment_id)})

                    return comment
    
                } catch (error) {
                    console.log(error)
                    ctx.meta.$statusCode = 404
                }
            }
        },

        updateComment: {
            params: {
                user: {type: "number"},
                book: {type: "number"},
                about: {type: "string"},
                body: {type: "string"},
            },
            async handler(ctx: any): Promise<any>{
                const { comment_id } = ctx.params
                const commentRepository = AppDataSource.getRepository(Comment)
                const comment = await commentRepository.findOneBy({id: comment_id})
                
                try {
                    if(comment != null){
                        comment.user = ctx.params.user
                        comment.book = ctx.params.book
                        comment.body = ctx.params.body
                        comment.about = ctx.params.about
    
                        commentRepository.save(comment)
    
                        return comment
                    } else {
                        throw new ServiceNotFoundError()
                    }    
                } catch (error) {
                    console.log(error)
                    ctx.meta.$statusCode = 304
                }
            }
        },

        deleteComment: {
            async handler(ctx: any): Promise<any>{
                const { comment_id } = ctx.params
                const commentRepository = AppDataSource.getRepository(Comment)

                const comment = await commentRepository.findOneBy({id: comment_id})
                try {
                    if(comment != null){
                        const user = commentRepository.delete({id: Number(comment_id)})
                        ctx.meta.$statusCode = 202
                    } else {
                        throw new ServiceNotFoundError()
                    }    
                } catch (error) {
                    console.log(error)
                    ctx.meta.$statusCode = 400
                }
            }
        }
    }
}

export default CommentService