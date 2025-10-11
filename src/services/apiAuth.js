import supabase from "./supabase";
export async function signup({ email, fullname, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    fullname,
    password,
    options: {
      data: {
        fullname,
        avatar: "",
      },
    },
  });
  if (error) {
    throw new Error(error.message || "Signup failed. Please try again later.");
  }
  if (!data.user || data.user.identities?.length === 0) {
    throw new Error("User already registered or email already exists.");
  }
  return data;
}
export default async function Login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    throw new Error(error);
  }
  return data;
}
export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    throw new Error(error.message);
  }
  return data?.user;
}
export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error(error.message);
  }
}
