'use client';

import { Button, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@pwd/ui";
import { CheckCheck, Copy, Loader2 } from "lucide-react";
import { useState } from "react";

interface CopyButtonProps {
	id: string;
}

const CopyButton = ({
	id
}: CopyButtonProps) => {
	const [copied, setCopied] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const handleCopy = async () => {
		setIsLoading(true)

		fetch(`/api/password/${id}/reveal`, {
			next: { revalidate: 3600, tags: ['passreveal'] }
		})
			.then(async (response) => {
				const password = await response.text()
				window.navigator.clipboard.writeText(password)
			})
			.catch((err) => {
				alert(err.message)
			})
			.finally(() => {
				setIsLoading(false)
				setCopied(true)

				setTimeout(() => {
					setCopied(false)
				}, 3000)
			})
	}

	return (
		<Button
			size="icon"
			onClick={handleCopy}
			disabled={isLoading || copied}
			aria-disabled={isLoading || copied}
		>
			{isLoading
				? (<Loader2 className="animate-spin" />)
				: copied
					? (
						<TooltipProvider>
							<Tooltip open>
								<TooltipTrigger disabled><CheckCheck /></TooltipTrigger>
								<TooltipContent>Copiado</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					) : <Copy />}
		</Button>
	)
}

export default CopyButton
