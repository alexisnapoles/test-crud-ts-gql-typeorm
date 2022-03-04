import { Field, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

// specifying in graphql, decorate class
@ObjectType()
@Entity()
export class Movie extends BaseEntity {
    // auto-incrementation
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => String)
    @Column()
    title: string;

    @Field(() => Int)
    @Column("int", { default: 90 })
    minutes: number;
}