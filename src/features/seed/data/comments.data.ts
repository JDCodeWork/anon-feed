export const COMMENTS = [
	{
		id: "1",
		author: {
			name: "David Lee",
			avatar: "/placeholder.svg?height=40&width=40",
			verified: true,
			expertise: "Senior Developer",
		},
		date: "2 days ago",
		content:
			"I really like the UI design of this project. The color scheme and layout are very intuitive. One suggestion would be to improve the mobile responsiveness, especially on smaller devices. I noticed some overflow issues on my iPhone SE.",
		category: "UI/UX",
		likes: 12,
		dislikes: 0,
		verified: true,
	},
	{
		id: "2",
		author: {
			name: "Jennifer Park",
			avatar: "/placeholder.svg?height=40&width=40",
			verified: true,
			expertise: "UX Designer",
		},
		date: "1 week ago",
		content:
			"The user flow is well thought out, but I think the onboarding process could be simplified. Consider reducing the number of steps required to get started. Also, the contrast ratio for some text elements doesn't meet WCAG standards for accessibility.",
		category: "Accessibility",
		likes: 8,
		dislikes: 1,
		verified: true,
	},
	{
		id: "3",
		author: {
			name: "Robert Garcia",
			avatar: "/placeholder.svg?height=40&width=40",
			verified: false,
		},
		date: "2 weeks ago",
		content:
			"I found a potential performance issue in the data fetching logic. You're making multiple API calls for the same data. Consider implementing a caching mechanism or using React Query to optimize this. Happy to provide more specific guidance if needed.",
		category: "Performance",
		likes: 15,
		dislikes: 0,
		verified: false,
	},
];

export type IComment = (typeof COMMENTS)[0];
