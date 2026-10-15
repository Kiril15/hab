export const inputBase = [
	"w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground",
	"placeholder:text-muted-foreground/70",
	"transition-[border-color,box-shadow] duration-200",
	"focus-visible:outline-none focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-primary/15",
	"aria-invalid:border-destructive aria-invalid:focus-visible:ring-destructive/15",
	"disabled:cursor-not-allowed disabled:opacity-50",
].join(" ");
