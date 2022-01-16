import { Td } from "@chakra-ui/react";

interface TdProps {
  element: string | number;
  color?: boolean;
  align?: boolean;
}

export function TdComponent({
  element,
  color = false,
  align = false,
}: TdProps) {
  if (color) {
    return <Td color={Number(element) <= 0 ? "red" : "green"}>{element}</Td>;
  }

  return <Td textAlign={align ? "center" : "left"}>{element}</Td>;
}
