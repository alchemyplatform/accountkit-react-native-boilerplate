import * as React from "react";
import { ImageSourcePropType, Pressable } from "react-native";
import { Image } from "@rneui/themed";

export const ImageButton = (props: {
  handler: () => void;
  source: ImageSourcePropType;
  width?: number;
  height?: number;
}) => {
  return (
    <Pressable onPress={() => props.handler()}>
      <Image
        source={props.source}
        style={{ width: props.width ?? 36, height: props.height ?? 36 }}
      />
    </Pressable>
  );
};
