import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DummyImage from './_DummyImage';

export default function SavedOutfitsScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Saved Outfits' }} />
      <SafeAreaView style={[styles.container, {backgroundColor: '#FFFFFF'}]} edges={['top', 'left', 'right']}>
        <ThemedView>
          <ThemedText type="title">Your Saved Outfits</ThemedText>
          {/* Add outfit list here */}

    <View style={styles.imageContainer}>
      <DummyImage width={250} height={250} />
      <DummyImage
        width={250}
        height={250}
      />
    </View>

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

  imageContainer: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: 16,
  marginTop: 16,
},
});