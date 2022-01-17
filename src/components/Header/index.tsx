import { Button, Flex, Icon, Input, Text } from "@chakra-ui/react";
import axios from "axios";
import Router from "next/router";
import { destroyCookie } from "nookies";
import { Dispatch, SetStateAction } from "react";
import { AxiosResponseCoins, CriptoResponse } from "../../type/cripto";
import { SearchBox } from "../SearchBox";
import { AiOutlineLogout } from "react-icons/ai";

interface HeaderProps {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  setCripto: Dispatch<SetStateAction<CriptoResponse[]>>;
}

export function Header({
  page,
  setPage,
  search,
  setSearch,
  setCripto,
}: HeaderProps) {
  function handleLogOut() {
    destroyCookie(null, "cripto.auth");

    Router.push("/login");
  }

  async function handleNextPage() {
    setCripto([]);

    const { data } = await axios.get<AxiosResponseCoins>(
      `${process.env.NEXT_PUBLIC_URL_BACKEND}/coin/filter/front`,
      {
        params: { start: page - 1 },
      }
    );

    const criptoFilter = data.filter
      .splice(0, 100)
      .filter((element) => element.history.length > 0);

    setCripto(criptoFilter);
  }

  return (
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
        <Text mr="10px" ml="10px">
          Logout
        </Text>
        <Icon as={AiOutlineLogout} mr="5px" />
      </Button>
    </Flex>
  );
}
