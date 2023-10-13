import { useTheme } from "@react-navigation/native";
import { Card } from "@rneui/themed";
import React, { useMemo } from "react";
import { Text, View } from "react-native";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";

/**
 * ? Local Imports
 */
import { useWalletContext } from "@context/wallet";
import { TouchableButton } from "@shared-components/button/TouchableButton";
import createStyles from "./ProfileScreen.style";
import Login from "./components/login/Login";

interface ProfileScreenProps {}

const ProfileScreen: React.FC<ProfileScreenProps> = () => {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const { magicAuth, scaAddress, logout } = useWalletContext();

  return (
    <View style={styles.container}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
          keyboardShouldPersistTaps="handled"
        >
          {/* Magic Auth Sign-in */}
          {magicAuth?.isLoggedIn ? (
            <Card>
              <Card.Title>My Info</Card.Title>
              <View style={styles.infoContainer}>
                {magicAuth.email && (
                  <View style={styles.row}>
                    <Text style={styles.bold}>Email:</Text>
                    <Text>{magicAuth.email}</Text>
                  </View>
                )}
                {magicAuth.phoneNumber && (
                  <View style={styles.row}>
                    <Text style={styles.bold}>Phone Number:</Text>
                    <Text>{magicAuth.phoneNumber}</Text>
                  </View>
                )}
                <View style={styles.column}>
                  <Text style={styles.bold}>Owner Address:</Text>
                  <Text>{magicAuth.address}</Text>
                </View>
                {scaAddress && (
                  <View style={styles.column}>
                    <Text style={styles.bold}>Wallet Address:</Text>
                    <Text>{scaAddress}</Text>
                  </View>
                )}
                {magicAuth.did && (
                  <View style={styles.column}>
                    <Text style={styles.bold}>DID:</Text>
                    <Text>{magicAuth.did}</Text>
                  </View>
                )}
              </View>
              <View style={styles.margin10}>
                <TouchableButton handler={() => logout()} title="Logout" />
              </View>
            </Card>
          ) : (
            <Login />
          )}
        </ScrollView>
      </GestureHandlerRootView>
    </View>
  );
};

export default ProfileScreen;
