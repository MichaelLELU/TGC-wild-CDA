import type { FormEvent } from "react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import {
	type Ad,
	type AdInput,
	useDeleteAdMutation,
	useGetCategoriesAndTagsQuery,
	useReplaceAdMutation,
} from "../libs/graphql/generated/graphql-types";

export default function AdEditionForm(props: Ad) {
	const { loading, error, data } = useGetCategoriesAndTagsQuery();
	const navigate = useNavigate();
	const [replaceAd] = useReplaceAdMutation();
	const [deleteAd] = useDeleteAdMutation();

	const hSubmit = (evt: FormEvent) => {
		evt.preventDefault();

		const form = evt.target;
		const formData = new FormData(form as HTMLFormElement);
		const formJson = Object.fromEntries(formData.entries());

		const formattedData = {
			...formJson,
			price: Number.parseFloat(formJson.price as string),
			tags: (formJson.tags as string).split(","),
		};

		replaceAd({
			variables: { data: formattedData as AdInput, adId: props.id.toString() },
		});
	};

	const hDelete = async () => {
		await deleteAd({ variables: { adId: props.id.toString() } });
		navigate("/");
	};

	if (error) return <>Error!</>;
	if (loading) return <>Loading...</>;
	if (!data) return <>We couldn't find anything to display</>;
	return (
		<main className="main-content">
			<form onSubmit={hSubmit}>
				<label>
					Titre:
					<input
						className="text-field"
						name="title"
						defaultValue={props.title}
					/>
				</label>
				<label>
					Description:
					<input
						className="text-field"
						name="description"
						defaultValue={props.description}
					/>
				</label>
				<label>
					Owner:
					<input
						className="text-field"
						name="owner"
						defaultValue={props.owner}
					/>
				</label>
				<label>
					Price:
					<input
						className="text-field"
						name="price"
						defaultValue={props.price}
					/>
				</label>
				<label>
					Picture:
					<input
						className="text-field"
						name="picture"
						defaultValue={props.picture}
					/>
				</label>
				<label>
					Location:
					<input
						className="text-field"
						name="location"
						defaultValue={props.location}
					/>
				</label>
				<select name="category">
					{data.getCategories.map((category) => (
						<option key={category.id} value={category.id}>
							{category.name}
						</option>
					))}
				</select>
				<label>
					Tags:
					<Select
						options={data.getTags.map((apiTag: ApiTag) => ({
							value: apiTag.id,
							label: apiTag.name,
						}))}
						isMulti
						name="tags"
						delimiter=","
					/>
				</label>
				<button type="submit" className="button">
					Update Ad!
				</button>
			</form>
			<button type="button" onClick={hDelete}>
				Delete Ad!
			</button>
		</main>
	);
}
