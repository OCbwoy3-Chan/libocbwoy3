export function setConsoleTitle(title: string): void {
	process.stdout.write(
		`\x1b]2;${title}\x1b\x5c`
	);
}
