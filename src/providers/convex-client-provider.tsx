'use client';

import { ReactNode } from 'react';
import { ClerkProvider, useAuth, SignIn } from '@clerk/nextjs';
import { ConvexProviderWithClerk } from 'convex/react-clerk';
import {
	ConvexReactClient,
	Authenticated,
	Unauthenticated,
	AuthLoading,
} from 'convex/react';
import { FullScreenLoader } from '@/components/full-screen-loader';

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export function ConvexClientProvider({ children }: { children: ReactNode }) {
	return (
		<ClerkProvider
			publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}
		>
			<ConvexProviderWithClerk useAuth={useAuth} client={convex}>
				<Authenticated>{children}</Authenticated>
				<Unauthenticated>
					<div className="min-h-screen flex flex-col items-center justify-center">
						<SignIn routing="hash" />
					</div>
				</Unauthenticated>
				<AuthLoading>
					<FullScreenLoader label="Auth loading..." />
				</AuthLoading>
			</ConvexProviderWithClerk>
		</ClerkProvider>
	);
}
