import { Suspense } from "react";
import HeaderContent from "./HeaderContent";

const Header = () => {
  return (
    <Suspense fallback={<div aria-hidden />}>
      <HeaderContent />
    </Suspense>
  );
};

export default Header;
