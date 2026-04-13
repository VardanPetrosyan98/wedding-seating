const seatingPlanUrl = "https://sheetdb.io/api/v1/m0x4v6zgo915i";

const guestKeyPattern = /^tables__guests__\d+$/;

const normalizeTableRow = (row, t) => {
  const guestKeys = Object.keys(row)
    .filter((key) => guestKeyPattern.test(key))
    .sort((leftKey, rightKey) => leftKey.localeCompare(rightKey));
  const guests = guestKeys
    .map((key) => row[key])
    .filter((guestName) => Boolean(guestName));

  return {
    id: Number(row.tables__id),
    label: `№${row.tables__id}`,
    guests,
  };
};

const normalizeSeatingPlan = (rawData, t) => {
  if (Array.isArray(rawData)) {
    const tables = rawData
      .map((row) => normalizeTableRow(row, t))
      .filter((table) => Number.isFinite(table.id));
    const eventIdFromRows = rawData.find((row) => row.eventId)?.eventId || "";
    return { eventId: eventIdFromRows, tables };
  }

  if (Array.isArray(rawData?.tables)) {
    return rawData;
  }

  return { eventId: "", tables: [] };
};

export const fetchSeatingPlan = async (t) => {
  const response = await fetch(seatingPlanUrl);

  if (!response.ok) {
    throw new Error("Ne udalos zagruzit dannye rassadki");
  }

  const rawData = await response.json();
  return normalizeSeatingPlan(rawData, t);
};
