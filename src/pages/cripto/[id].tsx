import { Flex, Icon, Table, Text } from "@chakra-ui/react";
import axios from "axios";
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import { ButtonFloating } from "../../components/ButtonFloating/ButtonFloating";
import { TablePageFilterBody } from "../../components/PageFilter/TablePageFilterBody";
import { TablePageFilter } from "../../components/PageFilter/TablePageFilterHeader";
import { CriptoResponse } from "../../type/cripto";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import Link from "next/link";
import { parseCookies } from "nookies";

export default function CoinEspecific({ coin }: { coin: CriptoResponse }) {
  console.log(coin);
  return (
    <Flex w="100%" justify="center" overflow={"scroll"} flexDir={"column"}>
      <Flex align="center" mt="30px" ml="30px">
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
      <ButtonFloating />
      <Table variant="simple" size="lg">
        <TablePageFilter />
        <TablePageFilterBody history={coin.history} />
      </Table>
    </Flex>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id }: any = context.params;
  const cookie = parseCookies(context);

  const { data } = await axios.get(`http://localhost:3000/coin/take/${id}`);

  if (!cookie["cripto.auth"]) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: { coin: data },
  };
};
