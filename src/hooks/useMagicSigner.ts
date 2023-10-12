import { WalletClientSigner, type SmartAccountSigner } from "@alchemy/aa-core";
import { OAuthExtension } from "@magic-ext/react-native-bare-oauth";
import { Magic } from "@magic-sdk/react-native-bare";
import { magicApiKey } from "shared/config/env";
import { MagicAuthType } from "types/magic";
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const login = async (type: MagicAuthType, ...params: any[]) => {
    switch (type) {
      case "google":
      case "apple":
        return magic.oauth.loginWithPopup({
          provider: type,
          redirectURI: "accountkitboilerplate://",
        });
      case "email":
        // returns did
        return magic.auth.loginWithEmailOTP({ email: params[0] });
      case "sms":
        // returns did
        return magic.auth.loginWithSMS({
          phoneNumber: params[0],
        });
      case "magic":
        // returns accounts
        return magic.wallet.connectWithUI();
    }
  };

  const logout = async () => magic.user.logout();

  return {
    magic,
    walletClient: magicClient,
    signer: magicSigner,
    login,
    logout,
  };
};
