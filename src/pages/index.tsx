/* eslint-disable react-hooks/exhaustive-deps */
import { Flex, Table } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AxiosResponseCoins, CriptoResponse } from "../type/cripto";
import { parseCookies } from "nookies";
import { TableComponentBody } from "../components/TableComponentBody";
import { TableComponentHeader } from "../components/TableComponentHeader/TableComponentHeader";
import { Progress } from "../components/Progress";
import { Header } from "../components/Header";
import Router from "next/router";
import { api } from "../services/apiClient";

export default function Home() {
  const [cripto, setCripto] = useState<CriptoResponse[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function Pagination() {
      setCripto([]);
      const { data } = await api.get<AxiosResponseCoins>(`/coin/filter/front`, {
        params: {
          start: page - 1,
        },
      });

      setCripto(data.filter);
    }
    Pagination();
  }, [page]);

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
      <Header page={page} setPage={setPage} />
      {/* <ButtonFloating /> */}

      <Table variant="simple" size="sm">
        <TableComponentHeader />
        <TableComponentBody cripto={cripto} />
      </Table>
    </Flex>
  );
}
