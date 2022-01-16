/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Flex, Icon, Input, Table, Text } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import axios from "axios";
import { useEffect, useState } from "react";
import { AxiosResponseCoins, CriptoResponse } from "../type/cripto";
import { destroyCookie, parseCookies } from "nookies";
import { TableComponentBody } from "../components/TableComponentBody";
import { TableComponentHeader } from "../components/TableComponentHeader/TableComponentHeader";
import { ButtonFloating } from "../components/ButtonFloating/ButtonFloating";
import { Progress } from "../components/Progress";
import { AiOutlineLogout } from "react-icons/ai";
import Router from "next/router";
import { SearchBox } from "../components/SearchBox";

export default function Home() {
  const [page, setPage] = useState<number>(1);
  const [cripto, setCripto] = useState<CriptoResponse[]>([]);
  const [search, setSearch] = useState("");
  const [criptoPure, setCriptoPure] = useState<CriptoResponse[]>([]);

  async function handleNextPage() {
    setCripto([]);

    const { data } = await axios.get<AxiosResponseCoins>(
      "http://localhost:3000/coin/filter/front",
      {
        params: { start: page - 1 },
      }
    );

    const criptoFilter = data.filter
      .splice(0, 100)
      .filter((element) => element.history.length > 0);

    setCripto(criptoFilter);
  }

  function handleLogOut() {
    destroyCookie(null, "cripto.auth");

    Router.push("/login");
  }

  useEffect(() => {
    if (search == "") {
      setCripto(criptoPure);
      return;
    }
    const value = cripto.filter((element) => element.name.includes(search));
    if (value.length == 0) {
      setSearch("");
    }
    setCripto(value);
  }, [search]);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get<AxiosResponseCoins>(
        "http://localhost:3000/coin/filter/front",
        { params: { start: page - 1 } }
      );

      const criptoFilter = data.filter
        .splice(0, 100)
        .filter((element) => element.history.length > 0);

      setCripto(criptoFilter);
      setCriptoPure(criptoFilter);
    })();
  }, []);

  if (cripto.length == 0) {
    return <Progress />;
  }

  return (
    <Flex w="100%" justify="center" flexDir={"column"}>
      <Flex justify="space-between" w="full" px="30px" mt="20px" mb="20px">
        <Text fontSize={"40"}>CriptoLab</Text>
        <Flex w="full" alignItems={"right"} justify="end" mr="20px">
          <SearchBox search={search} setSearch={setSearch} />
          <Input
            value={page}
            onChange={(e) => setPage(Number(e.target.value))}
            w="80px"
            placeholder="Page"
          />
          <Button w="80px" ml="10px" onClick={handleNextPage}>
            Enter
          </Button>
        </Flex>
        <Button onClick={handleLogOut}>
          <Text mr="10px">Logout</Text>
          <Icon as={AiOutlineLogout} />
        </Button>
      </Flex>
      <ButtonFloating />
      {/* <Pagination page={page} setPage={setPage} pageMax /> */}

      <Table variant="simple" size="lg">
        <TableComponentHeader />
        <TableComponentBody cripto={cripto} />
      </Table>
    </Flex>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookie = parseCookies(ctx);

  if (!cookie["cripto.auth"]) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};
