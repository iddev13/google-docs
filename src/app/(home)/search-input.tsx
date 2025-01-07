'use client';

import { useRef, useState } from 'react';
import { SearchIcon, XIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSearchParam } from '@/hooks/use-search-param';
import { cn } from '@/lib/utils';
import { useOpenMobileNav } from '@/hooks/use-open-mobile-nav';

type SearchInputType = {
	className?: string;
};

export const SearchInput = ({ className }: SearchInputType) => {
	const [search, setSearch] = useSearchParam('search');
	const [value, setValue] = useState<string>(search);
	const { isOpen, onClose } = useOpenMobileNav();

	const inputRef = useRef<HTMLInputElement>(null);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	};

	const handleClear = () => {
		setValue('');
		setSearch('');
		inputRef.current?.blur();
	};

	const handleSubmit = (e: React.FocusEvent<HTMLFormElement>) => {
		e.preventDefault();
		setSearch(value);
		inputRef.current?.blur();
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			onClose();
		}
	};

	return (
		<div className={cn('flex-1 flex items-center justify-center', className)}>
			<form className="relative max-w-[720px] w-full" onSubmit={handleSubmit}>
				<Input
					ref={inputRef}
					onChange={handleChange}
					value={value}
					placeholder="Search"
					className="md:text-base px-14 placeholder:text-neutral-800 w-full border-none rounded-full h-[48px] focus-visible:shadow=[0_1px_1px_0_rgba(65,69,73,.3),0_1px_3px_1px_rgba(65,69,73,.15)] bg-[#f0f4f8] focus-visible:ring-0 focus:bg-white"
					onKeyDown={handleKeyDown}
				/>
				<Button
					type="submit"
					variant="ghost"
					size="icon"
					className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full [&_svg]:size-5"
				>
					<SearchIcon />
				</Button>
				{value && (
					<Button
						onClick={handleClear}
						type="button"
						variant="ghost"
						size="icon"
						className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full [&_svg]:size-5"
					>
						<XIcon />
					</Button>
				)}
			</form>
		</div>
	);
};
