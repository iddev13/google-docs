import { Editor } from './editor';
import { Toolbar } from './toolbar';

interface DocumentIdPageProps {
	params: Promise<{ documentId: string }>;
}

const DocumentPage = async ({ params }: DocumentIdPageProps) => {
	const { documentId } = await params;
	return (
		<div className="min-h-screen bg-[#FAFBFD]">
			<h1>DocumentPage{documentId}</h1>
			<Toolbar />
			<Editor />
		</div>
	);
};

export default DocumentPage;
