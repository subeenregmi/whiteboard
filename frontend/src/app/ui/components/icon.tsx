import { renderToStaticMarkup } from "react-dom/server";
import { BsPaintBucket } from "react-icons/bs";
import { FaChevronDown, FaChevronRight, FaSquare } from "react-icons/fa6";
import { IoHandLeftOutline, IoShapesOutline } from "react-icons/io5";
import { PiCircleFill, PiEraser, PiPencilSimple } from "react-icons/pi";
import { type Color, Colors } from "@/models/constants";
import cn from "@/utils/cn";

const IconVariantMap = {
	chevronRight: FaChevronRight,
	pen: PiPencilSimple,
	eraser: PiEraser,
	circle: PiCircleFill,
	chevronDown: FaChevronDown,
	shapes: IoShapesOutline,
	hand: IoHandLeftOutline,
	paintBucket: BsPaintBucket,
	square: FaSquare,
	none: null,
};

export type IconVariant = keyof typeof IconVariantMap;

interface IconProps {
	variant: IconVariant;
	size?: string;
	className?: string;
	color?: Color;
	hoverable?: boolean;
	rotateOnHover?: boolean;
	rotationDegree?: number;
	transitionDuration?: number;
}

export default function Icon(props: IconProps) {
	if (props.variant === "none") return;
	const IconComponent = IconVariantMap[props.variant];

	const color = props.color ? Colors[props.color] : Colors.black;

	return (
		<IconComponent
			size={props.size || "1.65em"}
			className={cn(
				"transition-all",
				`duration-${props.transitionDuration || 500}`,
				color.className,
				props.hoverable &&
					"hover:scale-90 hover:opacity-50 hover:cursor-pointer",
				props.hoverable &&
					props.rotateOnHover &&
					`rotate-${props.rotationDegree || 180}`,
				props.className,
			)}
		/>
	);
}

const IconCursorCache = new Map<IconVariant, string>();

export function IconToCursor(variant: IconVariant): string {
	if (variant === "none") return "";

	const cached = IconCursorCache.get(variant);
	if (cached) return cached;

	const IconComponent = IconVariantMap[variant];
	const svg = renderToStaticMarkup(<IconComponent size="32" color="black" />);
	const encoded = encodeURIComponent(svg);
	const svgString = `url("data:image/svg+xml,${encoded}") 16 16, crosshair`;

	IconCursorCache.set(variant, svgString);

	return svgString;
}
