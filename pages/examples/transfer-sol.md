# How to transfer SOL in web3.js?

> You can verify this function working in production inside /examples folder on [GitHub](https://github.com/PangoDevs/solana-starter)

```typescript
async function transferSol(solAmout: number) {
  await window.solana.connect(); // calling Phantom extension
  const buyerWallet = await window.solana // getting pbKey of buyer
  let connection = new Connection(config.clusterURL) // getting cluster connection (devnet, testnet and mainnet)
  let configSolVault = new PublicKey(config.solVault) // pbKey of Vault (who recive SOL)
  let transferSolIx = web3.SystemProgram.transfer({ // Instruction to transfer, need:
    fromPubkey: buyerWallet.publicKey, // Who pay for SOL
    lamports: web3.LAMPORTS_PER_SOL * solAmout, // Amount of SOL
    toPubkey: configSolVault, // Who recive SOL
  })

  let transferSolTx = new Transaction() // Create new Transaction instruction
  transferSolTx.add(transferSolIx) // Adding to Transaction the transfer (transferSolIx)

  let recentBlockhash = await connection.getRecentBlockhash() // Getting the blockHash
  transferSolTx.recentBlockhash = recentBlockhash.blockhash // Adding the Blockhash to Transaction

  transferSolTx.feePayer = buyerWallet.publicKey // Who will pay for Fee of transaction

  let signedTx = await buyerWallet.signTransaction(transferSolTx) // Sign the transaction
  let idTx = await connection.sendRawTransaction(signedTx.serialize()) // Serialize the transaction
  await connection.confirmTransaction(idTx) // Confirm transaction
}
```