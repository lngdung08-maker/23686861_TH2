import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {
  IDENTITY_LINE,
  VARIANT,
} from '@constants/student';
import {COLORS} from '@constants/theme';

export const Watermark = () => {
  return (
    <View
      pointerEvents="none"
      style={[
        styles.container,
        VARIANT.watermarkAtTop
          ? styles.top
          : styles.bottom,
      ]}>
      <Text style={styles.text}>
        {IDENTITY_LINE}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 10,
  },

  top: {
    top: 8,
  },

  bottom: {
    bottom: 8,
  },

  text: {
    fontSize: 10,
    color: COLORS.textLight,
    opacity: 0.75,
  },
});