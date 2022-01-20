import { Icon, Td, Text } from "@chakra-ui/react";
import { ReactNode } from "react";
import { TiArrowDownThick, TiArrowUpThick } from "react-icons/ti";

interface TdProps {
  element?: string | number;
  isNumber?: boolean;
  isValue?: boolean;
  isPrice?: boolean;
  width?: number;
  children?: ReactNode;
}

export function TdComponent({
  element,
  isNumber = false,
  isValue = false,
  width = 200,
  children,
  isPrice = false,
}: TdProps) {
  if (isNumber) {
    return (
      <Td
        border="1px solid #ddd"
        d="flex"
        w={`${width}px`}
        fontSize=".8rem"
        p=".5rem"
      >
        {element}
      </Td>
    );
  }

  if (isValue) {
    return (
      <Td
        border="1px solid #ddd"
        d="flex"
        w={`${width}px`}
        fontSize=".8rem"
        p=".5rem"
        color={String(element).includes("-") ? "red" : "green"}
      >
        <Text d="inline-block">
          <Icon
            as={
              String(element).includes("-") ? TiArrowDownThick : TiArrowUpThick
            }
            d="inline"
          />
          {String(element).replace("-", "")}%
        </Text>
      </Td>
    );
  }
  if (children) {
    return (
      <Td
        border="1px solid #ddd"
        d="flex"
        w={`${width}px`}
        fontSize=".8rem"
        p=".5rem"
      >
        {children}
      </Td>
    );
  }

  if (isPrice) {
    return (
      <Td
        border="1px solid #ddd"
        d="flex"
        w={`${width}px`}
        fontSize=".8rem"
        p=".5rem"
        overflow={"hidden"}
      >
        ${Number(element).toFixed(10)}
      </Td>
    );
  }

  return <h1>false</h1>;
}
