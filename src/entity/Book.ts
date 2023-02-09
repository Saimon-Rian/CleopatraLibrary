import { Column, Entity, JoinColumn, JoinTable, OneToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Comment } from "./Comment";
import { Favorite } from "./Favorite";
import { User } from "./User";

@Entity('books')
export class Book {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'text'})
    writer: string

    @Column({type: 'text'})
    category: string 
    
    @Column({type: 'text', width: 150})
    title: string

    @Column({type: 'text'})
    summary: string

    @Column({type: 'text', width: 320})
    first_paragraph: string

    @Column({type: 'text'})
    body: string

    @ManyToOne(() => User, (user) => user.book)
    @JoinColumn({name: "user_id"})
    user: User

    @Column({type: "integer"})
    comments: number

    @OneToMany(() => Favorite, (favorite) => favorite.book)
    favorites: Favorite[]

    @Column({type: 'text', nullable: true})
    src: string
}