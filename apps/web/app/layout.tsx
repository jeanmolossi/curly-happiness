import '@/styles/globals.css';
import { ThemeProvider } from '@repo/ui';
import '@repo/ui/dist/index.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Your app',
	description: 'That is the app initial page',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}): JSX.Element {
	return (
		<html lang="en">
			<body className={inter.className}>
				<ThemeProvider
					attribute='class'
					defaultTheme='system'
					enableSystem
				>
					{children}
				</ThemeProvider>
			</body>
		</html>
	)
}
