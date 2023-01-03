"use strict"
import { AppDataSource } from "../data-source";
import { Writer } from "../entity/Writer";
const { ServiceNotFoundError } = require("moleculer").Errors;

const WriterService = {
    name: "WriterService",
    settings: {
        nameDefault: "WriterService"
    },
    actions: {
        newWriter: {
            params: {
                name: {type: "string"},
                user: {type: "number"},
            },
            async handler(ctx: any): Promise<any> {
                const writerRepository = AppDataSource.getRepository(Writer)

                try {
                    const newWriter = writerRepository.save({
                        "name": ctx.params.name,
                        "user": ctx.params.user,
                    })
                    
                    ctx.meta.$statusCode = 200
                    return newWriter
                } catch (error) {
                    console.log(error)
                    ctx.meta.$statusCode = 404
                }
            }
        },

        allWriter: {
            async handler(ctx: any): Promise<any>{
                const writerRepository = AppDataSource.getRepository(Writer)

                const writers = writerRepository.find({})

                return writers
            }
        },

        getWriter: {
            async handler(ctx: any): Promise<any>{
                const { writer_id } = ctx.params
                const writerRepository = AppDataSource.getRepository(Writer)

                const writer = writerRepository.findBy({ id: Number(writer_id) })
            
                return writer
            }
        },

        updateWriter: {
            params: {
                name: {type: "string"},
                user: {type: "number"},
                book: {type: "number"}
            },
            async handler(ctx: any): Promise<any>{
                const { writer_id } = ctx.params
                const writerRepository = AppDataSource.getRepository(Writer)

                const writer = await writerRepository.findOneBy({id: writer_id})

                if(writer != null){
                    writer.name = ctx.params.name
                    writer.user = ctx.params.user
                    writer.book = ctx.params.book

                    writerRepository.save(writer)
                
                    return writer
                } else {
                    throw new ServiceNotFoundError()
                }
            }
        },

        deleteWriter: {
            async handler(ctx: any): Promise<any>{
                const { writer_id } = ctx.params
                const writerRepository = AppDataSource.getRepository(Writer)

                const writer = await writerRepository.findOneBy({
                    id: writer_id,
                })
                
                if(writer != null){
                    const writer = writerRepository.delete({id: Number(writer_id)})
                    ctx.meta.$statusCode = 202
                } else {
                    throw new ServiceNotFoundError()
                }
            }
        }
    }
}

export default WriterService