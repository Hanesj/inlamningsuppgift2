import {
  createPublicClient,
  createWalletClient,
  http,
  formatEther,
} from "https://esm.sh/viem";
import { localhost } from "https://esm.sh/viem/chains";

export const createClient = () => {
  return createPublicClient({
    chain: localhost,
    transport: http("http://localhost:7545"),
  });
};

export const createWallet = () => {
  return createWalletClient({
    chain: localhost,
    transport: http("http://localhost:7545"),
  });
};

export const convEth = (value) => {
  return parseFloat(formatEther(value)).toFixed(2);
};
