import { Tbody, Tr, Link as LinkChakra, Td } from "@chakra-ui/react";
import Link from "next/link";
import { History } from "../../type/cripto";
import { formatDate, formatNumber, formatValores } from "../../utils/formatAll";

export function TablePageFilterBody({ history }: { history: History[] }) {
  return (
    <Tbody>
      {history.map((element, index) => {
        return (
          <Tr key={element.id}>
            <Td textAlign="center">{formatDate(element?.date)}</Td>
            <Td>{formatValores(element?.price)}</Td>
            <Td>{formatNumber(element?.valume_24h)}</Td>
            <Td color={element?.percent_change_24h >= 0 ? "green" : "red"}>
              {formatNumber(element?.volume_change_24h)}
            </Td>
            <Td color={element?.percent_change_24h >= 0 ? "green" : "red"}>
              {formatNumber(element?.percent_change_24h)}
            </Td>
            <Td color={element?.percent_change_1h >= 0 ? "green" : "red"}>
              {formatNumber(element?.percent_change_1h)}
            </Td>
            <Td color={element?.percent_change_7d >= 0 ? "green" : "red"}>
              {formatNumber(element?.percent_change_7d)}
            </Td>
            <Td color={element?.percent_change_30d >= 0 ? "green" : "red"}>
              {formatNumber(element?.percent_change_30d)}
            </Td>
            <Td color={element?.percent_change_60d >= 0 ? "green" : "red"}>
              {formatNumber(element?.percent_change_60d)}
            </Td>
            <Td color={element?.percent_change_90d >= 0 ? "green" : "red"}>
              {formatNumber(element?.percent_change_90d)}
            </Td>
            <Td>{formatValores(element?.market_cap)}</Td>
            <Td>{formatValores(element?.market_cap_dominance)}</Td>
            <Td>{formatNumber(element?.circulating_supply)}</Td>
            <Td>{formatNumber(element?.total_supply)}</Td>
            <Td>{formatNumber(element?.max_supply)}</Td>
          </Tr>
        );
      })}
    </Tbody>
  );
}
