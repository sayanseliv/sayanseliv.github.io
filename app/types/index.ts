export interface Content {
	readonly id: number;
	readonly title: string;
	readonly description: string;
	readonly link: string;
	readonly category: string;
}
export type Tool = Omit<Content, 'description'> & {
	readonly usage: string;
};

export interface CategoryData {
	readonly name: string;
	readonly tools: readonly Tool[];
	readonly count: number;
}
