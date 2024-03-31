'use client';

import { Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@pwd/ui";
import { ucFirst } from "@pwd/utils";
import { Slash } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

// labels map path to some human-friendly label
const labels = {
	'add': 'Adicionar',
	'edit': 'Editar',
	'': 'Senha'
}

const leveledDropdowns = {
	'^\\w{25}$': [
		{ label: 'Adicionar', href: '/add' }
	]
}

const Navigation = () => {
	const pathname = usePathname()

	const parts = pathname.split('/');
	const dashboardIdx = parts.indexOf('dashboard');
	const innerPages = parts.slice(dashboardIdx+1, parts.length)
	let level = 0;

	return (
		<nav>
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink href="/dashboard">
							Dashboard
						</BreadcrumbLink>
					</BreadcrumbItem>

					{innerPages.length > 0 &&
					innerPages.map((page, i, paths) => {
						const fullPath = paths.slice(0, i+1).join('/')
						let label = labels[page]
						if (!label)
							label = ucFirst(page);

						level++;

						let leveledMenu: { href: string, label: string }[] = [];
						let hasLeveledMenu = false;

						for (let [regexKey, items] of Object.entries(leveledDropdowns)) {
							const matcher = new RegExp(regexKey);

							console.log({
								fullPath,
								exec: matcher.exec(fullPath)
							})

							if (matcher.test(fullPath)) {
								leveledMenu = items
								hasLeveledMenu = level === i+1
							}
						}

						return (
							<Fragment key={i}>
								<BreadcrumbSeparator>
									<Slash />
								</BreadcrumbSeparator>
								{!hasLeveledMenu ? (
									<BreadcrumbItem>
										<BreadcrumbLink href={`/dashboard/${fullPath}`}>
											{label}
										</BreadcrumbLink>
									</BreadcrumbItem>
								) : (
									<BreadcrumbItem>
										<DropdownMenu>
											<DropdownMenuTrigger>
												<BreadcrumbEllipsis />
											</DropdownMenuTrigger>
											<DropdownMenuContent>
												<DropdownMenuItem>
													<Link href={`/dashboard/${fullPath}`}>
														Item atual
													</Link>
												</DropdownMenuItem>

												{leveledMenu.map((item, j) => (
													<DropdownMenuItem key={`${i}-${j}`}>
														<Link href={`/dashboard${item.href}`}>
															{item.label}
														</Link>
													</DropdownMenuItem>
												))}
											</DropdownMenuContent>
										</DropdownMenu>
									</BreadcrumbItem>
								)}
							</Fragment>
						)
					})}

				</BreadcrumbList>
			</Breadcrumb>
		</nav>
	)
}

export default Navigation
