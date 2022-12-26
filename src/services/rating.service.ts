"use strict"
import { AppDataSource } from "../data-source"
import { Rating } from "../entity/Rating"
const { ServiceNotFoundError } = require("moleculer").Errors;

const RatingService = {
    name: "RatingService",
    settings: {
        defaultName: "RatingService"
    },
    actions: {
        newRating: {
            params: {
                rating: {type: "number"},
                user: {type: "number"},
                book: {type: "number"}
            },
            async handler(ctx: any): Promise<any>{
                const ratingRepository = AppDataSource.getRepository(Rating)

                try {
                    const newRating = {
                        "rating": ctx.params.rating,
                        "user": ctx.params.user,
                        "book": ctx.params.book
                    }

                    await ratingRepository.save(newRating)

                    ctx.meta.$statusCode = 201
                    return newRating
                } catch (error) {
                    console.log(error)
                    ctx.meta.$statusCode = 400 
                }
            }
        },

        allRating: {
            async handler(ctx: any): Promise<any>{
                const ratingRepository = AppDataSource.getRepository(Rating)

                const ratings = ratingRepository.find({})

                return ratings
            }
        },

        getRating: {
            async handler(ctx: any): Promise<any>{
                const ratingRepository = AppDataSource.getRepository(Rating)
                const { rating_id } = ctx.params

                const rating = await ratingRepository.findBy({id: rating_id})
                
                return rating
            }
        },

        updateRating: {
            params: {
                rating: {type: "number"},
                user: {type: "number"},
                book: {type: "number"}
            },
            async handler(ctx: any): Promise<any>{
                const { rating_id } = ctx.params
                const ratingRepository = AppDataSource.getRepository(Rating)
                const rating = await ratingRepository.findOneBy({id: rating_id})
             
                if(rating != null){
                    rating.user = ctx.params.user
                    rating.book = ctx.params.book
                    rating.rating = ctx.params.rating

                    ratingRepository.save(rating)

                    return rating
                } else {
                    throw new ServiceNotFoundError()
                }
            }
        },
        deleteRating: {
            async handler(ctx: any): Promise<any>{
                const { rating_id } = ctx.params
                const ratingRepository = AppDataSource.getRepository(Rating)

                const rating = await ratingRepository.findOneBy({id: rating_id})
                
                if(rating != null){
                    const user = ratingRepository.delete({id: Number(rating_id)})
                    ctx.meta.$statusCode = 202
                } else {
                    throw new ServiceNotFoundError()
                }
            }
        },
    },
}

export default RatingService