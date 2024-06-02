import { signUp } from "@/actions/user";

 
export default function SignUp() {
  return (
    <form
      action={async (formData) => {
        "use server";
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        const breed = formData.get('breed') as string;
        const color = formData.get('color') as string;
        await signUp({ email, password, breed, color });
      }}
    >
      <label>
        Email
        <input name="email" type="email" />
      </label>
      <label>
        Password
        <input name="password" type="password" />
      </label>
      <label>
        breed
        <input name="breed" type="text" />
      </label>
      <label>
        color
        <input name="color" type="text" />
      </label>
      <button>Sign In</button>
    </form>
  );
}
