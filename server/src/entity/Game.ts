import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm"

@Entity('games')
export class Game extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    multiplayer: boolean

    @Column({ nullable: true })
    password: string

    @Column()
    playerOne: number

    @Column({ nullable: true })
    playerTwo: number

    @Column({ nullable: true })
    playerOneMoves: string

    @Column({ nullable: true })
    playerTwoMoves: string

    @Column({ nullable: true })
    winner: string
}
