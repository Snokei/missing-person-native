import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface FeatureCardProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
  accent: string;
  accentBg: string;
  accentLight: string;
  onPress: () => void;
}

export default function FeatureCard({
  icon,
  title,
  description,
  accent,
  accentBg,
  accentLight,
  onPress,
}: FeatureCardProps) {
  return (
    <TouchableOpacity
      style={[
        styles.card,
        { backgroundColor: '#fff', borderLeftWidth: 4, borderLeftColor: accent },
      ]}
      onPress={onPress}
      activeOpacity={0.85}>
      <View style={[styles.iconBox, { backgroundColor: accentBg }]}>
        <Ionicons name={icon} size={26} color={accent} />
      </View>
      <View style={styles.textWrap}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.desc}>{description}</Text>
      </View>
      <View style={[styles.chevron, { backgroundColor: accentLight }]}>
        <Ionicons name="chevron-forward" size={16} color={accent} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 18,
    padding: 16,
    gap: 14,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  iconBox: {
    width: 52,
    height: 52,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textWrap: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  desc: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 3,
    lineHeight: 18,
  },
  chevron: {
    width: 28,
    height: 28,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});