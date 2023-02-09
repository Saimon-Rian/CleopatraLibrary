import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Book } from "./Book";
import { Comment } from "./Comment";
import { Favorite } from "./Favorite";
import { Rating } from "./Rating";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'text'})
    name:string

    @Column({type: 'text', unique: true})
    email: string 
    
    @Column({type: 'text', unique: true})
    username: string

    @Column({type: 'text'})
    password: string

    @Column({type: 'integer', nullable: true})
    age: number

    @Column({type: 'text', nullable: true, width: 300})
    about: string

    @OneToMany(() => Comment, (comment) => comment.user)
    @JoinColumn({name: "comment_id"})
    comment: Comment[]

    @OneToMany(() => Rating, (rating) => rating.user)
    @JoinColumn({name: "rating_id"})
    rating: Rating[]

    @OneToMany(() => Book, (book) => book.user)
    @JoinColumn({name: "book_id"})
    book: Book[]

    @OneToMany(() => Favorite, (favorite) => favorite.user)
    @JoinColumn({name: "favorite_id"})
    favorite: Favorite[]
}