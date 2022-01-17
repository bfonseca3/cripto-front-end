import { Flex, Icon, Input } from "@chakra-ui/react";
import { RiSearch2Line } from "react-icons/ri";
import { Dispatch, SetStateAction } from "react";

interface SearchProps {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
}

export function SearchBox({ search, setSearch }: SearchProps) {
  return (
    <Flex
      as="label"
      flex="1"
      py="2"
      px="5"
      mr="6"
      maxW={400}
      alignSelf="center"
      bg="#f1f1f1f1"
      borderRadius="full"
      mt="-15px"
    >
      <Input
        color="black"
        variant="unstyled"
        placeholder="Buscar na plataforma"
        px="4"
        mr="4"
        _placeholder={{ color: "gray.400" }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Icon as={RiSearch2Line} fontSize="20" />
    </Flex>
  );
}
