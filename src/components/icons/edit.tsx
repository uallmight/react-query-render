import React, {SVGProps} from "react";

export type EditSvgProps = Pick<SVGProps<SVGSVGElement>, "onClick">;
const EditSvg = ({onClick}: EditSvgProps) => (
  <svg
    onClick={onClick}
    role="button"
    width="20px"
    height="20px"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14.846 1.403l3.752 3.753.625-.626A2.653 2.653 0 0015.471.778l-.625.625zm2.029 5.472l-3.752-3.753L1.218 15.028 0 19.998l4.97-1.217L16.875 6.875z"
      fill="#5C5F62"
    />
  </svg>
);

export default EditSvg;
