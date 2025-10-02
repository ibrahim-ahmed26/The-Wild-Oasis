import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    throw new Error("Cabins Couldn't Load");
  }
  return data;
}

export async function addCabins(cabinData) {
  // Check if this is a duplication (existing image URL) or new cabin (file upload)
  const isDuplicate =
    cabinData.isDuplicate || typeof cabinData.image === "string";

  let imagePath = cabinData.image;
  let imageName = null; // Store the image name to use consistently

  if (!isDuplicate && cabinData.image instanceof File) {
    // Generate image name once and reuse it
    imageName = `${Math.random()}-${cabinData.image.name}`.replaceAll("/", "");
    imagePath = `${supabaseUrl}/storage/v1/object/public/Cabins/${imageName}`;
  }

  // Remove isDuplicate flag before inserting to database
  const { isDuplicate: _, ...cleanCabinData } = cabinData;

  // Insert cabin data with image path
  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...cleanCabinData, image: imagePath }])
    .select();

  if (error) {
    throw new Error("Cabin Couldn't be Added");
  }

  // Only upload file if it's not a duplication
  if (!isDuplicate && cabinData.image instanceof File) {
    const { error: storageError } = await supabase.storage
      .from("Cabins")
      .upload(imageName, cabinData.image); // Use the same imageName

    if (storageError) {
      // If image upload fails, delete the cabin record
      await supabase.from("cabins").delete().eq("id", data[0].id);
      console.error(storageError);
      throw new Error(
        "Image Couldn't Be Uploaded And The Cabin Couldn't Be Created"
      );
    }
  }

  return data;
}

export async function updateCabins(id, updatedCabin) {
  console.log("Updating cabin with data:", updatedCabin);
  console.log("Image type:", typeof updatedCabin.image);
  console.log("Image instanceof File:", updatedCabin.image instanceof File);

  let imagePath = updatedCabin.image;

  // Check if a new image file was provided
  if (updatedCabin.image instanceof File) {
    const imageName = `${Math.random()}-${updatedCabin.image.name}`.replaceAll(
      "/",
      ""
    );
    imagePath = `${supabaseUrl}/storage/v1/object/public/Cabins/${imageName}`;

    const { error: storageError } = await supabase.storage
      .from("Cabins")
      .upload(imageName, updatedCabin.image);

    if (storageError) {
      console.error("Storage error:", storageError);
      throw new Error("Image upload failed ❌");
    }
  }
  // If not a File instance, use the existing image path as is

  const { data, error } = await supabase
    .from("cabins")
    .update({ ...updatedCabin, image: imagePath })
    .eq("id", id)
    .select();

  if (error) {
    console.error("Update error:", error);
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
    throw new Error("Cabins Couldn't Be Deleted");
  }

  return data;
}
