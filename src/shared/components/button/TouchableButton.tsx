import { useTheme } from "@react-navigation/native";
import * as React from "react";
import {
  Pressable,
  StyleProp,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import createStyles from "./Button.style";

export const TouchableButton = (props: {
  handler: () => void;
  title: string;
  containerStyle?: StyleProp<ViewStyle>;
  buttonsStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
}) => {
  const theme = useTheme();
  const styles = React.useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={[styles.actionContainer, props.containerStyle]}>
      <Pressable
        style={[
          styles.button,
          props.buttonsStyle,
          props.disabled ? { opacity: 0.5 } : {},
        ]}
        disabled={props.disabled}
        onPress={() => props.handler()}
      >
        <Text style={[styles.text, props.textStyle]}>{props.title}</Text>
      </Pressable>
    </View>
  );
};
