import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import routers from "./routes";
import { ConfigProvider, App as AntdApp } from "antd"; // bold
import viVN from "antd/locale/vi_VN"; // Ngôn ngữ Tiếng Việt
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#cb3837",
          fontFamily: "Roboto, sans-serif",
        },
      }}
      locale={viVN} // Thiết lập ngôn ngữ Tiếng Việt
    >
      <AntdApp>
        <RouterProvider router={routers} />
      </AntdApp>
    </ConfigProvider>
  </StrictMode>
);
