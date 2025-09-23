import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    throw new Error("Cabins Couldn't Load");
  }
  return data;
}
export async function addCabins(cabinData) {
  const imageName = `${Math.random()}-${cabinData.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = `${supabaseUrl}/storage/v1/object/public/Cabins/${imageName}`;
  // https://qkfipiszaklwcwnlnruv.supabase.co/storage/v1/object/public/Cabins/cabin-001.jpg
  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...cabinData, image: imagePath }])
    .select();
  if (error) {
    throw new Error("Cabin Couldn't be Added");
  }
  const { error: storageError } = await supabase.storage
    .from("Cabins") // bucket name
    .upload(imageName, cabinData.image);
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "Image Couldn't Be Uploaded And The Cabin Couldn't Be Created"
    );
  }
  return data;
}
export async function updateCabins(id, updatedCabin) {
  console.log(updatedCabin.image);
  let imagePath = updatedCabin.image;
  if (imagePath instanceof File) {
    const imageName = `${Math.random()}-${updatedCabin.image.name}`.replaceAll(
      "/",
      ""
    );
    imagePath = `${supabaseUrl}/storage/v1/object/public/Cabins/${imageName}`;

    const { error: storageError } = await supabase.storage
      .from("Cabins")
      .upload(imageName, updatedCabin.image);

    if (storageError) {
      throw new Error("Image upload failed ❌");
    }
  }
  const { data, error } = await supabase
    .from("cabins")
    .update({ ...updatedCabin, image: imagePath })
    .eq("id", id)
    .select();
  if (error) {
    throw new Error("Cabins Couldn't Be Updated ❌");
  }
  return data;
}
export async function deleteCabins(id) {
  const { data, error } = await supabase
    .from("cabins")
    .delete()
    .eq("id", id)
    .select();
  if (error) {
    throw new Error("Cabins Couldn't Deleted");
  }
  return data;
}
