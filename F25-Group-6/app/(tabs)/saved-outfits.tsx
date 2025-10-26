import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function SavedOutfitsScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Saved Outfits' }} />
      <SafeAreaView style={[styles.container, {backgroundColor: 'transparent'}]} edges={['top', 'left', 'right']}>
        <ThemedView style={{ backgroundColor: 'transparent' }}>
          <ThemedText type="title">Your Saved Outfits</ThemedText>
          {/* Add outfit list here */}
        </ThemedView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});