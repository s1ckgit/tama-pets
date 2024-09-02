/* eslint-disable @typescript-eslint/no-explicit-any */
import { auth } from "@/auth";

const SessionHOC = async ({ Component, ...props }: { Component: React.JSXElementConstructor<any> }) => {
  const session = await auth();

  return (
    <Component session={session} {...props} />
  );
};
export default SessionHOC;
