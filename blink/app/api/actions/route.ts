import {
  ACTIONS_CORS_HEADERS,
  ActionGetResponse,
  ActionPostRequest,
  ActionPostResponse,
  createPostResponse,
} from "@solana/actions";
import {
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
  clusterApiUrl,
} from "@solana/web3.js";

export const GET = async () => {
  const payload: ActionGetResponse = {
    title: "Gimme som moneh",
    icon: "https://i.imgur.com/NiTuE1J.jpeg",
    description: "Transfer SOL to another wallet",
    label: "Gib 1 SOL",
  };

  return Response.json(payload, {
    headers: ACTIONS_CORS_HEADERS,
  });
};

export const OPTIONS = GET;

export const POST = async (req: Request) => {
  const body: ActionPostRequest = await req.json();

  const fromPubkey = new PublicKey(body.account);
  const toPubkey = new PublicKey(
    "9QZqqJfKRuoGKTaCgUvjQMMUNpaxhPC3fvn2y8iPZ4uU"
  );

  const connection = new Connection(clusterApiUrl("devnet"));

  const transaction = new Transaction();
  transaction.feePayer = fromPubkey;

  transaction.add(
    SystemProgram.transfer({
      fromPubkey: fromPubkey,
      toPubkey: toPubkey,
      lamports: 1 * LAMPORTS_PER_SOL,
    })
  );

  transaction.recentBlockhash = (
    await connection.getLatestBlockhash()
  ).blockhash;

  const payload: ActionPostResponse = await createPostResponse({
    fields: {
      transaction: transaction,
      message: `Send 1 SOL`,
    },
  });
  return Response.json(payload, {
    headers: ACTIONS_CORS_HEADERS,
  });
};
