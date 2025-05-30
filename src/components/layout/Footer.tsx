import { Suspense } from "react";
import FooterContent from "./FooterContent";

const Footer = () => {
  return (
    <footer>
      <Suspense fallback={<p></p>}>
        <FooterContent />
      </Suspense>
    </footer>
  );
};

export default Footer;
