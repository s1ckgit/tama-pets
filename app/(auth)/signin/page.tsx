import CredentialsForm from "@/components/credentials-form";
 
export default function SignIn() {
  return (
    <main className="min-h-screen h-auto bg-register-background bg-no-repeat bg-cover">
      <div className="w-full min-h-screen h-auto backdrop-blur-sm flex items-center justify-center py-6">
        <CredentialsForm type="signin" />
      </div>
    </main>
  );
}
