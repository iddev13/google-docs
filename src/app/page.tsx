import { Button } from "@/components/ui/button";
import Link from "next/link";

function Home() {
	return (
		<div className="min-h-screen flex items-center justify-center">
			<Button>
				<Link href='/documents/123'>
				Go to document
				</Link>
			</Button>
		</div>
	);
}
export default Home;
