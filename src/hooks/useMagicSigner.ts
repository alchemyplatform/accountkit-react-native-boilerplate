import { WalletClientSigner, type SmartAccountSigner } from "@alchemy/aa-core";
import { OAuthExtension } from "@magic-ext/react-native-bare-oauth";
import { Magic } from "@magic-sdk/react-native-bare";
import { magicApiKey } from "shared/config/env";
import { WalletClient, createWalletClient, custom } from "viem";

export const useMagicSigner = () => {
  const magic = new Magic(magicApiKey, {
    extensions: [new OAuthExtension()],
  });

  const magicClient: WalletClient = createWalletClient({
    transport: custom(magic.rpcProvider),
  });

  const magicSigner: SmartAccountSigner = new WalletClientSigner(
    magicClient,
    "magic",
  );

  return { magic, signer: magicSigner };
};
