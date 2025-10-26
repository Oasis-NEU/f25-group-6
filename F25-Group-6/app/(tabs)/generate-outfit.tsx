import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Stack } from 'expo-router';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function GenerateOutfitsScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Generate Outfits' }} />
      <SafeAreaView style={[styles.container, {backgroundColor: '#FFFFFF'}]} edges={['top', 'left', 'right']}>
        <ThemedView>
          <ThemedText type="title">Let's create your outfit!</ThemedText>
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