import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function GenerateNewOutfitScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Generate New Outfit</ThemedText>
      {/* Add form here */}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});