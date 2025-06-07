import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@shared/components/ui";

interface Props {
	isOpen: boolean;
	onSaveDraft: () => void;
	onExitWithoutSaving: () => void;
}
export const SaveDataAlert = ({
	isOpen,
	onSaveDraft,
	onExitWithoutSaving,
}: Props) => {
	return (
		<AlertDialog open={isOpen}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>
						Do you want to go back without saving changes?
					</AlertDialogTitle>
					<AlertDialogDescription>
						If you go back now, your changes will be lost unless you save them
						as a draft.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel onClick={onSaveDraft}>
						Save as draft
					</AlertDialogCancel>
					<AlertDialogAction onClick={onExitWithoutSaving}>
						Exit without saving
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};
