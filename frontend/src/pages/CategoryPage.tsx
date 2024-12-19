import AdGallery from "../organisms/AdGallery";
import { useParams } from "react-router-dom";
import { useGetAdsByCategoryQuery } from "../libs/graphql/generated/graphql-types";

export default function CategoryPage() {
	const { catId } = useParams();
	const { loading, error, data } = useGetAdsByCategoryQuery({
		variables: { categoryId: `${catId}` },
	});

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Aw fck, something broke !</p>;
	if (!data) return <>We couldn't find anything to display</>;
	return (
		<AdGallery
			title={`Annonces de la catégorie n°${catId}`}
			ads={data.getAdsByCategory}
		/>
	);
}
