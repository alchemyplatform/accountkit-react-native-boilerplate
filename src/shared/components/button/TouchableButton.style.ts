import { ExtendedTheme } from "@react-navigation/native";
import { StyleSheet, TextStyle, ViewStyle } from "react-native";

interface Style {
  actionContainer: ViewStyle;
  button: ViewStyle;
  text: TextStyle;
}

export default (theme: ExtendedTheme) => {
  const { colors } = theme;
  return StyleSheet.create<Style>({
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
      backgroundColor: colors.secondary,
    },
    text: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: "bold",
      letterSpacing: 0.25,
      color: colors.text,
    },
  });
};
