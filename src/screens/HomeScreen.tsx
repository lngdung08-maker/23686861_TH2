import React, {useMemo, useState} from 'react';
import {
  ActivityIndicator,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {useQuery} from '@tanstack/react-query';
import {FlashList} from '@shopify/flash-list';
import {
  useNavigation,
} from '@react-navigation/native';
import type {
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

import {
  getProducts,
  Product,
} from '@services/productApi';

import {
  DEBOUNCE_MS,
  IDENTITY_LINE,
  MSSV,
  ROOM_LABEL,
  STALE_TIME_MS,
} from '@constants/student';

import {
  COLORS,
  RADIUS,
  SPACING,
  TYPOGRAPHY,
} from '@constants/theme';

import {useDebouncedValue} from '@hooks/useDebouncedValue';
import {ProductCard} from '@components/ProductCard';
import {Watermark} from '@components/Watermark';

import type {
  ShopStackParamList,
} from '@navigation/ShopStack';

import {useCartStore} from '@stores/cartStore';

import HapticFeedback from 'react-native-haptic-feedback';

type NavigationProp =
  NativeStackNavigationProp<
    ShopStackParamList,
    'Home'
  >;

export const HomeScreen = () => {
  const navigation =
    useNavigation<NavigationProp>();

  const [search, setSearch] = useState('');

  const debouncedSearch =
    useDebouncedValue(
      search,
      DEBOUNCE_MS,
    );

  const addItem =
    useCartStore(state => state.addItem);

  const {data, isPending, isError, refetch, isRefetching} =
    useQuery({
      queryKey: ['products'],
      queryFn: getProducts,
      staleTime: STALE_TIME_MS,
    });

  const filteredProducts = useMemo(() => {
    const products = data ?? [];

    const keyword =
      debouncedSearch
        .trim()
        .toLowerCase();

    if (!keyword) {
      return products;
    }

    return products.filter(product =>
      product.title
        .toLowerCase()
        .includes(keyword),
    );
  }, [data, debouncedSearch]);

  const handleAdd = (product: Product) => {
    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
    });

    HapticFeedback.trigger(
      'selection',
      {
        enableVibrateFallback: true,
        ignoreAndroidSystemSettings: false,
      },
    );
  };

  const renderItem = ({
    item,
  }: {
    item: Product;
  }) => (
    <ProductCard
      product={item}
      onPress={() =>
        navigation.navigate('Detail', {
          id: String(item.id),
        })
      }
      onAdd={() => handleAdd(item)}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.headerText}>
            <Text style={styles.smallText}>
              KTXGO
            </Text>

            <Text style={styles.greeting}>
              Xin chào 👋
            </Text>

            <Text style={styles.delivery}>
              Giao tận {ROOM_LABEL}
            </Text>
          </View>

          <View style={styles.miniLogo}>
            <Text style={styles.miniLogoText}>
              K
            </Text>
          </View>
        </View>

        <View style={styles.searchBox}>
          <Text style={styles.searchIcon}>
            ⌕
          </Text>

          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Tìm món ăn, nước uống..."
            placeholderTextColor={
              COLORS.textLight
            }
            style={styles.searchInput}
            returnKeyType="search"
          />

          {search.length > 0 && (
            <Pressable
              onPress={() => setSearch('')}>
              <Text style={styles.clear}>
                ×
              </Text>
            </Pressable>
          )}
        </View>
      </View>

      <View style={styles.sectionHeader}>
        <View>
          <Text style={styles.sectionTitle}>
            Sản phẩm
          </Text>

          <Text style={styles.sectionSubtitle}>
            Mua nhanh · Giao tận phòng
          </Text>
        </View>

        {!isPending && !isError && (
          <Text style={styles.count}>
            {filteredProducts.length} món
          </Text>
        )}
      </View>

      {isPending ? (
        <View style={styles.state}>
          <ActivityIndicator
            size="large"
            color={COLORS.primary}
          />

          <Text style={styles.stateTitle}>
            Đang tải sản phẩm...
          </Text>

          <Text style={styles.stateText}>
            KTXGo đang kết nối cửa hàng
          </Text>
        </View>
      ) : isError ? (
        <View style={styles.state}>
          <View style={styles.errorIcon}>
            <Text style={styles.errorIconText}>
              !
            </Text>
          </View>

          <Text style={styles.stateTitle}>
            Không tải được sản phẩm
          </Text>

          <Text style={styles.stateText}>
            MSSV {MSSV} · Kiểm tra mạng rồi thử lại.
          </Text>

          <Pressable
            style={styles.retryButton}
            onPress={() => refetch()}>
            <Text style={styles.retryText}>
              Thử lại
            </Text>
          </Pressable>
        </View>
      ) : (
        <FlashList
          data={filteredProducts}
          renderItem={renderItem}
          numColumns={2}
          estimatedItemSize={300}
          keyExtractor={item =>
            `${MSSV}-${item.id}`
          }
          contentContainerStyle={
            styles.listContent
          }
          columnWrapperStyle={
            styles.column
          }
          refreshControl={
            <RefreshControl
              refreshing={isRefetching}
              onRefresh={refetch}
              tintColor={COLORS.primary}
            />
          }
          ListEmptyComponent={
            <View style={styles.empty}>
              <Text style={styles.emptyIcon}>
                🔎
              </Text>

              <Text style={styles.emptyTitle}>
                Không tìm thấy món
              </Text>

              <Text style={styles.emptyText}>
                Thử tìm với từ khóa khác nhé.
              </Text>
            </View>
          }
          showsVerticalScrollIndicator={false}
        />
      )}

      <Watermark />

      <Text style={styles.hiddenIdentity}>
        {IDENTITY_LINE}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  header: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.md,
  },

  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  headerText: {
    flex: 1,
  },

  smallText: {
    fontSize: TYPOGRAPHY.caption,
    fontWeight: '800',
    color: COLORS.primary,
    letterSpacing: 1,
  },

  greeting: {
    marginTop: 2,
    fontSize: 25,
    fontWeight: '800',
    color: COLORS.text,
  },

  delivery: {
    marginTop: 3,
    fontSize: TYPOGRAPHY.small,
    color: COLORS.textLight,
  },

  miniLogo: {
    width: 46,
    height: 46,
    borderRadius: 15,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },

  miniLogoText: {
    color: COLORS.surface,
    fontSize: 22,
    fontWeight: '900',
  },

  searchBox: {
    height: 50,
    marginTop: SPACING.lg,
    paddingHorizontal: SPACING.md,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    flexDirection: 'row',
    alignItems: 'center',
  },

  searchIcon: {
    fontSize: 25,
    color: COLORS.textLight,
    marginRight: SPACING.sm,
  },

  searchInput: {
    flex: 1,
    height: '100%',
    fontSize: TYPOGRAPHY.small,
    color: COLORS.text,
  },

  clear: {
    fontSize: 24,
    color: COLORS.textLight,
    paddingHorizontal: 4,
  },

  sectionHeader: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.sm,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },

  sectionTitle: {
    fontSize: TYPOGRAPHY.heading,
    fontWeight: '800',
    color: COLORS.text,
  },

  sectionSubtitle: {
    marginTop: 2,
    fontSize: TYPOGRAPHY.caption,
    color: COLORS.textLight,
  },

  count: {
    fontSize: TYPOGRAPHY.caption,
    fontWeight: '700',
    color: COLORS.primary,
  },

  listContent: {
    paddingHorizontal: SPACING.md,
    paddingBottom: 90,
  },

  column: {
    gap: SPACING.sm,
  },

  state: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
  },

  stateTitle: {
    marginTop: SPACING.md,
    fontSize: TYPOGRAPHY.body,
    fontWeight: '800',
    color: COLORS.text,
    textAlign: 'center',
  },

  stateText: {
    marginTop: SPACING.xs,
    fontSize: TYPOGRAPHY.small,
    color: COLORS.textLight,
    textAlign: 'center',
    lineHeight: 20,
  },

  errorIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FEE2E2',
    justifyContent: 'center',
    alignItems: 'center',
  },

  errorIconText: {
    color: COLORS.error,
    fontSize: 28,
    fontWeight: '900',
  },

  retryButton: {
    marginTop: SPACING.lg,
    paddingHorizontal: SPACING.xl,
    height: 44,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },

  retryText: {
    color: COLORS.surface,
    fontWeight: '800',
  },

  empty: {
    paddingTop: 80,
    alignItems: 'center',
  },

  emptyIcon: {
    fontSize: 40,
  },

  emptyTitle: {
    marginTop: SPACING.md,
    fontSize: TYPOGRAPHY.body,
    fontWeight: '800',
    color: COLORS.text,
  },

  emptyText: {
    marginTop: SPACING.xs,
    fontSize: TYPOGRAPHY.small,
    color: COLORS.textLight,
  },

  hiddenIdentity: {
    position: 'absolute',
    opacity: 0,
  },
});