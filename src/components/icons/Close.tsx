import { SVGProps } from 'react';

export default function Close(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M6 18 18 6M18 18 6 6"
        stroke="#303030"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );
}
