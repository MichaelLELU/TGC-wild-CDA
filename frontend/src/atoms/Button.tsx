import type { MouseEventHandler } from "react";
import { Link } from "react-router-dom";
import "./Button.module.css";

type Props = {
	label: string;
	onClick?: MouseEventHandler<HTMLButtonElement>;
	to?: string;
};
export default function Button(props: Props) {
	if (props.onClick)
		return (
			<button type="button" onClick={props.onClick}>
				{props.label}
			</button>
		);

	if (props.to) return <Link to={props.to}>{props.label}</Link>;

	return <p>{props.label}</p>;
}
