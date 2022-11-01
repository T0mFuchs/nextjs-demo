import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

export default function SignUp() {
  const { data: session } = useSession();
  const { push } = useRouter();

  if (session) {
    setTimeout(() => {
      push(`/`);
    }, 1000);
    // replace with toast later
    return <h2 style={{ paddingTop: "6rem" }}>redirecting...</h2>;
  }
  return (
    <>
      <h2>create Account</h2>
      <p>
        <form>
          <input type="name" placeholder="`name`" />
          <input type="password" placeholder="`password`" />
          <input type="submit" value={"signup"} />
        </form>
      </p>
    </>
  );
}
