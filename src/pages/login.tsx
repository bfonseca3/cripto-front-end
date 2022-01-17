import { Button, Flex, FormControl, Input, Text } from "@chakra-ui/react";
import { FormEvent, useState } from "react";
import { parseCookies, setCookie } from "nookies";
import Router from "next/router";
import { GetServerSideProps } from "next";
import toast, { Toaster } from "react-hot-toast";

export default function Login() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (password == "bruno123" && login == "bruno") {
      setCookie(null, "cripto.auth", "ed73fcf3-20ce-4dbb-afe8-a6fe7a70bd54", {
        maxAge: 10800, // 3horas
        path: "/",
      });

      Router.push("/");
    } else {
      toast.error("Login or password invalid");
    }
  }

  return (
    <Flex w="100%" h="100vh" align="center" justify="center" bg="#FAFAFA">
      <Toaster />
      <Flex
        w="500px"
        h="400px"
        boxShadow={"0 0 10px #bbb"}
        textAlign={"center"}
        flexDir="column"
        py="80px"
        px="50px"
        borderRadius={"10px"}
      >
        <Text fontSize="32px">Login</Text>
        <FormControl as="form" onSubmit={handleSubmit}>
          <Input
            mb="20px"
            mt="20px"
            placeholder="Your username"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
          <Input
            type="password"
            mb="30px"
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" w="40%">
            Enter
          </Button>
        </FormControl>
      </Flex>
    </Flex>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookie = parseCookies(ctx);

  if (cookie["cripto.auth"]) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};
