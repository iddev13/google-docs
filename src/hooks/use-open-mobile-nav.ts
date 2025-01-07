import { create } from 'zustand';

type OpenMobileNavState = {
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
};

export const useOpenMobileNav = create<OpenMobileNavState>((set) => ({
	isOpen: false,
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false }),
}));
