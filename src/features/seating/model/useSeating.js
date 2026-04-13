import { useMemo, useState } from "react";
import { normalizeText } from "../../../shared/lib/normalizeText";

export const useSeating = ({ tables }) => {
  const [isSeatingVisible, setIsSeatingVisible] = useState(false);
  const [query, setQuery] = useState("");
  const [highlightedTableId, setHighlightedTableId] = useState(null);
  const [selectedTableId, setSelectedTableId] = useState(null);
  const [selectedGuestName, setSelectedGuestName] = useState("");
  const [isSearchDropdownOpen, setIsSearchDropdownOpen] = useState(false);

  const matches = useMemo(() => {
    const normalizedQuery = normalizeText(query);
    if (!normalizedQuery) {
      return [];
    }

    return tables.flatMap((table) =>
      table.guests
        .filter((guestName) => normalizeText(guestName).includes(normalizedQuery))
        .map((guestName) => ({
          tableId: table.id,
          tableLabel: table.label,
          guestName,
        })),
    );
  }, [query, tables]);

  const selectedTable = useMemo(
    () => tables.find((table) => table.id === selectedTableId) || null,
    [selectedTableId, tables],
  );

  const searchMessage = useMemo(() => {
    if (!query) {
      return "Vvedite imya gostya dlya poiska stolika";
    }

    if (!matches.length) {
      return "Gost ne nayden. Proverte napisanie imeni.";
    }

    if (highlightedTableId) {
      const table = tables.find((item) => item.id === highlightedTableId);
      return `${table?.label || "Stol"} podsvechen krasnym.`;
    }

    return `Naydeno sovpadeniy: ${matches.length}. Vyberite gostya iz spiska.`;
  }, [highlightedTableId, matches.length, query, tables]);

  const handleShowSeating = () => {
    setIsSeatingVisible(true);
  };

  const handleQueryChange = (nextQuery) => {
    setQuery(nextQuery);
    if (!nextQuery.trim()) {
      setHighlightedTableId(null);
      setSelectedGuestName("");
      setIsSearchDropdownOpen(false);
      return;
    }

    setIsSearchDropdownOpen(true);
  };

  const handleSelectGuest = (match) => {
    setHighlightedTableId(match.tableId);
    setSelectedTableId(match.tableId);
    setSelectedGuestName(match.guestName);
    setIsSearchDropdownOpen(false);
  };

  const handleSelectTable = (tableId) => {
    setSelectedTableId(tableId);
  };

  const handleSearchFocus = () => {
    if (query.trim() && matches.length > 0) {
      setIsSearchDropdownOpen(true);
    }
  };

  const handleSearchBlur = () => {
    setIsSearchDropdownOpen(false);
  };

  return {
    isSeatingVisible,
    query,
    matches,
    highlightedTableId,
    selectedTableId,
    isSearchDropdownOpen,
    selectedTable,
    selectedGuestName,
    searchMessage,
    handleShowSeating,
    handleQueryChange,
    handleSelectGuest,
    handleSelectTable,
    handleSearchFocus,
    handleSearchBlur,
  };
};
