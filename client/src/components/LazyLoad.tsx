import { Spin } from "antd";
import { Suspense } from "react";

const LazyLoad = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense fallback={<Spin size="large" />} children={children}></Suspense>
  );
};

export default LazyLoad;
