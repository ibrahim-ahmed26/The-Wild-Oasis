import supabase, { supabaseUrl } from "./supabase";
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
export async function updateUser({ password, avatar, fullname }) {
  let updatedData;
  if (password) updatedData = { password };
  if (fullname) updatedData = { data: { fullname } };
  const { data, error } = await supabase.auth.updateUser(updatedData);
  if (error) throw new Error(error.message);
  if (!avatar) return data;
  const fileName = `avatar-${Date.now()}-${avatar.name}`;
  const { error: storageError } = await supabase.storage
    .from("Avatars")
    .upload(fileName, avatar, { upsert: true });

  if (storageError) throw new Error(storageError.message);

  const { data: updatedUser, error: updateError } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/Avatars/${fileName}`,
      },
    });

  if (updateError) throw new Error(updateError.message);

  return updatedUser;
}
//https://qkfipiszaklwcwnlnruv.supabase.co/storage/v1/object/public/Avatars/IbrahimAiPhoto.png
