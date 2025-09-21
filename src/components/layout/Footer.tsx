import { Suspense } from "react";
import FooterContent from "./FooterContent";

const Footer = () => {
  return (
    <Suspense fallback={<div aria-hidden />}>
      <FooterContent />
    </Suspense>
  );
};

export default Footer;
