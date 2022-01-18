import { Flex, Icon, Table, Text } from "@chakra-ui/react";
import axios from "axios";
import { GetServerSideProps } from "next";
import { ButtonFloating } from "../../components/ButtonFloating/ButtonFloating";
import { TablePageFilterBody } from "../../components/PageFilter/TablePageFilterBody";
import { TablePageFilter } from "../../components/PageFilter/TablePageFilterHeader";
import { CriptoResponse } from "../../type/cripto";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import Link from "next/link";
import { parseCookies } from "nookies";
import { FiDownload } from "react-icons/fi";
import { CSVLink } from "react-csv";
import { headers } from "../../csv/index";

export default function CoinEspecific({ coin }: { coin: CriptoResponse }) {
  const dataCSV = {
    headers: headers,
    data: coin.history,
    filename: `${coin.name}.csv`,
  };
  return (
    <Flex w="100%" justify="center" flexDir={"column"}>
      <Flex pt="30px" px="30px" pb="30px" justify="space-between">
        <Flex align="center">
          <Link passHref href="/">
            <Icon
              as={BsFillArrowLeftCircleFill}
              fontSize="30px"
              cursor={"pointer"}
            />
          </Link>
          <Text fontSize={"30px"} ml="30px">
            {coin.name}
          </Text>
        </Flex>
        <Flex>
          <CSVLink {...dataCSV}>
            <Icon as={FiDownload} fontSize={"30px"} />
          </CSVLink>
        </Flex>
      </Flex>
      {/* <ButtonFloating /> */}
      <Table variant="simple" size="sm">
        <TablePageFilter />
        <TablePageFilterBody history={coin.history} />
      </Table>
    </Flex>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id }: any = context.params;
  const cookie = parseCookies(context);

  if (!cookie["cripto.auth"]) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_URL_BACKEND}/coin/take/${id}`
  );
  return {
    props: { coin: data },
  };
};
