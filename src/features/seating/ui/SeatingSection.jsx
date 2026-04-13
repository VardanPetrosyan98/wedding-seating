import { useEffect, useRef } from "react";
import { Button, Card, Input, Typography } from "antd";
import {
  SearchOutlined,
  TeamOutlined,
  TableOutlined,
  CheckCircleOutlined,
  UserOutlined,
  QuestionOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

export const SeatingSection = ({
  tables,
  t,
  query,
  matches,
  isSearchDropdownOpen,
  searchMessage,
  selectedTable,
  selectedTableId,
  selectedGuestName,
  highlightedTableId,
  onQueryChange,
  onSelectGuest,
  onSelectTable,
  onSearchFocus,
  onSearchBlur,
}) => {
  const tableMapScrollContainerRef = useRef(null);
  const tableCardRefs = useRef({});

  useEffect(() => {
    const targetTableId = highlightedTableId || selectedTableId;
    if (!targetTableId) {
      return;
    }

    const targetTableCard = tableCardRefs.current[targetTableId];
    if (!targetTableCard) {
      return;
    }

    targetTableCard.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "nearest",
    });
  }, [highlightedTableId, selectedTableId]);

  return (
    <section className="w-full">
      <header className="flex flex-col gap-4 rounded-3xl bg-white p-6 shadow-lg md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-rose-400">
            {t.guestsSeating}
          </p>
          <Title level={2} className="!mb-0 !text-2xl !text-slate-900">
            <span className="inline-flex items-center gap-2">
              <SearchOutlined className="text-rose-500" />
              {t.findYourself}
            </span>
          </Title>
        </div>

        <div className="relative w-full max-w-md">
          {/* <label htmlFor="guestSearch" className="mb-2 block text-sm font-medium text-slate-700">
            Поиск по имени гостя
          </label> */}
          <Input
            id="guestSearch"
            value={query}
            placeholder={t.searchPlaceholder}
            onChange={(event) => onQueryChange(event.target.value)}
            onFocus={onSearchFocus}
            onBlur={onSearchBlur}
            className="!rounded-xl !border-rose-200 !bg-rose-50 !px-4 !py-3 !text-base focus:!border-rose-400"
            aria-label={t.searchAriaLabel}
            prefix={<SearchOutlined className="text-rose-400" />}
          />
          <p className="mt-2 min-h-6 text-sm text-slate-500">{searchMessage}</p>

          {matches.length > 0 && isSearchDropdownOpen && (
            <ul className="absolute left-0 right-0 z-20 mt-1 max-h-64 space-y-2 overflow-auto rounded-xl border border-rose-100 bg-white p-2 shadow-xl">
              {matches.map((match) => (
                <li key={`${match.tableId}-${match.guestName}`}>
                  <button
                    type="button"
                    aria-label={`${t.pickGuestAria} ${match.guestName}`}
                    className="w-full rounded-lg border border-rose-100 bg-white px-3 py-2 text-left text-sm transition hover:border-rose-300 hover:bg-rose-50 focus:outline-none focus:ring-2 focus:ring-rose-200"
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => onSelectGuest(match)}
                  >
                    {match.guestName} - {match.tableLabel}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </header>

      <div className="mt-6 grid gap-6 lg:grid-cols-[2fr_1fr]">
        <section className="rounded-3xl bg-white p-5 shadow-lg">
          <Title level={3} className="!mb-4 !text-lg !text-slate-900">
            <span className="inline-flex items-center gap-2">
              <TableOutlined className="text-rose-500" />
              {t.seatsMap}
            </span>
          </Title>
          <div
            ref={tableMapScrollContainerRef}
            className="max-h-[70vh] overflow-y-auto p-1"
          >
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {tables.map((table) => {
                const isHighlighted = highlightedTableId === table.id;
                const isSelectedTable = selectedTableId === table.id;
                return (
                  <div
                    key={table.id}
                    ref={(element) => {
                      tableCardRefs.current[table.id] = element;
                    }}
                  >
                    <Card
                      className={
                        isHighlighted
                          ? "!rounded-2xl !border-red-500 !bg-red-100 !shadow-sm ring-2 ring-red-300"
                          : "!rounded-2xl !border-rose-100 !bg-rose-50 !shadow-sm"
                      }
                      bodyStyle={{ padding: "16px" }}
                    >
                      <p className="text-base font-semibold text-slate-800">
                        {`${t.table} №${table.id}`}
                      </p>
                      <p className="mt-1 text-sm text-slate-500">
                        {t.guestsCount}: {table.guests.length}
                      </p>
                      <Button
                        type="primary"
                        shape="circle"
                        className={
                          selectedTableId === table.id
                            ? "!mt-4 !bg-[#1bcd79] hover:!bg-[#16ad66]"
                            : "!mt-4 !bg-rose-500 hover:!bg-rose-600"
                        }
                        aria-label={`${t.tableAriaLabel} ${table.label}`}
                        onClick={() => onSelectTable(table.id)}
                        icon={
                          selectedTableId === table.id ? (
                            <CheckCircleOutlined />
                          ) : (
                            <QuestionOutlined />
                          )
                        }
                      />
                    </Card>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
        <aside className="rounded-3xl bg-white p-5 shadow-lg">
          <Title level={3} className="!mb-0 !text-lg !text-slate-900">
            <span className="inline-flex items-center gap-2">
              <TeamOutlined className="text-rose-500" />
              {t.tableGuestsTitle}
            </span>
          </Title>
          <Text className="mt-2 block text-sm text-slate-500">
            {selectedTable
              ? `${t.table} ${selectedTable.label}: ${t.selectedTableGuests}`
              : t.selectTableHint}
          </Text>

          <ul className="mt-4 space-y-2">
            {selectedTable?.guests.map((guestName) => {
              const isSelectedGuest = selectedGuestName === guestName;
              return (
                <li
                  key={guestName}
                  className={
                    isSelectedGuest
                      ? "rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700 underline decoration-2 decoration-red-500 underline-offset-4"
                      : "rounded-lg border border-rose-100 bg-rose-50 px-3 py-2 text-sm"
                  }
                >
                  <UserOutlined className="mr-2 text-rose-500" />
                  {guestName}
                </li>
              );
            })}
          </ul>
        </aside>
      </div>
    </section>
  );
};
