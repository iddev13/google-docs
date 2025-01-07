import { SearchInput } from '@/app/(home)/search-input';
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
} from '@/components/ui/sheet';
// import { MenuItemsMobile } from "@/components/header/menu-items-mobile";
// import { menuItems } from "@/constants";
import { useOpenMobileNav } from '@/hooks/use-open-mobile-nav';

export const MobileNavSheet = () => {
	const { isOpen, onClose } = useOpenMobileNav();
	return (
		<Sheet open={isOpen} onOpenChange={onClose}>
			<SheetHeader className="hidden opacity-0 invisible">
				<SheetTitle>Navigation</SheetTitle>
			</SheetHeader>
			<SheetContent side="left" className="px-2 pt-12 overflow-y-auto">
				{/* <nav className="flex flex-col gap-y-2 pt-6 flex-1"> */}
				{/* <ul>
            {menuItems.map((menu) => {
              const depthLevel = 0; // Menu depth level
              return (
                <MenuItemsMobile
                  id={menu.id}
                  items={menu}
                  depthLevel={depthLevel}
                  key={menu.id}
                />
              );
            })}
          </ul> */}
				{/* </nav> */}
				<SearchInput />
			</SheetContent>
		</Sheet>
	);
};
