import { Image } from 'expo-image';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useRouter } from 'expo-router';


export default function HomeScreen() {
  const router = useRouter();

  return (
    <ParallaxScrollView
      headerBackgroundColor={{light: '#E06C9F', dark: '#E06C9F' }}
      headerImage={
        <View style={styles.logoContainer}>
          <Image
            source={require('@/assets/images/logo.png')}
            style={styles.logo}
          />
        </View>
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome to Dress Yourself!✨</ThemedText>
      </ThemedView>

       {/* Adding Clothing Item Button */}
      <TouchableOpacity 
        style={styles.addButton}
        onPress={() => router.push('/add-clothing')}
      >
        <ThemedText style={styles.addButtonText}>👕 Add clothing item</ThemedText>
      </TouchableOpacity>

      {/* View Saved Outfits Button */}
      <TouchableOpacity 
        style={styles.viewButton}
        onPress={() => router.push('/saved-outfits')}
      >
        <ThemedText style={styles.viewButtonText}>👀 View Saved Outfits</ThemedText>
      </TouchableOpacity>

      {/* Generate New Outfits Button */}
      <TouchableOpacity 
        style={styles.generateButton}
        onPress={() => router.push('/generate-outfit')}
      >
        <ThemedText style={styles.generateButtonText}>✨ Generate New Outfit!</ThemedText>
      </TouchableOpacity>

    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
    logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E06C9F',
    marginTop: 40,
  },
  logo: {
    width: 280,
    height: 280, 
    resizeMode: 'cover',
    borderRadius: 200,
    overflow: 'hidden',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  addButton: {
    backgroundColor: '#F283B6',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 16,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  viewButton: {
    backgroundColor: '#F283B6',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  viewButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
    generateButton: {
    backgroundColor: '#F283B6',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
    generateButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },

});
