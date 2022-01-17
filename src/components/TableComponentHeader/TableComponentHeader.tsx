import { Th, Thead, Tr } from "@chakra-ui/react";

export function TableComponentHeader() {
  return (
    <Thead>
      <Tr>
        <Th>Name</Th>
        <Th textAlign="center">Last Updated</Th>
        <Th>Price</Th>
        <Th>Volume 24Hr</Th>
        <Th textAlign="center">Volume Change 24hr</Th>
        <Th textAlign="center">% Change 24hr</Th>
        <Th textAlign="center">% Change 1hr</Th>
        <Th textAlign="center">% Change 7d</Th>
        <Th textAlign="center">% Change 30d</Th>
        <Th textAlign="center">% Change 60d</Th>
        <Th textAlign="center">% Change 90d</Th>
        <Th textAlign="center">Market Cap</Th>
        <Th textAlign="center">Market Cap Dominance</Th>
        <Th textAlign="center">Circulating_supply</Th>
        <Th textAlign="center">Total Supply</Th>
        <Th textAlign="center">Max Supply</Th>
      </Tr>
    </Thead>
  );
}
