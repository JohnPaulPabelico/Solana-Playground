import Image from "next/image";
import { Connection, Keypair } from "@solana/web3.js";
import { useState } from "react";
import bs58 from "bs58";

export default function Tools() {
  const keypair = Keypair.generate();

  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [secretKey, setSecretKey] = useState<string | null>(null);
  const [secretKeyB58, setSecretKeyB58] = useState<string | null>(null);

  const connection = new Connection("https://api.devnet.solana.com");

  const createWallet = () => {
    setPublicKey(keypair.publicKey.toBase58());
    setSecretKey(keypair.secretKey.toString());
    setSecretKeyB58(bs58.encode(keypair.secretKey));
  };

  const requestAirdrop = async () => {
    const feePayer = Keypair.fromSecretKey(bs58.decode(secretKeyB58));

    let txhash = await connection.requestAirdrop(feePayer.publicKey, 1e9);
    console.log(`txhash: ${txhash}`);
  };

  return (
    <main>
      <section>
        <div className="text-5xl mb-5">Solana Wallet Tools</div>
        <div>
          <button
            onClick={createWallet}
            className="p-2 bg-white text-black text-xl rounded-sm hover:bg-slate-300 transition-all ease-in-out duration-100"
          >
            Generate Keypair
          </button>
        </div>
        <div className="grid mt-5">
          <span>Public Key: {publicKey}</span>
          <span>Secret Key: {secretKey}</span>
          <span>Secret Key (Base58): {secretKeyB58}</span>
        </div>
        <button
          onClick={requestAirdrop}
          className="mt-4 p-2 bg-white text-black text-xl rounded-sm hover:bg-slate-300 transition-all ease-in-out duration-100"
        >
          Request Airdrop
        </button>
      </section>
    </main>
  );
}
