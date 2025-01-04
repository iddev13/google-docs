import { cn } from '@/lib/utils';
import { LoaderIcon } from 'lucide-react';

type FullScreenLoaderType = {
	label?: string;
	className?: string;
};

export const FullScreenLoader = ({
	label,
	className,
}: FullScreenLoaderType) => {
	return (
		<div
			className={cn(
				'min-h-screen flex flex-col items-center justify-center gap-2',
				className
			)}
		>
			<LoaderIcon className="size-6 text-muted-foreground animate-spin" />
			{label && <p className="text-sm text-muted-foreground">{label}</p>}
		</div>
	);
};
