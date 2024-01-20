import { notifications } from "@mantine/notifications";
import React from "react";

export default function useGetData(api) {
  const [data, setData] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    async function exec() {
      try {
        setIsLoading(true);
        const result = await api();
        setData(result);
      } catch (e) {
        notifications.show({
          color: "red",
          title: "error",
          message: e.message,
        });
      } finally {
        setIsLoading(false);
      }
    }
    exec();
  }, [api]);

  return {
    data,
    isLoading,
  };
}
