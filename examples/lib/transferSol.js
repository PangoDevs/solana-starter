import {
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  Transaction,
  clusterApiUrl,
} from "@solana/web3.js";
import * as web3 from "@solana/web3.js";
import { useToast } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import destinationWallet from "../lib/destinationWallet";

export const donateAmount = 0.05;
export const DonateSol = () => {
  const toast = useToast();
  const onDonate = async (amountValue) => {
    try {
      await window.solana.connect();
      const buyerWallet = await window.solana;
      const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
      const destination = new PublicKey(destinationWallet);
      const transferSolIx = web3.SystemProgram.transfer({
        fromPubkey: buyerWallet.publicKey,
        lamports: LAMPORTS_PER_SOL * amountValue,
        toPubkey: destination,
      });

      const transferSolTx = new Transaction();
      transferSolTx.add(transferSolIx);
      const recentBlockhash = await connection.getRecentBlockhash();
      transferSolTx.recentBlockhash = recentBlockhash.blockhash;
      transferSolTx.feePayer = buyerWallet.publicKey;
      const signedTx = await buyerWallet.signTransaction(transferSolTx);
      const idTx = await connection.sendRawTransaction(signedTx.serialize());
      await connection.confirmTransaction(idTx);
      toast({
        title: "Successfull Transaction",
        description: `Successfull transaction to ${buyerWallet.publicKey.toString()} pubkey`,
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (err) {
      console.log(err);
      toast({
        title: "Error",
        description: JSON.stringify(err),
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Button
        backgroundColor="white"
        borderWidth="1px"
        borderColor="gray.500"
        borderRadius="lg"
        mt="10px"
        mb="13px"
        size="md"
        onClick={() => onDonate(donateAmount)}
      >
        Donate 0.05 SOL
      </Button>
    </>
  );
};
