import { Toast, ToastAction } from "./radix-ui/Toast";
import { useSession } from "next-auth/react";

export default function SignInNotification() {
  const { data: session } = useSession();
  return (
    <>
      <Toast>
        <p style={{ margin: 0, fontSize: ".6rem ", color: "var(--grey)" }}>
          session expiration date
        </p>
        <p style={{ fontSize: ".6rem ", color: "var(--grey)" }}>
          {session?.expires}
        </p>
        <ToastAction altText="dismiss">swipe right to dismiss</ToastAction>
        <p style={{ fontSize: ".6rem ", color: "var(--grey)" }}>
          logged in as {session?.user?.name}
        </p>
        <p style={{ margin: 0, fontSize: ".6rem ", color: "var(--grey)" }}>
          {session?.user?.email}
        </p>
      </Toast>
    </>
  );
}
