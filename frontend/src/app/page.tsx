import Whiteboard from "@/app/ui/components/whiteboard";
import WhiteboardWS from "@/utils/ws";

export default function Page() {
	const _ws = new WhiteboardWS();
	return <Whiteboard />;
}
