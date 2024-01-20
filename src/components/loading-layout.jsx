import { Loader } from "@mantine/core";
import { DefaultLayout } from "./default-layout";

export default function LoadingLayout() {
  return (
    <DefaultLayout>
      <div
        style={{
          height: "100vh",
          width: "100vw",
          justifyContent: "center",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Loader />
      </div>
    </DefaultLayout>
  );
}
