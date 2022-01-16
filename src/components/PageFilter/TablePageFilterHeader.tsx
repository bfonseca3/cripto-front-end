import { Th, Thead, Tr } from "@chakra-ui/react";

export function TablePageFilter() {
  return (
    <Thead>
      <Tr>
        <Th>Last Updated</Th>
        <Th>Price</Th>
        <Th>Volume 24Hr</Th>
        <Th>Volume Change 24hr</Th>
        <Th>% Change 24hr</Th>
        <Th>% Change 1hr</Th>
        <Th>% Change 7d</Th>
        <Th>% Change 30d</Th>
        <Th>% Change 60d</Th>
        <Th>% Change 90d</Th>
        <Th>Market Cap</Th>
        <Th>Market Cap Dominance</Th>
        <Th>Circulating_supply</Th>
        <Th>Total Supply</Th>
        <Th>Max Supply</Th>
      </Tr>
    </Thead>
  );
}
