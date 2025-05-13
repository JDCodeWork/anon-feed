export interface BaseInfoProject {
	title: string;
	category: string;
	description: string;
	featured: boolean;
}

export interface DatabaseProject extends BaseInfoProject {
	id: string;
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
