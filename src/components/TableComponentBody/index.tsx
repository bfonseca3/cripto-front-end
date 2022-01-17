import { Link as LinkChakra, Tbody, Td, Text, Tr } from "@chakra-ui/react";
import Link from "next/link";
import { memo } from "react";
import { CriptoResponse } from "../../type/cripto";
import { formatDate, formatNumber, formatValores } from "../../utils/formatAll";

function TableComponentBodyComponent({ cripto }: { cripto: CriptoResponse[] }) {
  return (
    <Tbody>
      {cripto.map((element, index) => {
        return (
          <Tr key={element.id}>
            <Td textAlign="center">
              <Link passHref href={`/cripto/${element.id_coin}`}>
                <LinkChakra>
                  {element.name} {`[${element.symbol}]`}
                </LinkChakra>
              </Link>
            </Td>
            <Td textAlign="center">
              {element.history.length > 0
                ? formatDate(element.history[0]?.date)
                : "No Exist"}
            </Td>
            <Td>{formatValores(element.history[0]?.price)}</Td>
            <Td>{formatNumber(element.history[0]?.valume_24h)}</Td>
            <Td
              color={
                element.history[0]?.percent_change_24h >= 0 ? "green" : "red"
              }
            >
              {formatNumber(element.history[0]?.volume_change_24h)}
            </Td>
            <Td
              color={
                element.history[0]?.percent_change_24h >= 0 ? "green" : "red"
              }
            >
              {formatNumber(element.history[0]?.percent_change_24h)}
            </Td>
            <Td
              color={
                element.history[0]?.percent_change_1h >= 0 ? "green" : "red"
              }
            >
              {formatNumber(element.history[0]?.percent_change_1h)}
            </Td>
            <Td
              color={
                element.history[0]?.percent_change_7d >= 0 ? "green" : "red"
              }
            >
              {formatNumber(element.history[0]?.percent_change_7d)}
            </Td>
            <Td
              color={
                element.history[0]?.percent_change_30d >= 0 ? "green" : "red"
              }
            >
              {formatNumber(element.history[0]?.percent_change_30d)}
            </Td>
            <Td
              color={
                element.history[0]?.percent_change_60d >= 0 ? "green" : "red"
              }
            >
              {formatNumber(element.history[0]?.percent_change_60d)}
            </Td>
            <Td
              color={
                element.history[0]?.percent_change_90d >= 0 ? "green" : "red"
              }
            >
              {formatNumber(element.history[0]?.percent_change_90d)}
            </Td>
            <Td>{formatValores(element.history[0]?.market_cap)}</Td>
            <Td>{formatValores(element.history[0]?.market_cap_dominance)}</Td>
            <Td>{formatNumber(element.history[0]?.circulating_supply)}</Td>
            <Td>{formatNumber(element.history[0]?.total_supply)}</Td>
            <Td>{formatNumber(element.history[0]?.max_supply)}</Td>
          </Tr>
        );
      })}
    </Tbody>
  );
}

export const TableComponentBody = memo(
  TableComponentBodyComponent,
  (prevProps, nextProps) => {
    return Object.is(prevProps.cripto, nextProps.cripto);
  }
);
