import { Query, Resolver } from "type-graphql";
import { Tag } from "../entities/Tag";

@Resolver(Tag)
export class TagResolver {
	@Query(() => [Tag])
	async getTags() {
		const tags = await Tag.find();
		return tags;
	}
}
