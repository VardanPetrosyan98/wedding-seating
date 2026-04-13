import { ConfigProvider } from "antd";

export const AntdProvider = ({ children }) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#f43f5e",
          borderRadius: 12,
          fontFamily: "Inter, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};
