import { Link } from "react-router-dom";
import type { Ad } from "../libs/graphql/generated/graphql-types";

export default function AdCard(props: Ad) {
	return (
		<div className="ad-card-container">
			<Link className="ad-card-link" to={`/ads/${props.id}`}>
				<img className="ad-card-image" src={props.picture} alt={props.title} />
				<div className="ad-card-text">
					<div className="ad-card-title">{props.title}</div>
					<div className="ad-card-price">{props.price} €</div>
				</div>
			</Link>
		</div>
	);
}
