/* eslint-disable react-hooks/exhaustive-deps */
import { Flex, Table } from "@chakra-ui/react";
import { GetStaticProps } from "next";
import axios from "axios";
import { useEffect, useState } from "react";
import { AxiosResponseCoins, CriptoResponse } from "../type/cripto";
import { parseCookies } from "nookies";
import { TableComponentBody } from "../components/TableComponentBody";
import { TableComponentHeader } from "../components/TableComponentHeader/TableComponentHeader";
import { Progress } from "../components/Progress";
import { Header } from "../components/Header";
import Router from "next/router";

interface HomeProps {
  criptoServerSide: AxiosResponseCoins;
}

export default function Home({ criptoServerSide }: HomeProps) {
  const [page, setPage] = useState<number>(1);
  const [cripto, setCripto] = useState<CriptoResponse[]>([]);
  const [search, setSearch] = useState("");
  const [criptoPure, setCriptoPure] = useState<CriptoResponse[]>([]);
  const [allCoinsForSearch, setAllCoinsForSearch] = useState<CriptoResponse[]>(
    []
  );

  useEffect(() => {
    (async () => {
      // const criptoFilter = criptoServerSide.filter.filter(
      //   (element) => element?.history?.length > 0
      // );

      setCripto(criptoServerSide.filter);
      setCriptoPure(criptoServerSide.filter);
    })();
  }, []);

  // Redirect
  useEffect(() => {
    const cookie = parseCookies();

    if (!cookie["cripto.auth"]) {
      Router.push("/login");
    }
  }, []);
  if (cripto.length == 0) {
    return <Progress />;
  }

  return (
    <Flex w="100%" justify="center" flexDir={"column"}>
      <Header page={page} setCripto={setCripto} setPage={setPage} />
      {/* <ButtonFloating /> */}

      <Table variant="simple" size="sm">
        <TableComponentHeader />
        <TableComponentBody cripto={cripto} />
      </Table>
    </Flex>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { data: criptoServerSide } = await axios.get<AxiosResponseCoins>(
    `${process.env.NEXT_PUBLIC_URL_BACKEND}/coin/filter/front`,
    { params: { start: 0 } }
  );

  return {
    props: { criptoServerSide },
    revalidate: 60 * 10,
  };
};
