export interface ComboboxOption {
	value: string;
	label: string;
	description?: string | undefined;
}

export interface ComboboxProps {
	id: string;
	value: string;
	options: readonly ComboboxOption[];
	onSelect: (value: string) => void;
	placeholder?: string | undefined;
	emptyText: string;
	isLoading?: boolean | undefined;
	isInvalid?: boolean | undefined;
	"aria-label"?: string | undefined;
	onQueryChange?: ((query: string) => void) | undefined;
	onOpenChange?: ((isOpen: boolean) => void) | undefined;
}
