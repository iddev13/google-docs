'use client';

import { type ColorResult, SketchPicker } from 'react-color';
import { type Level } from '@tiptap/extension-heading';
import {
	LucideIcon,
	Redo2Icon,
	Undo2Icon,
	PrinterIcon,
	SpellCheckIcon,
	BoldIcon,
	ItalicIcon,
	UnderlineIcon,
	MessageSquarePlusIcon,
	ListTodoIcon,
	RemoveFormattingIcon,
	ChevronDownIcon,
	HighlighterIcon,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { useEditorStore } from '@/store/use-editor-store';
import { Separator } from '@/components/ui/separator';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const TextColorButton = () => {
	const { editor } = useEditorStore();
	const value = editor?.getAttributes('textStyle').color || '#000000';
	const onChange = (color: ColorResult) => {
		editor?.chain().focus().setColor(color.hex).run();
	};
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
					<span className="text-xs">A</span>
					<div className="h-0.5 w-full" style={{ backgroundColor: value }} />
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="p-0">
				<SketchPicker color={value} onChange={onChange} />
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

const HighlightColorButton = () => {
	const { editor } = useEditorStore();
	const value = editor?.getAttributes('highlight').color || '#ffffff';
	const onChange = (color: ColorResult) => {
		editor?.chain().focus().setHighlight({ color: color.hex }).run();
	};
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
					<HighlighterIcon className="size-4" />
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="p-0">
				<SketchPicker color={value} onChange={onChange} />
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

const HeadingLevelButton = () => {
	const { editor } = useEditorStore();

	const headings = [
		{ label: 'Normal text', value: 0, fontSize: '16px' },
		{ label: 'Heading 1', value: 1, fontSize: '32px' },
		{ label: 'Heading 2', value: 2, fontSize: '24px' },
		{ label: 'Heading 3', value: 3, fontSize: '20px' },
		{ label: 'Heading 4', value: 4, fontSize: '18px' },
		{ label: 'Heading 5', value: 5, fontSize: '16px' },
	];

	const getCurrentHeading = () => {
		for (let level = 1; level <= 5; level++) {
			if (editor?.isActive('heading', { level })) {
				return `Heading ${level}`;
			}
		}
		return 'Normal text';
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button className="h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
					<span className="truncate">{getCurrentHeading()}</span>
					<ChevronDownIcon className="size-4 shrink-0 ml-2" />
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="p-1 flex flex-col gap-y-1">
				{headings.map(({ label, value, fontSize }) => (
					<button
						key={value}
						onClick={() => {
							if (value === 0) {
								editor?.chain().focus().setParagraph().run();
							} else {
								editor
									?.chain()
									.focus()
									.toggleHeading({ level: value as Level })
									.run();
							}
						}}
						className={cn(
							'flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80',
							(value === 0 && !editor?.isActive('heading')) ||
								(editor?.isActive('heading', { level: value }) &&
									'bg-neutral-200/80')
						)}
						style={{ fontSize }}
					>
						{label}
					</button>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

const FontFamilyButton = () => {
	const { editor } = useEditorStore();
	const fonts = [
		{ label: 'Arial', value: 'Arial' },
		{ label: 'Times New Roman', value: 'Times New Roman' },
		{ label: 'Courier New', value: 'Courier New' },
		{ label: 'Georgia', value: 'Georgia' },
		{ label: 'Verdana', value: 'Verdana' },
	];
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button className="h-7 w-[120px] shrink-0 flex items-center justify-between rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
					<span className="truncate">
						{editor?.getAttributes('textStyle').fontFamily || 'Arial'}
					</span>
					<ChevronDownIcon className="size-4 shrink-0 ml-2" />
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="p-1 flex flex-col gap-y-1">
				{fonts.map(({ label, value }) => (
					<button
						key={value}
						onClick={() => editor?.chain().focus().setFontFamily(value).run()}
						className={cn(
							'flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80',
							editor?.getAttributes('textStyle').fontFamily === value &&
								'bg-neutral-200/80'
						)}
						style={{ fontFamily: value }}
					>
						<span className="text-sm">{label}</span>
					</button>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

interface ToolbarButtonProps {
	onClick?: () => void;
	isActive?: boolean;
	icon: LucideIcon;
}

const ToolbarButton = ({
	onClick,
	isActive,
	icon: Icon,
}: ToolbarButtonProps) => {
	return (
		<button
			onClick={onClick}
			className={cn(
				'text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80',
				isActive && 'bg-neutral-200/80'
			)}
		>
			<Icon className="size-4" />
		</button>
	);
};

export const Toolbar = () => {
	const { editor } = useEditorStore();

	console.log('Toolbar editor', { editor });

	const sections: {
		label: string;
		icon: LucideIcon;
		onClick: () => void;
		isActive?: boolean;
	}[][] = [
		[
			{
				label: 'Undo',
				icon: Undo2Icon,
				onClick: () => editor?.chain().focus().undo().run(),
			},
			{
				label: 'Redo',
				icon: Redo2Icon,
				onClick: () => editor?.chain().focus().redo().run(),
			},
			{
				label: 'Print',
				icon: PrinterIcon,
				onClick: () => window.print(),
			},
			{
				label: 'Spell Check',
				icon: SpellCheckIcon,
				onClick: () => {
					const current = editor?.view.dom.getAttribute('spellcheck');
					editor?.view.dom.setAttribute(
						'spellcheck',
						current === 'false' ? 'true' : 'false'
					);
				},
			},
		],
		[
			{
				label: 'Bold',
				icon: BoldIcon,
				isActive: editor?.isActive('bold'),
				onClick: () => editor?.chain().focus().toggleBold().run(),
			},
			{
				label: 'Italic',
				icon: ItalicIcon,
				isActive: editor?.isActive('italic'),
				onClick: () => editor?.chain().focus().toggleItalic().run(),
			},
			{
				label: 'Underline',
				icon: UnderlineIcon,
				isActive: editor?.isActive('underline'),
				onClick: () => editor?.chain().focus().toggleUnderline().run(),
			},
		],
		[
			{
				label: 'Comment',
				icon: MessageSquarePlusIcon,
				isActive: false, //!Enable this function!
				onClick: () => console.log('TODO: Comment'),
			},
			{
				label: 'List Todo',
				icon: ListTodoIcon,
				isActive: editor?.isActive('taskList'),
				onClick: () => editor?.chain().focus().toggleTaskList().run(),
			},
			{
				label: 'Remove Formatting',
				icon: RemoveFormattingIcon,
				onClick: () => editor?.chain().focus().unsetAllMarks().run(),
			},
		],
	];

	return (
		<div className="bg-[#f1f4f9] px-2.5 py-0.5 rounded-[24px] min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto">
			{sections[0].map((section) => (
				<ToolbarButton key={section.label} {...section} />
			))}
			<Separator orientation="vertical" className="h-6 bg-neutral-300" />
			<FontFamilyButton />
			<Separator orientation="vertical" className="h-6 bg-neutral-300" />
			<HeadingLevelButton />
			<Separator orientation="vertical" className="h-6 bg-neutral-300" />
			{/* TODO FOnT Size */}
			<Separator orientation="vertical" className="h-6 bg-neutral-300" />
			{sections[1].map((section) => (
				<ToolbarButton key={section.label} {...section} />
			))}
			<TextColorButton />
			<HighlightColorButton />
			<Separator orientation="vertical" className="h-6 bg-neutral-300" />
			{/* Link */}
			{/* Image */}
			{/* Align */}
			{/* Line height */}
			{/* list */}
			{sections[2].map((section) => (
				<ToolbarButton key={section.label} {...section} />
			))}
		</div>
	);
};