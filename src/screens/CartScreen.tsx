import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {COLORS} from '@constants/theme';

export const CartScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Giỏ hàng</Text>
      <Text>Đang xây dựng...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },

  title: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.text,
  },
});