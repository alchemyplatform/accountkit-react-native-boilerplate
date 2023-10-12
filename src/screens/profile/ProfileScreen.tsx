import { useTheme } from "@react-navigation/native";
import { Card } from "@rneui/themed";
import React, { useMemo } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";

/**
 * ? Local Imports
 */
import { useMagicSigner } from "@hooks/useMagicSigner";
import createStyles from "./ProfileScreen.style";

interface ProfileScreenProps {}

const ProfileScreen: React.FC<ProfileScreenProps> = () => {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const {
    email,
    metaData,
    setEmail,
    phoneNumber,
    setPhoneNumber,
    magicGoogleSignIn,
    magicAppleSignIn,
    loginEmailOTP,
    isLoggedIn,
    smsLogin,
    logout,
    showMCUserInterface,
  } = useMagicSigner();

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
              onChangeText={(text) => setEmail(text)}
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
              onChangeText={(number) => setPhoneNumber(number)}
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
