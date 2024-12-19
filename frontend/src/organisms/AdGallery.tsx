import type { Ad } from "../libs/graphql/generated/graphql-types";
import AdCard from "../molecules/AdCard";

type AdGalleryProps = {
	title: string;
	ads: Ad[];
};
export default function AdGallery(props: AdGalleryProps) {
	return (
		<main className="main-content">
			<h2>{props.title}</h2>
			<section className="recent-ads">
				{props.ads.map((ad) => (
					<AdCard key={ad.id} {...ad} />
				))}
			</section>
		</main>
	);
}
