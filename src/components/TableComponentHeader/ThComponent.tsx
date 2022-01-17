import { Th } from "@chakra-ui/react";
import { ReactNode } from "react";

interface ThComponentsProps {
  width?: number;
  children: ReactNode;
}

export function ThComponents({ children, width = 200 }: ThComponentsProps) {
  return (
    <Th
      border="1px solid #999"
      d="flex"
      w={`${width}px`}
      fontSize=".8rem"
      p=".5rem"
    >
      {children}
    </Th>
  );
}
