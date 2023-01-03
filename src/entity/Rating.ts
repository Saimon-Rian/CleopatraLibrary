import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Book } from "./Book";
import { User } from "./User";

@Entity('ratings')
export class Rating {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: "integer"})
    rating: number

    @ManyToOne(() => User, (user) => user.rating)
    @JoinColumn({name: "user_id"})
    user: User

    @ManyToOne(() => Rating, (rating) => rating.book)
    @JoinColumn({name: "book_id"})
    book: Book
}