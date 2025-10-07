import { useState } from "react";
import { isFuture, isPast, isToday } from "date-fns";
import supabase from "../services/supabase";
import Button from "../ui/Button";
import { subtractDates } from "../utils/helpers";

import { bookings } from "./data-bookings";
import { cabins } from "./data-cabins";
import { guests } from "./data-guests";

// ===============================
// DELETE FUNCTIONS
// ===============================
async function deleteGuests() {
  const { error } = await supabase.from("guests").delete().gt("id", 0);
  if (error) console.log(error.message);
}

async function deleteCabins() {
  const { error } = await supabase.from("cabins").delete().gt("id", 0);
  if (error) console.log(error.message);
}

async function deleteBookings() {
  const { error } = await supabase.from("bookings").delete().gt("id", 0);
  if (error) console.log(error.message);
}

// ===============================
// CREATE FUNCTIONS
// ===============================
async function createGuests() {
  const fixedGuests = guests.map((g) => ({
    full_name: g.fullName,
    email: g.email,
    nationality: g.nationality,
    "national-id": g.nationalID,
    "country-flag": g.countryFlag,
  }));

  const { error } = await supabase.from("guests").insert(fixedGuests);
  if (error) console.log(error.message);
}

async function createCabins() {
  const fixedCabins = cabins.map((c) => ({
    name: c.name,
    "max-capacity": c.maxCapacity,
    "regular-price": c.regularPrice,
    discount: c.discount,
    description: c.description,
    image: c.image,
  }));

  const { error } = await supabase.from("cabins").insert(fixedCabins);
  if (error) console.log(error.message);
}

async function createBookings() {
  // get guest & cabin IDs
  const { data: guestsIds } = await supabase
    .from("guests")
    .select("id")
    .order("id");
  const allGuestIds = guestsIds.map((g) => g.id);

  const { data: cabinsIds } = await supabase
    .from("cabins")
    .select("id")
    .order("id");
  const allCabinIds = cabinsIds.map((c) => c.id);

  const finalBookings = bookings.map((b) => {
    const cabin = cabins.at(b.cabinId - 1);
    const numNights = subtractDates(b.endDate, b.startDate);
    const cabinPrice = numNights * (cabin["regularPrice"] - cabin.discount);
    const extrasPrice = b.hasBreakfast ? numNights * 15 * b.numGuests : 0;
    const totalPrice = cabinPrice + extrasPrice;

    let status;
    if (isPast(new Date(b.endDate)) && !isToday(new Date(b.endDate)))
      status = "checked-out";
    if (isFuture(new Date(b.startDate)) || isToday(new Date(b.startDate)))
      status = "unconfirmed";
    if (
      (isFuture(new Date(b.endDate)) || isToday(new Date(b.endDate))) &&
      isPast(new Date(b.startDate)) &&
      !isToday(new Date(b.startDate))
    )
      status = "checked-in";

    return {
      "start-date": b.startDate,
      "end-date": b.endDate,
      "num-nights": numNights,
      "num-guests": b.numGuests,
      "cabin-price": cabinPrice,
      "extras-price": extrasPrice,
      "total-price": totalPrice,
      status,
      "has-breakfast": b.hasBreakfast,
      "is-paid": b.isPaid,
      observations: b.observations,
      guestsId: allGuestIds.at(b.guestId - 1),
      cabinId: allCabinIds.at(b.cabinId - 1),
    };
  });

  const { error } = await supabase.from("bookings").insert(finalBookings);
  if (error) console.log(error.message);
}

// ===============================
// COMPONENT
// ===============================
function Uploader() {
  const [isLoading, setIsLoading] = useState(false);

  async function uploadAll() {
    setIsLoading(true);
    // Delete existing data first (order matters)
    await deleteBookings();
    await deleteGuests();
    await deleteCabins();

    // Recreate data (order matters)
    await createGuests();
    await createCabins();
    await createBookings();

    setIsLoading(false);
  }

  async function uploadBookings() {
    setIsLoading(true);
    await deleteBookings();
    await createBookings();
    setIsLoading(false);
  }

  return (
    <div
      style={{
        marginTop: "auto",
        backgroundColor: "#e0e7ff",
        padding: "8px",
        borderRadius: "5px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      <h3>SAMPLE DATA</h3>

      <Button onClick={uploadAll} disabled={isLoading}>
        Upload ALL
      </Button>

      <Button onClick={uploadBookings} disabled={isLoading}>
        Upload bookings ONLY
      </Button>
    </div>
  );
}

export default Uploader;
