import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('ratings')
export class Rating {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: "integer"})
    rating: number

    @Column({type: "integer"})
    user: number

    @Column({type: "integer"})
    book: number
}