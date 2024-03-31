'use client';

import { APP_DOMAIN } from '@pwd/utils';
import { useEffect } from 'react';

interface PageProps {}

const Page = ({}: PageProps) => {
	useEffect(() => {
		window.location.replace(APP_DOMAIN)
	}, [])
	return null
}

export default Page
