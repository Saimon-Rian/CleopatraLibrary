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
                writer:{type: "string", min: 12},
                category:{type: "string", max: 150} ,
                title: {type: "string", max: 50},
                summary: {type: "string", max: 250},
                first_paragraph: {type: "string", min: 100, max: 300},    
                body: {type: "string"},
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
            async handler(){
                const bookRepository = AppDataSource.getRepository(Book)

                const books = bookRepository.find({})

                return books
            }
        },

        getBook: {
            async handler(ctx: any){
                const { book_id } = ctx.params
                const bookRepository = AppDataSource.getRepository(Book)

                const book = bookRepository.findBy({id: Number(book_id)})

                return book
            }
        },

        updateBook:{
            params: {
                user: {type: "number"},
                writer:{type: "string", min: 12},
                category:{type: "string", max: 150} ,
                title: {type: "string", max: 50},
                summary: {type: "string", max: 250},
                first_paragraph: {type: "string", min: 100, max: 300},    
                body: {type: "string"},
            },
            async handler(ctx: any): Promise<any>{
                const { book_id } = ctx.params
                const bookRepository = AppDataSource.getRepository(Book)
                const book = await bookRepository.findOneBy({id: book_id})
                
                if(book != null){
                    book.user = ctx.params.user,
                    book.writer = ctx.params.writer,
                    book.category = ctx.params.category,
                    book.title = ctx.params.title,
                    book.summary = ctx.params.summary,
                    book.first_paragraph = ctx.params.first_paragraph,
                    book.body = ctx.params.body

                    bookRepository.save(book)

                    return book
                } else {
                    throw new ServiceNotFoundError()
                }
            }
        },

        deleteBook: {
            async handler(ctx: any): Promise<any>{
                const { book_id } = ctx.params
                const bookRepository = AppDataSource.getRepository(Book)

                const book = await bookRepository.findOneBy({id: book_id})
                
                if(book != null){
                    const user = bookRepository.delete({id: Number(book_id)})
                    ctx.meta.$statusCode = 202
                } else {
                    throw new ServiceNotFoundError()
                }
            }
        }
    }
}

export default BookService