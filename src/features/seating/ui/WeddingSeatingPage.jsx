import { useEffect, useState } from "react";
import { Alert, Button, Segmented, Spin } from "antd";
import { SoundOutlined, AudioMutedOutlined } from "@ant-design/icons";
import { SeatingSection } from "./SeatingSection";
import { WelcomeSection } from "./WelcomeSection";
import { useSeating } from "../model/useSeating";
import { useWelcomeEffects } from "../model/useWelcomeEffects";
import { useI18n } from "../model/useI18n";
import { languages } from "../../../shared/config/i18n";
import restaurantImage from "../../../shared/assets/images/restaurant.png";
import churchImage from "../../../shared/assets/images/charch.svg";
export const WeddingSeatingPage = ({ tables, isLoading, errorMessage }) => {
  const [isMusicMuted, setIsMusicMuted] = useState(false);
  const [welcomeBackgroundImage, setWelcomeBackgroundImage] =
    useState(restaurantImage);
  const [backgroundSize, setBackgroundSize] = useState("90% 90%");
  const { language, t, handleLanguageChange } = useI18n();
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
  } = useSeating({ tables, t });

  const { backgroundRef } = useWelcomeEffects({
    enabled: !isSeatingVisible && !isLoading && !errorMessage,
    isMuted: isMusicMuted,
  });

  const handleToggleMusic = () => {
    setIsMusicMuted((currentValue) => !currentValue);
  };

  useEffect(() => {
    const handleBackgroundImageByViewport = () => {
      const isLandscape = window.innerWidth > window.innerHeight;
      setWelcomeBackgroundImage(isLandscape ? restaurantImage : churchImage);
      setBackgroundSize(isLandscape ? "90% 90%" : "cover");
    };

    handleBackgroundImageByViewport();
    window.addEventListener("resize", handleBackgroundImageByViewport);

    return () => {
      window.removeEventListener("resize", handleBackgroundImageByViewport);
    };
  }, []);

  const languageOptions = Object.entries(languages).map(([value, label]) => ({
    value,
    label,
  }));
  const localizedFontStyle =
    language === "hy"
      ? {
          fontFamily:
            '"Vrdznagir", Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        }
      : undefined;

  if (isLoading) {
    return (
      <main
        className="mx-auto flex h-[100dvh] w-full max-w-7xl items-center justify-center overflow-hidden px-4 py-4 md:px-8"
        style={localizedFontStyle}
      >
        <Spin size="large" tip={t.loading} />
      </main>
    );
  }

  if (errorMessage) {
    return (
      <main
        className="mx-auto flex h-[100dvh] w-full max-w-7xl items-center justify-center overflow-hidden px-4 py-4 md:px-8"
        style={localizedFontStyle}
      >
        <Alert
          type="error"
          showIcon
          message={t.loadingErrorTitle}
          description={errorMessage}
          className="w-full max-w-xl"
        />
      </main>
    );
  }

  return (
    <main
      className="mx-auto flex h-[100dvh] w-full max-w-7xl flex-col overflow-hidden px-4 py-4 md:px-8"
      style={localizedFontStyle}
    >
      <div className="fixed right-4 top-4 z-30 flex items-center gap-2 rounded-xl bg-white/95 p-2 shadow-lg backdrop-blur">
        {/* <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-600">
          <GlobalOutlined className="text-rose-500" />
          {t.languageLabel}
        </span> */}
        <Segmented
          size="small"
          value={language}
          options={languageOptions}
          onChange={handleLanguageChange}
        />
        <Button
          size="small"
          onClick={handleToggleMusic}
          icon={isMusicMuted ? <AudioMutedOutlined /> : <SoundOutlined />}
        >
          {/* {isMusicMuted ? t.musicOn : t.musicOff} */}
        </Button>
      </div>

      {!isSeatingVisible && (
        <>
          <div
            className="pointer-events-none fixed inset-y-0 left-0 w-[100vw] bg-cover bg-center opacity-30"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1400&q=80')",
            }}
            aria-hidden="true"
          />
          {/* <div
            className="pointer-events-none fixed inset-y-0 right-0 w-1/2 bg-cover bg-center opacity-25"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1400&q=80')",
            }}
            aria-hidden="true"
          /> */}
          <div
            style={{
              backgroundImage: `url(${welcomeBackgroundImage})`,
              backgroundSize: backgroundSize,
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
            ref={backgroundRef}
            className="pointer-events-none fixed inset-0 overflow-hidden bg-gradient-to-r from-white/80 via-rose-50/70 to-white/80"
            aria-hidden="true"
          />
        </>
      )}

      {isSeatingVisible ? (
        <SeatingSection
          tables={tables}
          t={t}
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
        <WelcomeSection onShowSeating={handleShowSeating} t={t} />
      )}
    </main>
  );
};
