import { ExtendedTheme } from "@react-navigation/native";
import { StyleSheet, TextStyle, ViewStyle } from "react-native";

interface Style {
  container: ViewStyle;
  contentContainer: ViewStyle;
  actionContainer: ViewStyle;
  button: ViewStyle;
  text: TextStyle;
  loginContainer: ViewStyle;
  emailContainer: ViewStyle;
  TextInputContainer: TextStyle;
  margin10: ViewStyle;
}

export default (theme: ExtendedTheme) => {
  const { colors } = theme;
  return StyleSheet.create<Style>({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    contentContainer: {
      paddingTop: 30,
    },
    TextInputContainer: {
      borderColor: "black",
      borderWidth: 1,
      width: "80%",
      height: 30,
      paddingHorizontal: 10,
    },
    loginContainer: {
      alignItems: "flex-start",
      marginTop: 10,
      paddingHorizontal: 20,
    },
    emailContainer: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
    },
    actionContainer: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      alignSelf: "center",
    },
    button: {
      height: 35,
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 7,
      paddingHorizontal: 32,
      borderRadius: 4,
      elevation: 3,
      backgroundColor: "black",
    },
    text: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: "bold",
      letterSpacing: 0.25,
      color: "white",
    },
    margin10: {
      margin: 10,
    },
  });
};
