export interface Project {
	id: string;
	title: string;
	category: string;
	description: string;
	image: string; // --
	featured: boolean;
	author: Author;
	commentCount: number;
	rating: number;
	views: number;
}

export interface Author {
	name: string;
	avatar: string;
	verified: boolean;
}
