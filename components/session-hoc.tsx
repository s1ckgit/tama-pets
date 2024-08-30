import { auth } from "@/auth";

const SessionHOC = async ({ Component, ...props }: { Component: React.ComponentType<{ session: typeof session }> }) => {
  const session = await auth();

  return (
    <Component session={session} {...props}/>
  );
};
export default SessionHOC;
