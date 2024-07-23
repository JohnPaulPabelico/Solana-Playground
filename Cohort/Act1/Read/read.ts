import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

const mainnetEndpoint = "https://api.mainnet-beta.solana.com"; // Mainnet endpoint
const devnetEndpoint = "https://api.devnet.solana.com"; // Devnet endpoint

async function getBalanceForWallet(wallet) {
  const mainnetConnection = new Connection(mainnetEndpoint, "confirmed");
  const devnetConnection = new Connection(devnetEndpoint, "confirmed");

  try {
    //Devnet
    const devnetBalanceInLamports = await devnetConnection.getBalance(wallet);
    const devnetBalanceInSOL = devnetBalanceInLamports / LAMPORTS_PER_SOL;

    //Mainnet
    const mainnetBalanceInLamports = await mainnetConnection.getBalance(wallet);
    const mainnetBalanceInSOL = mainnetBalanceInLamports / LAMPORTS_PER_SOL;

    console.log(
      `The balance for the wallet ${wallet} is ${devnetBalanceInSOL} SOL in devnet`
    );
    console.log(
      `The balance for the wallet ${wallet} is ${mainnetBalanceInSOL} SOL in mainnet`
    );
  } catch (error) {
    console.error(`Error fetching balance`);
  }
}

async function main() {
  const wallet = new PublicKey("9QZqqJfKRuoGKTaCgUvjQMMUNpaxhPC3fvn2y8iPZ4uU");

  await getBalanceForWallet(wallet);
}

main();
