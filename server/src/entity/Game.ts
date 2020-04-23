import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, BaseEntity, OneToOne } from "typeorm";
import { Player } from './Player'

@Entity('games')
export class Game extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    multiplayer: boolean

    @Column({ nullable: true })
    password: string

    @OneToOne(() => Player)
    @JoinColumn()
    playerOne: Player

    @Column({ nullable: true })
    playerTwo: number

    @Column({ nullable: true })
    playerOneMoves: string

    @Column({ nullable: true })
    playerTwoMoves: string

    @Column({ nullable: true })
    winner: string
}
