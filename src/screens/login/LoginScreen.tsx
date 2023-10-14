import { useTheme } from "@react-navigation/native";
import React, { useMemo } from "react";
import { TextInput, View } from "react-native";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";

import { useWalletContext } from "@context/wallet";

/**
 * ? Local Imports
 */
import { Card } from "@rneui/themed";
import { TouchableButton } from "@shared-components/button/TouchableButton";
import createStyles from "./LoginScreen.style";

interface LoginScreenProps {}

const LoginScreen: React.FC<LoginScreenProps> = () => {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const [email, setEmail] = React.useState<string>("");
  const [phoneNumber, setPhoneNumber] = React.useState<string>("");

  const { login } = useWalletContext();

  return (
    <View style={styles.container}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
          keyboardShouldPersistTaps="handled"
        >
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
              <TouchableButton
                handler={() => login("email", email)}
                title="Login"
              />
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
              <TouchableButton
                handler={() => login("sms", phoneNumber)}
                title="Login with SMS"
              />
            </View>
          </Card>
          {/* Google Sign in */}
          <Card>
            <Card.Title>Google Login</Card.Title>
            <TouchableButton handler={() => login("google")} title="Login" />
          </Card>

          {/* Apple Sign in */}
          <Card>
            <Card.Title>Apple Login</Card.Title>
            <TouchableButton handler={() => login("apple")} title="Login" />
          </Card>
          {/* Magic Connect Sign-in */}
          <Card>
            <Card.Title>Magic Connect</Card.Title>
            <TouchableButton handler={() => login("magic")} title="MC Login" />
          </Card>
        </ScrollView>
      </GestureHandlerRootView>
    </View>
  );
};

export default LoginScreen;
