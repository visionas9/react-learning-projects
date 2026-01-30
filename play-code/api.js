export async function getEquipments() {
  const res = await fetch("/api/equipments");
  if (!res.ok) {
    throw {
      message: "Failed to fetch equipments",
      statusText: res.statusText,
      status: res.status,
    };
  }
  const data = await res.json();
  return data.equipments;
}
