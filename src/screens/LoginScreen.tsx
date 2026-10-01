import React, {useState} from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {useAuthStore} from '@stores/authStore';
import {
  EXAM_STAMP,
  FULL_NAME,
  IDENTITY_LINE,
  MSSV,
  PROJECT_TOKEN,
  VARIANT,
} from '@constants/student';
import {
  COLORS,
  RADIUS,
  SPACING,
  TYPOGRAPHY,
} from '@constants/theme';

export const LoginScreen = () => {
  const login = useAuthStore(state => state.login);

  const insets = useSafeAreaInsets();

  const [value, setValue] = useState('');

  const handleLogin = () => {
    if (!value.trim()) {
      Alert.alert(
        'Chưa nhập thông tin',
        'Vui lòng nhập số điện thoại.',
      );
      return;
    }

    login(PROJECT_TOKEN);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={
        Platform.OS === 'ios'
          ? 'padding'
          : undefined
      }>
      <View
        style={[
          styles.content,
          {
            paddingTop: insets.top + SPACING.xl,
            paddingBottom: insets.bottom + SPACING.xl,
          },
        ]}>

        <View style={styles.brand}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>K</Text>
          </View>

          <Text style={styles.brandName}>
            KTXGo
          </Text>

          <Text style={styles.tagline}>
            Mua sắm tiện lợi ngay tại ký túc xá
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.welcome}>
            Chào mừng em 👋
          </Text>

          <Text style={styles.description}>
            Đăng nhập để đặt món và giao tận phòng.
          </Text>

          <Text style={styles.label}>
            Số điện thoại
          </Text>

          <TextInput
            value={value}
            onChangeText={setValue}
            style={styles.input}
            placeholder="Nhập số điện thoại"
            placeholderTextColor={COLORS.textLight}
            keyboardType="phone-pad"
            autoCapitalize="none"
            returnKeyType="done"
            onSubmitEditing={handleLogin}
          />

          <Pressable
            style={({pressed}) => [
              styles.button,
              pressed && styles.buttonPressed,
            ]}
            onPress={handleLogin}>
            <Text style={styles.buttonText}>
              Vào cửa hàng
            </Text>
          </Pressable>
        </View>

        <View style={styles.footer}>
          <Text style={styles.studentName}>
            {FULL_NAME}
          </Text>

          <Text style={styles.studentInfo}>
            MSSV: {MSSV} · #{EXAM_STAMP}
          </Text>

          <Text style={styles.identity}>
            {IDENTITY_LINE}
          </Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: SPACING.xl,
  },

  brand: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },

  logo: {
    width: 72,
    height: 72,
    borderRadius: 22,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },

  logoText: {
    color: COLORS.surface,
    fontSize: 34,
    fontWeight: '800',
  },

  brandName: {
    fontSize: 32,
    fontWeight: '800',
    color: COLORS.text,
  },

  tagline: {
    marginTop: SPACING.xs,
    fontSize: TYPOGRAPHY.small,
    color: COLORS.textLight,
    textAlign: 'center',
  },

  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.xl,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },

  welcome: {
    fontSize: TYPOGRAPHY.heading,
    fontWeight: '800',
    color: COLORS.text,
  },

  description: {
    marginTop: SPACING.xs,
    marginBottom: SPACING.xl,
    color: COLORS.textLight,
    fontSize: TYPOGRAPHY.small,
    lineHeight: 20,
  },

  label: {
    marginBottom: SPACING.sm,
    fontSize: TYPOGRAPHY.small,
    fontWeight: '700',
    color: COLORS.text,
  },

  input: {
    height: 52,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.md,
    color: COLORS.text,
    backgroundColor: COLORS.background,
    fontSize: TYPOGRAPHY.body,
  },

  button: {
    height: 52,
    marginTop: SPACING.lg,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonPressed: {
    opacity: 0.8,
  },

  buttonText: {
    color: COLORS.surface,
    fontSize: TYPOGRAPHY.body,
    fontWeight: '800',
  },

  footer: {
    alignItems: 'center',
    marginTop: SPACING.xl,
  },

  studentName: {
    fontSize: TYPOGRAPHY.small,
    fontWeight: '700',
    color: COLORS.text,
  },

  studentInfo: {
    marginTop: SPACING.xs,
    fontSize: TYPOGRAPHY.caption,
    color: COLORS.textLight,
  },

  identity: {
    marginTop: SPACING.sm,
    fontSize: 9,
    color: COLORS.textLight,
    textAlign: 'center',
  },
});