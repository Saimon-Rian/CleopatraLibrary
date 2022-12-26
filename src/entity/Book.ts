import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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

    @Column({type: "integer"})
    user: number
    
    @Column({type: "integer"})
    comments: number
}