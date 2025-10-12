import { StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function SavedOutfitsScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Saved Outfits' }} />
      <ThemedView style={styles.container}>
        <ThemedText type="title">Your Saved Outfits</ThemedText>
        {/* Add outfit list here */}
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});