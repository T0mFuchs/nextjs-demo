import { Toast, ToastAction } from "./radix-ui/Toast";
import { useSession } from "next-auth/react";

export default function SignInNotification() {
  const { data: session } = useSession();
  return (
    <>
      <Toast>
        <div style={{ fontSize: ".6rem " }}>session expiration date</div>
        <p style={{ fontSize: ".6rem " }}>{session?.expires}</p>
        <ToastAction altText="dismiss">swipe right to dismiss</ToastAction>
        <p style={{ fontSize: ".6rem " }}>logged in as {session?.user?.name}</p>
        <div style={{ fontSize: ".6rem " }}>{session?.user?.email}</div>
      </Toast>
    </>
  );
}
