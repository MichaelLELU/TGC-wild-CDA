import { Query, Resolver } from "type-graphql";
import { Category } from "../entities/Category";

@Resolver(Category)
export class CategoryResolver {
	@Query(() => [Category])
	async getCategories() {
		const categories = await Category.find();
		return categories;
	}
}
