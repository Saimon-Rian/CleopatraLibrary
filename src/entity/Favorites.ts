import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Book } from "./Book";

@Entity('favorites')
export class Favorite {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => User, (user) => user.favorite)
    @JoinColumn({name:'user_id'})
    user: User

    @ManyToOne(() => Book, (book: { favorite: any; }) => book.favorite)
    @JoinColumn({name:'book_id'})
    book: Book
}