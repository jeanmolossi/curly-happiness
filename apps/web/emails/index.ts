import { JSXElementConstructor, ReactElement } from "react";

export const sendEmail = async ({
	email,
	subject,
	from,
	text,
	react,
	marketing,
}: {
	email: string;
	subject: string;
	from?: string;
	text?: string;
	react?: ReactElement<any, string | JSXElementConstructor<any>>;
	marketing?: boolean;
}) => {
	console.log(`Email sent:`)
	console.log(`From: ${from || marketing ? 'blabla@email.com' : 'blabla@system.com'}`)
	console.log(`To: ${email}`)
	console.log(`ReplyTo: support@system.com`)
	console.log(`Subject: ${subject}`)
	if (text) {
		console.log(`TextBody: ${text}`)
	}

	if (react) {
		console.log(`HtmlBody: render(${react.toString()})`)
	}

	if (marketing) {
		console.log(`MessageStream: broadcast`)
	}


	return Promise.resolve();
}
