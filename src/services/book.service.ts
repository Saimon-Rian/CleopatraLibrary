"use strict"
import { AppDataSource } from "../data-source";
const { ServiceNotFoundError } = require("moleculer").Errors;
import { Book } from "../entity/Book";

const BookService = {
    name: "BookService",
    settings: {
        defaultName: "BookService"
    },
    actions: {
        newBook: {
            params: {
                user: {type: "number"},
                comments: {type: "number"},
                writer:{type: "string"},
                category:{type: "string"} ,
                title: {type: "string"},
                summary: {type: "string"},
                first_paragraph: {type: "string"},    
                body: {type: "string"},
                src: {type: "string"}
            },
            async handler(ctx: any): Promise<any>{
                const bookRepository = AppDataSource.getRepository(Book)                
                try {
                    const newBook = bookRepository.create({
                        "user": ctx.params.user,
                        "comments": ctx.params.comments,
                        "writer": ctx.params.writer,
                        "category": ctx.params.category,
                        "title": ctx.params.title,
                        "summary": ctx.params.summary,
                        "first_paragraph": ctx.params.first_paragraph,
                        "body": ctx.params.body,
                        "src": ctx.params.src
                    })
    
                    await bookRepository.save(newBook)
                    ctx.meta.$statusCode = 201

                    return newBook
                } catch (error) {
                    console.log(error)
                    ctx.meta.$statusCode = 400 
                }
            }
        },

        allBook: {
            auth: "required",
            
            async handler(ctx: any){
                const bookRepository = AppDataSource.getRepository(Book)

                try {
                    const books = bookRepository.find({})

                    return books
                } catch (error) {
                    console.log(error)
                    ctx.meta.$statusCode = 204
                }
            }
        },

        getBook: {
            async handler(ctx: any){
                const { book_id } = ctx.params
                const bookRepository = AppDataSource.getRepository(Book)

                try {
                    const book = bookRepository.findBy({id: Number(book_id)})

                    return book    
                } catch (error) {
                    console.log(error)
                    ctx.meta.$statusCode = 204
                }
            }
        },

        updateBook:{
            params: {
                writer:{type: "string"},
                category:{type: "string"} ,
                title: {type: "string", max: 50},
                summary: {type: "string"},
                first_paragraph: {type: "string"},    
                body: {type: "string"},
                src: {type: "string"},
            },
            async handler(ctx: any): Promise<any>{
                const { book_id } = ctx.params
                const bookRepository = AppDataSource.getRepository(Book)
                const book = await bookRepository.findOneBy({id: book_id})
                
                try {
                    if(book != null){
                        book.user = ctx.params.user,
                        book.writer = ctx.params.writer,
                        book.category = ctx.params.category,
                        book.title = ctx.params.title,
                        book.summary = ctx.params.summary,
                        book.first_paragraph = ctx.params.first_paragraph,
                        book.body = ctx.params.body,
                        book.src = ctx.params.src
    
                        bookRepository.save(book)
    
                        return book
                    } else {
                        throw new ServiceNotFoundError()
                    }    
                } catch (error) {
                    console.log(error)
                    ctx.meta.$statusCode = 304
                }
            }
        },

        deleteBook: {
            async handler(ctx: any): Promise<any>{
                const { book_id } = ctx.params
                const bookRepository = AppDataSource.getRepository(Book)

                const book = await bookRepository.findOneBy({id: book_id})
                try {
                    if(book != null){
                        const user = bookRepository.delete({id: Number(book_id)})
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

export default BookService