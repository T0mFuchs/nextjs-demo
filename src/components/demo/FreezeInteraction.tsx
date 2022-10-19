import { Icon } from "@iconify/react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "../radix-ui";

export { FreezeInteraction };

function FreezeInteraction() {
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger>``alert dialog trigger``</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogTitle>interactivity blocked</AlertDialogTitle>
          <AlertDialogDescription>
            outside of this element
          </AlertDialogDescription>
          <AlertDialogCancel>
            <Icon icon="line-md:close" color="#d24e59" fontSize={40} />
          </AlertDialogCancel>
          <AlertDialogAction>
            <Icon icon="line-md:confirm" color="#148700" fontSize={40} />
          </AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
