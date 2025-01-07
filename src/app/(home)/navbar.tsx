import Image from 'next/image';
import Link from 'next/link';
import { UserButton, OrganizationSwitcher } from '@clerk/nextjs';

import { SearchInput } from './search-input';
import Burger from '@/components/header/burger';

export const Navbar = () => {
	return (
		<nav className="flex items-center justify-between h-full w-full">
			<div className="flex gap-3 items-center shrink-0 pr-6">
				<Link href="/">
					<Image src="/logo.svg" alt="Logo" width={36} height={36} />
				</Link>
				<h3 className="hidden md:block text-xl">Docs</h3>
			</div>
			<SearchInput className="hidden md:block mr-2 lg:mg-0" />
			<div className="flex gap-3 items-center">
				<OrganizationSwitcher
					afterCreateOrganizationUrl="/"
					afterLeaveOrganizationUrl="/"
					afterSelectOrganizationUrl="/"
					afterSelectPersonalUrl="/"
				/>
				<UserButton />
				<Burger className="md:hidden" />
			</div>
		</nav>
	);
};
