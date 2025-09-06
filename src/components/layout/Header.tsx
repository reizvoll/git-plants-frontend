import HeaderContent from "@/components/layout/HeaderContent";
import { Suspense } from "react";

const Header = () => {
  return (
    <header>
      <Suspense fallback={<p></p>}>
        <HeaderContent />
      </Suspense>
    </header>
  );
};

export default Header;
