"use sctrict"
import { AppDataSource } from "../data-source"
import { User } from "../entity/User"
import { Book } from "../entity/Book"
import { Favorite } from "../entity/Favorite"
import { text } from "stream/consumers"

const FavoriteService = {
    name: "FavoriteService",
    settings: {
        defaultname: "FavoriteService"
    },
    actions: {
        newFavorite: {
            params: {
                user: 'number',
                book: 'number'
            },
            async handler(ctx: any){
                const favoriteRepository = AppDataSource.getRepository(Favorite)

                try{
                    const newFavorite = favoriteRepository.create({
                        "user": ctx.params.user,
                        "book": ctx.params.book
                    })

                    await favoriteRepository.save(newFavorite)
                    
                    const fav = favoriteRepository.find({
                        where:{
                            user: {
                                id: ctx.params.user
                            },
                            book: {
                                id: ctx.params.book
                            }
                        },
                        relations:{
                            user: true,
                            book: true
                        },
                    })

                    return fav

                } catch (error) {
                    console.log(error)
                    ctx.meta.$statuscode = 400
                }
            }
        },

        deleteFavorite: {
            async handler(ctx: any){
                const { user } = ctx.params
                const { book } = ctx.params
                const favoriteRepository = AppDataSource.getRepository(Favorite)

                try {
                    if(!user){
                        ctx.meta.$statusCode = 400
                    }
                    await favoriteRepository.delete({
                        'user': user,
                        'book': book
                    })

                    ctx.meta.$statusode = 204
                } catch (error) {
                    console.log(error)
                    ctx.meta.$statusCode = 400
                }
            }
        }
    }
}

export default FavoriteService