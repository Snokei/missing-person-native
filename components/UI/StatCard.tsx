import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

interface StatCardProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: number;
  color: string;
  bgColor: string;
}

export default function StatCard({ icon, label, value, color, bgColor }: StatCardProps) {
  return (
    <View style={[styles.card, { backgroundColor: bgColor }]}>
      <View style={[styles.iconWrap, { backgroundColor: color + '20' }]}>
        <Ionicons name={icon} size={20} color={color} />
      </View>
      <Text style={[styles.value, { color }]}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '48%',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  value: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 2,
  },
  label: {
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '500',
  },
});