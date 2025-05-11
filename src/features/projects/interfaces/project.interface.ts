export interface BaseInfoProject {
	title: string;
	category: string;
	description: string;
	image: string; // --
}

export interface DatabaseProject extends BaseInfoProject {
	id: string;
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
