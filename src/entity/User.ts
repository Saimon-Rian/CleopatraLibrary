import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Book } from "./Book";
import { Comment } from "./Comment";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'text'})
    name:string

    @Column({type: 'text'})
    email: string 
    
    @Column({type: 'text'})
    username: string

    @Column({type: 'integer'})
    age: number

    @Column({type: 'text', nullable: true, width: 300})
    about: string
}