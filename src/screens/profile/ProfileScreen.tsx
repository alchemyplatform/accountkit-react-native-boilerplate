import { useTheme } from "@react-navigation/native";
import { Card } from "@rneui/themed";
import React, { useEffect, useMemo, useState } from "react";
import { Alert, Pressable, Text, TextInput, View } from "react-native";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";

/**
 * ? Local Imports
 */
import { useMagicSigner } from "@hooks/useMagicSigner";
import { OAuthRedirectResult } from "@magic-ext/react-native-bare-oauth";
import { MagicUserMetadata } from "@magic-sdk/react-native-bare";
import eventEmitter from "@services/event-emitter";
import console from "console";
import createStyles from "./ProfileScreen.style";

interface ProfileScreenProps {}

const ProfileScreen: React.FC<ProfileScreenProps> = () => {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const [email, onChangeEmail] = useState<string | undefined>();
  const [phoneNumber, onChangePhoneNumber] = useState<string | undefined>();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [metaData, setMetaData] = useState<MagicUserMetadata | undefined>();
  const [oAuthRedirectResult, setOAuthRedirectResult] = useState<
    OAuthRedirectResult | undefined
  >();

  const { magic } = useMagicSigner();

  useEffect(() => {
    eventEmitter.addListener("account", () => {
      magic.user.getInfo().then((metadata) => {
        setMetaData(metadata);
      });
    });
    return () => {
      eventEmitter.removeAllListeners("account");
    };
  }, [magic.user]);

  useEffect(() => {
    magic.user.isLoggedIn().then((_isLoggedIn) => {
      setIsLoggedIn(_isLoggedIn);
      if (_isLoggedIn && metaData === undefined) {
        magic.user.getInfo().then((metadata) => {
          setMetaData(metadata);
        });
      }
    });
  }, [magic.user, oAuthRedirectResult, metaData]);

  /**
   *Google sign in
   * */
  const magicGoogleSignIn = async () => {
    const res = await magic.oauth.loginWithPopup({
      provider: "google",
      redirectURI: "accountkitboilerplate://",
    });
    setOAuthRedirectResult(res);
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
  };

  /**
   * email otp sign in
   * */
  const loginEmailOTP = async () => {
    try {
      await magic.auth.loginWithEmailOTP({ email: email! });
      const res = await magic.user.getInfo();
      setMetaData(res);
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
      eventEmitter.emit("account", DID);
    } catch (err) {
      console.error(err);
    }
  };

  /** Magic Connect w/ UI  */
  const showMCUserInterface = async () => {
    try {
      const account = await magic.wallet.connectWithUI();
      Alert.alert(`Your Public address is: ${account[0]}`);
      eventEmitter.emit("account", account[0]);
    } catch (err) {
      console.error(err);
    }
  };

  const logout = async () => {
    await magic.user.logout();
    setIsLoggedIn(false);
    setMetaData(undefined);
    setOAuthRedirectResult(undefined);
    onChangeEmail(undefined);
    onChangePhoneNumber(undefined);
  };

  const TouchableButton = (props: { handler: () => void; title: string }) => (
    <View style={styles.actionContainer}>
      <Pressable style={styles.button} onPress={() => props.handler()}>
        <Text style={styles.text}>{props.title}</Text>
      </Pressable>
    </View>
  );

  const LoginCard = (
    <View>
      {/* Email Login */}
      <Card>
        <Card.Title>Email OTP Login</Card.Title>
        <View style={styles.loginContainer}>
          <View style={styles.emailContainer}>
            <TextInput
              style={styles.TextInputContainer}
              onChangeText={(text) => onChangeEmail(text)}
              value={email}
              placeholder="Enter your email"
            />
          </View>
        </View>
        <View style={styles.margin10}>
          <TouchableButton handler={() => loginEmailOTP()} title="Login" />
        </View>
      </Card>
      {/* Magic Sign-in with SMS */}
      <Card>
        <Card.Title>Login with SMS</Card.Title>
        <View style={styles.loginContainer}>
          <View style={styles.emailContainer}>
            <TextInput
              placeholder="Enter your phone number"
              style={styles.TextInputContainer}
              onChangeText={(number) => onChangePhoneNumber(number)}
              value={phoneNumber}
            />
          </View>
        </View>
        <View style={styles.margin10}>
          <TouchableButton handler={() => smsLogin()} title="Login with SMS" />
        </View>
      </Card>
      {/* Google Sign in */}
      <Card>
        <Card.Title>Google Login</Card.Title>
        <TouchableButton handler={() => magicGoogleSignIn()} title="Login" />
      </Card>

      {/* Apple Sign in */}
      <Card>
        <Card.Title>Apple Login</Card.Title>
        <TouchableButton handler={() => magicAppleSignIn()} title="Login" />
      </Card>
      {/* Magic Connect Sign-in */}
      <Card>
        <Card.Title>Magic Connect</Card.Title>
        <TouchableButton
          handler={() => showMCUserInterface()}
          title="MC Login"
        />
      </Card>
    </View>
  );

  return (
    <View style={styles.container}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
          keyboardShouldPersistTaps="handled"
        >
          {/* Magic Auth Sign-in */}
          <Card>
            <Card.Title>Magic Auth</Card.Title>
            {isLoggedIn ? (
              <Card>
                <Card.Title>My Info</Card.Title>
                <View style={styles.infoContainer}>
                  {metaData?.email && (
                    <View style={styles.row}>
                      <Text style={styles.bold}>Email:</Text>
                      <Text>{metaData?.email}</Text>
                    </View>
                  )}
                  {metaData?.phoneNumber && (
                    <View style={styles.row}>
                      <Text style={styles.bold}>Phone Number:</Text>
                      <Text>{metaData?.phoneNumber}</Text>
                    </View>
                  )}
                  <View style={styles.column}>
                    <Text style={styles.bold}>Public Address:</Text>
                    <Text>{metaData?.publicAddress}</Text>
                  </View>
                </View>
                <View style={styles.margin10}>
                  <TouchableButton handler={() => logout()} title="Logout" />
                </View>
              </Card>
            ) : (
              LoginCard
            )}
          </Card>
        </ScrollView>
      </GestureHandlerRootView>
    </View>
  );
};

export default ProfileScreen;
