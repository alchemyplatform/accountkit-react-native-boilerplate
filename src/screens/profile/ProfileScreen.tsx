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
          contentContainerStyle={[
            styles.contentContainer,
            { flexGrow: 1, justifyContent: "center" },
          ]}
          keyboardShouldPersistTaps="handled"
        >
          <Card>
            <Card.Title style={{ marginVertical: 24 }}>Account Info</Card.Title>
            <View style={styles.infoContainer}>
              {magicAuth!.email && (
                <View style={styles.row}>
                  <Text style={styles.bold}>Email:</Text>
                  <Text>{magicAuth!.email}</Text>
                </View>
              )}
              {magicAuth!.phoneNumber && (
                <View style={styles.row}>
                  <Text style={styles.bold}>Phone Number:</Text>
                  <Text>{magicAuth!.phoneNumber}</Text>
                </View>
              )}
              {magicAuth!.oAuthRedirectResult && (
                <View style={styles.row}>
                  <Text style={styles.bold}>Provider:</Text>
                  <Text>{magicAuth!.oAuthRedirectResult.oauth.provider}</Text>
                </View>
              )}
              <View style={styles.column}>
                <Text style={styles.bold}>Owner Address:</Text>
                <Text>{magicAuth!.address}</Text>
              </View>
              {scaAddress && (
                <View style={styles.column}>
                  <Text style={styles.bold}>Wallet Address:</Text>
                  <Text>{scaAddress}</Text>
                </View>
              )}
              {magicAuth!.did && (
                <View style={styles.column}>
                  <Text style={styles.bold}>DID:</Text>
                  <Text>{magicAuth!.did}</Text>
                </View>
              )}
            </View>
            <View style={[styles.margin10, { marginVertical: 24 }]}>
              <TouchableButton handler={() => logout()} title="Logout" />
            </View>
          </Card>
        </ScrollView>
      </GestureHandlerRootView>
    </View>
  );
};

export default ProfileScreen;
