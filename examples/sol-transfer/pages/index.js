import Head from "next/head";
import styles from "../styles/Home.module.css";
import { DonateSol } from "../lib/transferSol";
import { ChakraProvider } from "@chakra-ui/react";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Function to transfer Solana</title>
        <meta
          name="description"
          content="React app example with function to send Solana"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <ChakraProvider>
          <DonateSol />
        </ChakraProvider>
      </main>
    </div>
  );
}
