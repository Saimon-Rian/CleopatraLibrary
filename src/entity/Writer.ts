import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('writers')
export class Writer {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: "text"})
    name: string

    @Column({type: "integer"})
    user: number

    @Column({type: "integer"})
    book: number
}