import React from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {Product} from '@services/productApi';
import {PRICE_MULTIPLIER} from '@constants/student';
import {
  COLORS,
  RADIUS,
  SPACING,
  TYPOGRAPHY,
} from '@constants/theme';

interface Props {
  product: Product;
  onPress: () => void;
  onAdd: () => void;
}

export const ProductCard = ({
  product,
  onPress,
  onAdd,
}: Props) => {
  const price =
    Math.round(
      product.price * PRICE_MULTIPLIER,
    );

  return (
    <Pressable
      style={({pressed}) => [
        styles.card,
        pressed && styles.pressed,
      ]}
      onPress={onPress}>

      <View style={styles.imageBox}>
        <Image
          source={{uri: product.image}}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      <View style={styles.content}>
        <Text
          numberOfLines={2}
          style={styles.title}>
          {product.title}
        </Text>

        <Text style={styles.category}>
          {product.category}
        </Text>

        <View style={styles.bottom}>
          <View style={styles.priceBox}>
            <Text style={styles.price}>
              {price.toLocaleString('vi-VN')} đ
            </Text>
          </View>

          <Pressable
            hitSlop={8}
            style={styles.addButton}
            onPress={event => {
              event.stopPropagation();
              onAdd();
            }}>
            <Text style={styles.addText}>
              +
            </Text>
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: 0,
    marginHorizontal: SPACING.xs,
    marginBottom: SPACING.sm,
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.surface,
    overflow: 'hidden',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },

  pressed: {
    opacity: 0.88,
    transform: [{scale: 0.98}],
  },

  imageBox: {
    height: 150,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.md,
  },

  image: {
    width: '90%',
    height: '90%',
  },

  content: {
    padding: SPACING.md,
  },

  title: {
    minHeight: 40,
    fontSize: TYPOGRAPHY.small,
    lineHeight: 19,
    fontWeight: '700',
    color: COLORS.text,
  },

  category: {
    marginTop: 5,
    fontSize: 11,
    color: COLORS.textLight,
    textTransform: 'capitalize',
  },

  bottom: {
    marginTop: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  priceBox: {
    flex: 1,
  },

  price: {
    fontSize: TYPOGRAPHY.small,
    fontWeight: '900',
    color: COLORS.primary,
  },

  addButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },

  addText: {
    color: COLORS.surface,
    fontSize: 24,
    lineHeight: 27,
    fontWeight: '500',
  },
});