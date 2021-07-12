import React from "react";
import { View, StyleSheet, TextInput } from "react-native";


function AppTextInput({
  placeholder,
  width = "100%",
  iconType,
  iconSize = 30,
  ...otherProps
}) {
  return (
    <View style={[styles.container, { width }]}>
      <TextInput
        style={styles.text}
        placeholder={placeholder}
        {...otherProps}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 25,
    flexDirection: "row",
    padding: 15,
    marginVertical: 10,
    shadowColor: "#DCDCDC",
    shadowOffset: {
      width: 2,
      height: 3,
    },
    shadowOpacity: 1,
    shadowRadius: 3,
  },
  text: {
    fontSize: 18,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    marginLeft: 10,
    flex: 1,
  },
});

export default AppTextInput;
