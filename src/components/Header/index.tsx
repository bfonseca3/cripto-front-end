import {
  Button,
  CircularProgress,
  Flex,
  Icon,
  Input,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import Router from "next/router";
import { destroyCookie } from "nookies";
import { Dispatch, SetStateAction, useState } from "react";
import { AxiosResponseCoins, CriptoResponse } from "../../type/cripto";
import { SearchBox } from "../SearchBox";
import { AiOutlineClose, AiOutlineLogout } from "react-icons/ai";
import toast, { Toaster } from "react-hot-toast";
import { CSVLink } from "react-csv";
import { FiDownload } from "react-icons/fi";

interface HeaderProps {
  // search: string;
  // setSearch: Dispatch<SetStateAction<string>>;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  setCripto: Dispatch<SetStateAction<CriptoResponse[]>>;
  // setAllCoinsForSearch: Dispatch<SetStateAction<CriptoResponse[]>>;
  // allCoinsForSearch: CriptoResponse[];
  // criptoPure: CriptoResponse[];
}

export function Header({ page, setPage, setCripto }: HeaderProps) {
  const [progress, setProgress] = useState(false);

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
    // const criptoFilter = data.filter.filter(
    //   (element) => element.history.length > 0
    // );

    setCripto(data.filter);
  }

  // async function handleSearch() {
  //   setProgress(true);
  //   let array: CriptoResponse[] = allCoinsForSearch;

  //   if (allCoinsForSearch.length == 0) {
  //     const { data } = await axios.get<CriptoResponse[]>(
  //       `${process.env.NEXT_PUBLIC_URL_BACKEND}/coin/take/all`
  //     );
  //     array = data;
  //   }
  //   const value = array.filter((element) => element.name.includes(search));

  //   if (value.length == 0) {
  //     console.log("entrou no value.length 0");
  //     toast.error("Coin not exist in this list");
  //     setSearch("");
  //     setProgress(false);
  //     return;
  //   }
  //   setCripto(value);
  //   setAllCoinsForSearch(array);
  //   console.log(allCoinsForSearch);
  //   setProgress(false);
  // }

  // function handleClickReset() {
  //   setProgress(true);
  //   setCripto(criptoPure);
  //   setSearch("");

  //   setTimeout(() => {
  //     setProgress(false);
  //   }, 3000);
  //   return;
  // }

  // function handlePress(event: any) {
  //   if (event.key === "Enter") {
  //     console.log("pegou");
  //     handleSearch();
  //   }
  // }

  async function handleDownload() {
    setProgress(true);

    // const { data } = await axios.get<CriptoResponse[]>(
    //   `${process.env.NEXT_PUBLIC_URL_BACKEND}/coin/take/all`
    // );
    alert("Essa feature, esta em processo de desenvolvimento");
    // console.log(data)

    setTimeout(() => {
      setProgress(false);
    }, 2000);
  }

  return (
    <Flex justify="space-between" w="full" px="30px" mt="20px" mb="20px">
      <Toaster />
      <Text fontSize={"40"}>CriptoLab</Text>
      <Flex
        w="full"
        alignItems={"right"}
        justify="end"
        mr="20px"
        align="center"
      >
        {/* <Flex>
          <CSVLink {...dataCSV}>
            <Icon as={FiDownload} fontSize={"30px"} />
          </CSVLink>
        </Flex> */}
        {/* <SearchBox
          search={search}
          setSearch={setSearch}
          handlePress={handlePress}
        /> */}
        {progress ? (
          <CircularProgress
            isIndeterminate
            color="blue.200"
            size={"2rem"}
            mt="4px"
            mr="4px"
          />
        ) : (
          <Icon
            as={FiDownload}
            fontSize={"30px"}
            borderRadius="10px"
            mt="6px"
            mr="10px"
            cursor="pointer"
            onClick={handleDownload}
          />
        )}

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
