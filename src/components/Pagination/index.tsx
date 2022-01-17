import { Flex, useColorModeValue } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import { PaginationItem } from "./PaginationItem";

interface PaginationProps {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}

export function Pagination({ page, setPage }: PaginationProps) {
  if (page == 1) {
    const perPage = page + 1;
    const perPage2 = perPage + 1;
    const perPage3 = perPage2 + 1;
    const pageMax1 = page + 10;

    return (
      <Flex p={50} w="full" alignItems="right" justifyContent="end">
        <Flex>
          <PaginationItem number={page} onPageChange={setPage} />
          <PaginationItem onPageChange={setPage} number={perPage2} />
          <PaginationItem onPageChange={setPage} number={perPage3} />
          <PaginationItem onPageChange={setPage} number={pageMax1} />
        </Flex>
      </Flex>
    );
  }

  return (
    <Flex p={50} w="full" alignItems="right" justifyContent="end">
      <Flex>
        <PaginationItem number={1} onPageChange={setPage} />
        <PaginationItem onPageChange={setPage} number={2} />
        <PaginationItem onPageChange={setPage} number={3} />
        <PaginationItem isCurrent number={page} onPageChange={setPage} />
        <PaginationItem onPageChange={setPage} number={5} />
        <PaginationItem onPageChange={setPage} number={6} />
        <PaginationItem onPageChange={setPage} number={7} />
      </Flex>
    </Flex>
  );
}
