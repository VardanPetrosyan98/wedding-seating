import { Alert, Spin } from "antd";
import { SeatingSection } from "./SeatingSection";
import { WelcomeSection } from "./WelcomeSection";
import { useSeating } from "../model/useSeating";
import { useWelcomeEffects } from "../model/useWelcomeEffects";

export const WeddingSeatingPage = ({ tables, isLoading, errorMessage }) => {
  const {
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
  } = useSeating({ tables });

  const { backgroundRef } = useWelcomeEffects({ enabled: !isSeatingVisible && !isLoading && !errorMessage });

  if (isLoading) {
    return (
      <main className="mx-auto flex min-h-screen w-full max-w-7xl items-center justify-center px-4 py-8 md:px-8">
        <Spin size="large" tip="Zagruzhaem rassadku..." />
      </main>
    );
  }

  if (errorMessage) {
    return (
      <main className="mx-auto flex min-h-screen w-full max-w-7xl items-center justify-center px-4 py-8 md:px-8">
        <Alert
          type="error"
          showIcon
          message="Ne udalos poluchit dannye"
          description={errorMessage}
          className="w-full max-w-xl"
        />
      </main>
    );
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-8 md:px-8">
      {!isSeatingVisible && (
        <div
          ref={backgroundRef}
          className="pointer-events-none fixed inset-0 overflow-hidden bg-gradient-to-b from-rose-50 via-rose-100/60 to-pink-100/50"
          aria-hidden="true"
        />
      )}

      {isSeatingVisible ? (
        <SeatingSection
          tables={tables}
          query={query}
          matches={matches}
          isSearchDropdownOpen={isSearchDropdownOpen}
          searchMessage={searchMessage}
          selectedTable={selectedTable}
          selectedTableId={selectedTableId}
          selectedGuestName={selectedGuestName}
          highlightedTableId={highlightedTableId}
          onQueryChange={handleQueryChange}
          onSelectGuest={handleSelectGuest}
          onSelectTable={handleSelectTable}
          onSearchFocus={handleSearchFocus}
          onSearchBlur={handleSearchBlur}
        />
      ) : (
        <WelcomeSection onShowSeating={handleShowSeating} />
      )}
    </main>
  );
};
