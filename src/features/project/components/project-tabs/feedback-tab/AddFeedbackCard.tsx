import { useSession } from "@clerk/clerk-react";
import {
	type CreateCommentArgs,
	createComment,
} from "@features/project/actions/create-comment";
import { FEEDBACK_AREAS } from "@features/submit/constants/project-creation.constant";
import {
	Button,
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	Textarea,
} from "@shared/components/ui";
import type { ICommentResponse, ISupabaseComment } from "@shared/interfaces";
import { transformClerkUser } from "@shared/lib/transform-clerk-user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
	projectId: string;
}
export const AddFeedbackCard = ({ projectId }: Props) => {
	const queryClient = useQueryClient();
	const { session, isSignedIn } = useSession();

	const [message, setMessage] = useState("");
	const [feedbackArea, setFeedbackArea] = useState<string | undefined>();

	const createCommentMutation = useMutation({
		mutationFn: createComment,
		onMutate: async ({ comment, user }) => {
			await queryClient.cancelQueries({
				queryKey: ["project", "comments", projectId],
			});

			const previousComments = queryClient.getQueriesData({
				queryKey: ["project", "comments", projectId],
			});

			const newComment: Omit<ICommentResponse, "id"> = {
				category: comment.category,
				content: comment.content,
				author: user,
				created_at: new Date(Date.now()).toISOString(),
				user_id: user.id,
				project_id: projectId,
			};

			queryClient.setQueryData(
				["project", "comments", projectId],
				(old: ICommentResponse[] | undefined) => [newComment, ...(old ?? [])],
			);

			return { previousComments };
		},
		onError: (_err, _new, context) => {
			queryClient.setQueryData(
				["project", "comments", projectId],
				context?.previousComments,
			);

			toast.error("An error occurred while creating the comment");
		},
		onSettled: () =>
			queryClient.invalidateQueries({
				queryKey: ["project", "comments", projectId],
			}),
	});

	const onSubmit = async () => {
		if (message.length < 6 || feedbackArea === undefined) {
			return toast.error("Some of the fields are incomplete or wrong");
		}

		if (!isSignedIn) {
			return toast.error(
				"to make a comment it is necessary to be authenticated",
			);
		}

		const comment = { content: message, category: feedbackArea, projectId };
		const user = transformClerkUser(session.user, await session.getToken())!;

		createCommentMutation.mutate(
			{ comment, user },
			{
				onSuccess: () => {
					setMessage("");
				},
			},
		);
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-base">Add Your Feedback</CardTitle>
				<CardDescription>
					Your feedback will be visible to the project creator and other users
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Textarea
					placeholder="Share your thoughts, suggestions, or questions about this project..."
					className="min-h-[120px]"
					value={message}
					onChange={(e) => setMessage(e.target.value)}
				/>
			</CardContent>
			<CardFooter className="flex justify-between">
				<Select value={feedbackArea} onValueChange={(v) => setFeedbackArea(v)}>
					<SelectTrigger>
						<SelectValue placeholder="Select a feedback area" />
					</SelectTrigger>
					<SelectContent>
						{FEEDBACK_AREAS.map(({ value, label }) => (
							<SelectItem key={value} value={value}>
								{label}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
				<Button onClick={onSubmit} disabled={createCommentMutation.isPending}>
					Submit Feedback
				</Button>
			</CardFooter>
		</Card>
	);
};
