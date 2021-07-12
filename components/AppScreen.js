import React from "react";
import { StyleSheet, SafeAreaView, View } from "react-native";

function AppScreen({ children, style }) {
  return (
    <SafeAreaView style={[styles.screen, style]}>
      <View style={style}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#DCDCDC",
    paddingTop: 10,
    flex: 1,
  },
});

export default AppScreen;
