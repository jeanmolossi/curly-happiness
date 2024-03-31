export const ucFirst = (text: string): string => {
	if (!text) return text

	if (text.length === 1) return text.toUpperCase()

	const first = text.at(0)!.toUpperCase()
	const word = text.slice(1, text.length + 1)

	return `${first.toUpperCase()}${word}`
}
