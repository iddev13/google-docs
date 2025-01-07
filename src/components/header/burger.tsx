import { Menu } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useOpenMobileNav } from '@/hooks/use-open-mobile-nav';
import { cn } from '@/lib/utils';

type BurgerType = {
	className?: string;
};

const Burger = ({ className }: BurgerType) => {
	const { onOpen } = useOpenMobileNav();

	return (
		<Button
			asChild
			variant="outline"
			size="icon"
			className={cn('p-1.5', className)}
			onClick={onOpen}
			title="Menu"
		>
			<Menu />
		</Button>
	);
};

export default Burger;
