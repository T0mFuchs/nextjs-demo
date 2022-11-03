import { Toast, ToastAction } from "./radix-ui/Toast";
import { useSession } from "next-auth/react";

export default function SignInNotification() {
  const { data: session } = useSession();
  return (
    <>
      <Toast>
        <p style={{ margin: 0, fontSize: ".6rem ", color: "#42414d" }}>
          session expiration date
        </p>
        <p style={{ fontSize: ".6rem ", color: "#42414d" }}>
          {session?.expires}
        </p>
        <ToastAction altText="dismiss">swipe right to dismiss</ToastAction>
        <p style={{ fontSize: ".6rem ", color: "#42414d" }}>
          logged in as {session?.user?.name}
        </p>
        <p style={{ margin: 0, fontSize: ".6rem ", color: "#42414d" }}>
          {session?.user?.email}
        </p>
      </Toast>
    </>
  );
}
