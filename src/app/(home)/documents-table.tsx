import { PaginationStatus } from 'convex/react';
import { LoaderIcon } from 'lucide-react';

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Doc } from '../../../convex/_generated/dataModel';
import { DocumentRow } from './document-row';

type DocumentsTableType = {
	documents: Doc<'documents'>[] | undefined;
	loadMore: (numItems: number) => void;
	status: PaginationStatus;
};

export const DocumentsTable = ({
	documents,
	status,
	loadMore,
}: DocumentsTableType) => {
	return (
		<div className="max-w-screen-xl mx-auto px-4 lg:px-16 py-6 flex flex-col gap-5">
			{documents === undefined ? (
				<div className="flex item-center justify-center h-24">
					<LoaderIcon className="size-5 text-muted-foreground animate-spin" />
				</div>
			) : (
				<Table>
					<TableHeader>
						<TableRow className="hover:bg-transparent border-none">
							<TableHead>Name</TableHead>
							<TableHead>&nbsp;</TableHead>
							<TableHead className="hidden md:table-cell">Shared</TableHead>
							<TableHead className="hidden md:table-cell">Created at</TableHead>
						</TableRow>
					</TableHeader>
					{documents.length === 0 ? (
						<TableBody>
							<TableRow className="hover:bg-transparent">
								<TableCell
									colSpan={4}
									className="h-24 text-center text-muted-foreground"
								>
									No documents found
								</TableCell>
							</TableRow>
						</TableBody>
					) : (
						<TableBody>
							{documents.map((document) => (
								<DocumentRow key={document._id} document={document} />
							))}
						</TableBody>
					)}
				</Table>
			)}
			<div className="flex items-center justify-center">
				<Button
					variant="ghost"
					size="sm"
					onClick={() => loadMore(5)}
					disabled={status !== 'CanLoadMore'}
				>
					{status === 'CanLoadMore' ? 'Load more' : 'End of results'}
				</Button>
			</div>
		</div>
	);
};
