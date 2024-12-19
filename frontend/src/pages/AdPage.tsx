import { useState } from "react";
import { useParams } from "react-router-dom";
import AdDetail from "../organisms/AdDetail";
import AdEditionForm from "../organisms/AdEditionForm";
import { useGetAdQuery } from "../libs/graphql/generated/graphql-types";

export default function AdPage() {
	const { adId } = useParams();
	const { loading, error, data } = useGetAdQuery({
		variables: { adId: `${adId}` },
	});

	const [editionMode, setEditionMode] = useState(false);

	const hClick = () => {
		setEditionMode(!editionMode);
	};

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Aw fck, something broke !</p>;
	if (!data || !adId) return <p>We couldn't find anything to display</p>;
	return (
		<>
			<label>
				Edit mode:{" "}
				<input type="checkbox" checked={editionMode} onChange={hClick} />
			</label>
			{editionMode ? (
				<AdEditionForm {...data.getAdById} id={adId} />
			) : (
				<AdDetail {...data.getAdById} />
			)}
		</>
	);
}
