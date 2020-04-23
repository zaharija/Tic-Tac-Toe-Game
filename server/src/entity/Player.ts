import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity('players')
export class Player extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    password: string

    @Column({ nullable: true })
    inGame: number

    @Column({ nullable: true })
    token: string

}
