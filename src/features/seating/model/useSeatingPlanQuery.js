import { useEffect, useState } from "react";
import { fetchSeatingPlan } from "../../../shared/api/fetchSeatingPlan";

export const useSeatingPlanQuery = () => {
  const [tables, setTables] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let isMounted = true;

    const handleFetchSeatingPlan = async () => {
      try {
        setIsLoading(true);
        setErrorMessage("");
        const data = await fetchSeatingPlan();

        if (!isMounted) {
          return;
        }

        setTables(Array.isArray(data?.tables) ? data.tables : []);
      } catch (error) {
        if (!isMounted) {
          return;
        }

        setErrorMessage(error instanceof Error ? error.message : "Oshibka zagruzki dannyx");
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    handleFetchSeatingPlan();

    return () => {
      isMounted = false;
    };
  }, []);

  return { tables, isLoading, errorMessage };
};
