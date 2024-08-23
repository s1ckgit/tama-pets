const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="min-h-screen h-auto bg-auth-background bg-no-repeat bg-cover">
      <div className="w-full min-h-screen h-auto backdrop-blur-sm flex items-center justify-center py-6 px-4">
        {children}
      </div>
    </main>
  );
};

export default AuthLayout;
