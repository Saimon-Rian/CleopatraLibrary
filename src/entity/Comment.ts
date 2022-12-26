import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('comments')
export class Comment {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: "text"})
    about: string

    @Column({type: "text"})
    body: string

    @Column({type: "integer"})
    user: number

    @Column({type: "integer"})
    book: number
}