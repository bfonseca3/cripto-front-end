import {
  Icon,
  Link as LinkChakra,
  Tbody,
  Td,
  Text,
  Tr,
} from "@chakra-ui/react";
import Link from "next/link";
import { memo } from "react";
import { CriptoResponse } from "../../type/cripto";
import { formatDate, formatNumber, formatValores } from "../../utils/formatAll";
import { TiArrowUpThick, TiArrowDownThick } from "react-icons/ti";
import { TdComponent } from "./TdComponent";

function TableComponentBodyComponent({ cripto }: { cripto: CriptoResponse[] }) {
  return (
    <Tbody>
      {cripto.map((element, index) => {
        return (
          <Tr key={element.id} display="flex">
            <TdComponent isNumber element={index + 1} width={70} />
            <TdComponent width={200}>
              <Link passHref href={`/cripto/${element.id_coin}`}>
                <LinkChakra>
                  {element.name} {`[${element.symbol}]`}
                </LinkChakra>
              </Link>
            </TdComponent>
            <TdComponent
              isNumber
              width={200}
              element={
                element.history.length > 0
                  ? formatDate(element.history[0]?.date)
                  : "No Exist"
              }
            />

            <TdComponent
              width={200}
              element={element.history[0]?.price}
              isPrice
            />
            <TdComponent
              width={200}
              isNumber
              element={formatNumber(element.history[0]?.valume_24h)}
            />
            <TdComponent
              element={formatNumber(element.history[0]?.volume_change_24h)}
              width={200}
              isNumber
            />
            <TdComponent
              isValue
              width={200}
              element={formatNumber(element.history[0]?.percent_change_24h)}
            />

            <TdComponent
              isValue
              width={200}
              element={formatNumber(element.history[0]?.percent_change_1h)}
            />
            <TdComponent
              isValue
              width={200}
              element={formatNumber(element.history[0]?.percent_change_7d)}
            />
            <TdComponent
              isValue
              width={200}
              element={formatNumber(element.history[0]?.percent_change_30d)}
            />
            <TdComponent
              isValue
              width={200}
              element={formatNumber(element.history[0]?.percent_change_60d)}
            />
            <TdComponent
              isValue
              width={200}
              element={formatNumber(element.history[0]?.percent_change_90d)}
            />

            <TdComponent
              width={200}
              element={element.history[0]?.market_cap}
              isPrice
            />
            <TdComponent
              width={200}
              element={element.history[0]?.market_cap_dominance}
              isPrice
            />
            <TdComponent
              isNumber
              element={formatNumber(element.history[0]?.circulating_supply)}
              width={200}
            />
            <TdComponent
              isNumber
              element={formatNumber(element.history[0]?.total_supply)}
              width={200}
            />
            <TdComponent
              isNumber
              element={formatNumber(element.history[0]?.max_supply)}
              width={200}
            />
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
