import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Book } from "./Book";
import { User } from "./User";

@Entity('comments')
export class Comment {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: "text"})
    about: string

    @Column({type: "text"})
    body: string

    @ManyToOne(() => User, (user) => user.comment)
    @JoinColumn({name: "user_id"})
    user: User

    @ManyToOne(() => Book, (book) => book.comments)
    @JoinColumn({name: "book_id"})
    book: Book
}