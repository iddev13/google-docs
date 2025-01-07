import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { NuqsAdapter } from 'nuqs/adapters/next/app';

import { Toaster } from '@/components/ui/sonner';
import { ConvexClientProvider } from '@/providers/convex-client-provider';
import '@liveblocks/react-ui/styles.css';
import '@liveblocks/react-tiptap/styles.css';
import { SheetProvider } from '@/providers/sheet-provider';
import './globals.css';

const inter = Inter({
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Google Docs',
	description: 'Generated by create next app',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<NuqsAdapter>
					<ConvexClientProvider>
						<SheetProvider />
						{children}
						<Toaster />
					</ConvexClientProvider>
				</NuqsAdapter>
			</body>
		</html>
	);
}
