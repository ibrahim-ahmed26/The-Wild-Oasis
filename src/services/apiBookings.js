import { PAGE_SIZE } from "../utils/constrains";
import { getToday } from "../utils/helpers";
import supabase from "./supabase";

// ===============================
// GET ALL BOOKINGS (with guests & cabins)
// ===============================
export async function getBookings({ filter, sortBy, page }) {
  let query = supabase
    .from("bookings")
    .select("*, cabins:cabinId(name), guests:guestsId(full_name, email)", {
      count: "exact",
    });
  if (filter) query = query[filter.method || "eq"](filter.field, filter.value);
  if (sortBy)
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === "asc",
    });
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;
  if (page) query = query.range(from, to);
  const { data, error, count } = await query;
  if (error) {
    console.error(error);
    throw new Error("Bookings couldn't be loaded");
  }

  return { count, data };
}

// ===============================
// GET ONE BOOKING BY ID
// ===============================
export async function getBooking(id) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, cabins:cabinId(*), guests:guestsId(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking not found");
  }

  return data;
}

// ===============================
// BOOKINGS AFTER A SPECIFIC DATE
// ===============================
export async function getBookingsAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    .select("created_at, total-price, extras-price")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("Bookings could not be loaded");
  }

  return data;
}

// ===============================
// STAYS AFTER A SPECIFIC DATE
// ===============================
export async function getStaysAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests:guestsId(full_name)")
    .gte("start-date", date)
    .lte("start-date", getToday());

  if (error) {
    console.error(error);
    throw new Error("Bookings could not be loaded");
  }

  return data;
}

// ===============================
// TODAY'S CHECK-IN / CHECK-OUT ACTIVITY
// ===============================
export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests:guestsId(full_name, nationality, country_flag)")
    .or(
      `and(status.eq.unconfirmed,"start-date".eq.${getToday()}),and(status.eq.checked-in,"end-date".eq.${getToday()})`
    )
    .order("created_at");

  if (error) {
    console.error(error);
    throw new Error("Bookings could not be loaded");
  }

  return data;
}

// ===============================
// UPDATE A BOOKING
// ===============================
export async function updateBooking(id, obj) {
  const { data, error } = await supabase
    .from("bookings")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }

  return data;
}

// ===============================
// DELETE A BOOKING
// ===============================
export async function deleteBooking(id) {
  const { data, error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", id)
    .select();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }

  return { id, data };
}
