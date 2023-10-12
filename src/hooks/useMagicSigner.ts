import { WalletClientSigner, type SmartAccountSigner } from "@alchemy/aa-core";
import {
  OAuthExtension,
  OAuthRedirectResult,
} from "@magic-ext/react-native-bare-oauth";
import { Magic, MagicUserMetadata } from "@magic-sdk/react-native-bare";
import { useEffect, useState } from "react";
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
  const [address, setAddress] = useState<string | undefined>();
  const [did, setDid] = useState<string | null>();
  const [email, setEmail] = useState<string | undefined>();
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>();

  const [isLoggedIn, setIsLoggedIn] = useState<boolean | undefined>();
  const [metaData, setMetaData] = useState<MagicUserMetadata | undefined>();
  const [oAuthRedirectResult, setOAuthRedirectResult] = useState<
    OAuthRedirectResult | undefined
  >();

  useEffect(() => {
    magic.user.isLoggedIn().then((isLoggedIn) => {
      setIsLoggedIn(isLoggedIn);
    });
  }, [magic.user]);

  useEffect(() => {
    if (!isLoggedIn) return;
    magic.user.getInfo().then((metaData) => {
      setMetaData(metaData);
    });
  }, [magic.user, isLoggedIn]);

  /**
   *Google sign in
   * */
  const magicGoogleSignIn = async () => {
    const res = await magic.oauth.loginWithPopup({
      provider: "google",
      redirectURI: "accountkitboilerplate://",
    });
    setOAuthRedirectResult(res);
    setIsLoggedIn(true);
  };

  /**
   *Apple sign in
   * */
  const magicAppleSignIn = async () => {
    const res = await magic.oauth.loginWithPopup({
      provider: "apple",
      redirectURI: "accountkitboilerplate://",
    });
    setOAuthRedirectResult(res);
    setIsLoggedIn(true);
  };

  /**
   * email otp sign in
   * */
  const loginEmailOTP = async () => {
    try {
      await magic.auth.loginWithEmailOTP({ email: email! });
      setIsLoggedIn(true);
    } catch (err) {
      console.error(err);
    }
  };

  /**
   * sms sign in
   **/
  const smsLogin = async () => {
    try {
      const DID = await magic.auth.loginWithSMS({
        phoneNumber: phoneNumber!,
      });
      setDid(DID);
      setIsLoggedIn(true);
    } catch (err) {
      console.error(err);
    }
  };

  /** Magic Connect w/ UI  */
  const showMCUserInterface = async () => {
    try {
      const account = await magic.wallet.connectWithUI();
      setAddress(account[0]);
      setIsLoggedIn(true);
    } catch (err) {
      console.error(err);
    }
  };

  const logout = async () => {
    await magic.user.logout();
    setIsLoggedIn(false);
    setMetaData(undefined);
    setOAuthRedirectResult(undefined);
    setDid(undefined);
    setEmail(undefined);
    setAddress(undefined);
    setPhoneNumber(undefined);
  };

  return {
    magic,
    address,
    signer: magicSigner,
    isLoggedIn,
    did,
    email,
    phoneNumber,
    metaData,
    oAuthRedirectResult,
    magicGoogleSignIn,
    magicAppleSignIn,
    loginEmailOTP,
    smsLogin,
    showMCUserInterface,
    setEmail,
    setPhoneNumber,
    logout,
  };
};
