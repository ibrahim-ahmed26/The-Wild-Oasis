import supabase from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    throw new Error("Cabins Couldn't Load");
  }
  return data;
}
export async function addCabins(cabinData) {
  const { data, error } = await supabase
    .from("cabins")
    .insert([cabinData])
    .select();
  if (error) {
    throw new Error("Cabin Couldn't be Added");
  }
  return data;
}
export async function deleteCabins(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    throw new Error("Cabins Couldn't Deleted");
  }
  return data;
}
