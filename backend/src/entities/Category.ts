import {
	BaseEntity,
	Column,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
} from "typeorm";
import { Ad } from "./Ad";
import { Field, ObjectType } from "type-graphql";

@Entity()
@ObjectType()
export class Category extends BaseEntity {
	@Field()
	@PrimaryGeneratedColumn()
	id!: string;

	@Field()
	@Column()
	name!: string;

	@Field(() => [Ad])
	@OneToMany(
		() => Ad,
		(ad) => ad.category,
	)
	ads!: Ad[];
}
