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
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { AxiosResponseCoins, CriptoResponse } from "../../type/cripto";
import {
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineLogout,
} from "react-icons/ai";
import { Toaster } from "react-hot-toast";
import { CSVDownload } from "react-csv";
import { FiDownload } from "react-icons/fi";
import { headersAll } from "../../csv";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";

interface HeaderProps {
  setPage: Dispatch<SetStateAction<number>>;
  page: number;
}

export function Header({ page, setPage }: HeaderProps) {
  const [progress, setProgress] = useState(false);
  const [allcoins, setAllcoins] = useState<CriptoResponse[]>([]);
  const [download, setDownload] = useState(false);

  const dataCSV = {
    headers: headersAll,
    data: allcoins,
  };

  function handleLogOut() {
    destroyCookie(null, "cripto.auth");
    Router.push("/login");
  }

  async function handlePrevPage() {
    if (page - 1 <= 0) {
      return;
    }
    setPage(page - 1);
  }

  async function handleNextPage() {
    setPage(page + 1);
  }

  async function handleDownload() {
    setProgress(true);

    if (allcoins.length > 0) {
      setDownload(true);

      setTimeout(() => {
        setDownload(false);
      }, 2000);

      return;
    }

    let number = 0;

    while (number < 36) {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_URL_BACKEND}/coin/take/all/?start=${number}`
      );
      setAllcoins((c) => [...c, ...data]);
      number++;
    }

    setDownload(true);
    setProgress(false);
  }

  function downloadNow() {
    setDownload(true);

    setTimeout(() => {
      setDownload(false);
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
        {download && <CSVDownload {...dataCSV} />}
        {progress && (
          <Button mr="20px" mt="4px" onClick={downloadNow}>
            Download Now
          </Button>
        )}
        {progress && (
          <Text fontSize="20px" mt="5px" mr="10px">
            {allcoins.length}
          </Text>
        )}
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
        <Flex mt="4px" ml="20px">
          <Icon
            as={AiOutlineArrowLeft}
            fontSize={30}
            cursor={"pointer"}
            onClick={handlePrevPage}
          />
          <Flex px="7px" fontSize="20px">
            {page}
          </Flex>
          <Icon
            as={AiOutlineArrowRight}
            fontSize={30}
            cursor="pointer"
            onClick={handleNextPage}
          />
        </Flex>
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
