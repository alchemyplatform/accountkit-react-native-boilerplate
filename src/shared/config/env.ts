import Config from "react-native-config";

import { getDefaultLightAccountFactory } from "@alchemy/aa-accounts";
import { sepolia } from "viem/chains";

export const entryPointAddress = "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789";
export const lightAccountFactoryAddress =
  getDefaultLightAccountFactory(sepolia);
export const chain = sepolia;
export const isDev = Config.NODE_ENV === "development";
export const magicApiKey = Config.MAGIC_API_KEY!;
export const gasManagerPolicyId = Config.ALCHEMY_GAS_MANAGER_POLICY_ID!;
export const alchemyRpcUrl = Config.ALCHEMY_RPC_URL;
