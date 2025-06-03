import { SVGProps } from "react";

const Close = (props: SVGProps<SVGSVGElement>) => (
  <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    {/* 왼쪽 위에서 오른쪽 아래로 */}
    <rect x={5} y={5} width={3} height={3} fill="currentColor" />
    <rect x={8} y={8} width={3} height={3} fill="currentColor" />
    <rect x={11} y={11} width={3} height={3} fill="currentColor" />
    <rect x={14} y={14} width={3} height={3} fill="currentColor" />
    <rect x={17} y={17} width={3} height={3} fill="currentColor" />
    {/* 오른쪽 위에서 왼쪽 아래로 */}
    <rect x={17} y={5} width={3} height={3} fill="currentColor" />
    <rect x={14} y={8} width={3} height={3} fill="currentColor" />
    <rect x={11} y={11} width={3} height={3} fill="currentColor" />
    <rect x={8} y={14} width={3} height={3} fill="currentColor" />
    <rect x={5} y={17} width={3} height={3} fill="currentColor" />
  </svg>
);

export default Close;
