import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Book } from "./Book";
import { User } from "./User";

@Entity('writers')
export class Writer {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: "text"})
    name: string

    @ManyToOne(() => User, (user) => user.writer)
    @JoinColumn({name: "user_id"})
    user: User

    @OneToMany(() => Book, (book) => book.writer)
    @JoinColumn({name: "book_id"})
    book: Book
}