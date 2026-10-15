"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, LoaderCircle, Search } from "lucide-react";
import { type KeyboardEvent, useId, useState } from "react";
import { cn } from "@/shared/lib/cn";
import { Input } from "../input";
import type { ComboboxProps } from "./combobox.types";

export function Combobox({
	id,
	value,
	options,
	onSelect,
	placeholder,
	emptyText,
	isLoading = false,
	isInvalid = false,
	"aria-label": ariaLabel,
	onQueryChange,
	onOpenChange,
}: ComboboxProps) {
	const listId = useId();
	const [isOpen, setIsOpen] = useState(false);
	const [query, setQuery] = useState("");
	const [activeIndex, setActiveIndex] = useState(0);

	const visibleOptions = onQueryChange
		? options
		: options.filter((option) => option.label.toLowerCase().includes(query.trim().toLowerCase()));
	const selectedLabel = options.find((option) => option.value === value)?.label ?? value;

	const changeOpen = (next: boolean) => {
		setIsOpen(next);
		onOpenChange?.(next);
	};

	const changeQuery = (next: string) => {
		setQuery(next);
		setActiveIndex(0);
		onQueryChange?.(next);
	};

	const open = () => {
		changeQuery("");
		changeOpen(true);
	};

	const select = (nextValue: string) => {
		onSelect(nextValue);
		changeOpen(false);
	};

	const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
		if (!isOpen) return;

		if (event.key === "ArrowDown") {
			event.preventDefault();
			setActiveIndex((index) => Math.min(index + 1, visibleOptions.length - 1));
		} else if (event.key === "ArrowUp") {
			event.preventDefault();
			setActiveIndex((index) => Math.max(index - 1, 0));
		} else if (event.key === "Enter") {
			event.preventDefault();
			const option = visibleOptions[activeIndex];
			if (option) select(option.value);
		} else if (event.key === "Escape") {
			changeOpen(false);
		}
	};

	return (
		<div className={cn("relative", isOpen && "z-50")}>
			<Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
			<Input
				id={id}
				role="combobox"
				aria-label={ariaLabel}
				aria-invalid={isInvalid}
				aria-expanded={isOpen}
				aria-controls={listId}
				aria-autocomplete="list"
				aria-activedescendant={
					isOpen && visibleOptions[activeIndex] ? `${listId}-${activeIndex}` : undefined
				}
				autoComplete="off"
				className="pr-9 pl-9"
				value={isOpen ? query : selectedLabel}
				placeholder={placeholder}
				onFocus={open}
				onBlur={() => changeOpen(false)}
				onChange={(event) => changeQuery(event.target.value)}
				onKeyDown={handleKeyDown}
			/>
			{isLoading && (
				<LoaderCircle className="absolute top-1/2 right-3 size-4 -translate-y-1/2 animate-spin text-muted-foreground" />
			)}

			<AnimatePresence>
				{isOpen && (
					<motion.div
						id={listId}
						role="listbox"
						initial={{ opacity: 0, y: -4, scale: 0.98 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: -4, scale: 0.98 }}
						transition={{ duration: 0.15 }}
						className="absolute z-20 mt-1 max-h-64 w-full origin-top overflow-y-auto rounded-lg border border-border bg-background p-1 shadow-lg"
					>
						{visibleOptions.length === 0 && !isLoading && (
							<p className="px-3 py-2 text-sm text-muted-foreground">{emptyText}</p>
						)}
						{visibleOptions.map((option, index) => (
							<button
								key={option.value}
								id={`${listId}-${index}`}
								type="button"
								role="option"
								tabIndex={-1}
								aria-selected={option.value === value}
								onMouseDown={(event) => event.preventDefault()}
								onClick={() => select(option.value)}
								onMouseEnter={() => setActiveIndex(index)}
								className={cn(
									"flex w-full cursor-pointer items-center justify-between rounded-md px-3 py-2 text-left text-sm",
									index === activeIndex && "bg-muted",
								)}
							>
								<span className="flex min-w-0 flex-col">
									<span className="truncate">{option.label}</span>
									{option.description && (
										<span className="truncate text-xs text-muted-foreground">
											{option.description}
										</span>
									)}
								</span>
								{option.value === value && <Check className="size-4 text-primary" />}
							</button>
						))}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
