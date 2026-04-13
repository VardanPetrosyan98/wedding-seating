import { WeddingSeatingPage } from "../features/seating/ui/WeddingSeatingPage";
import { useSeatingPlanQuery } from "../features/seating/model/useSeatingPlanQuery";
import { AntdProvider } from "./providers/AntdProvider";

export const App = () => {
  const { tables, isLoading, errorMessage } = useSeatingPlanQuery();

  return (
    <AntdProvider>
      <div className="h-screen overflow-hidden bg-rose-50 text-slate-800">
        <WeddingSeatingPage tables={tables} isLoading={isLoading} errorMessage={errorMessage} />
      </div>
    </AntdProvider>
  );
};
