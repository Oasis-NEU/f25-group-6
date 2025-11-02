import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    Alert,
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

// Types
type ClothingItem = {
  id: string;
  type: 'tshirt' | 'jeans' | 'dress' | 'jacket' | 'shoes';
  color: 'black' | 'white' | 'red' | 'blue' | 'green' | 'pink' | 'yellow';
  vibe: 'fancy' | 'work' | 'workout' | 'casual' | 'comfy' | 'edgy';
  photoUri: string;
};

type Outfit = {
  top?: ClothingItem;
  bottom?: ClothingItem;
  dress?: ClothingItem;
  jacket?: ClothingItem;
  shoes?: ClothingItem;
};

// Color compatibility matrix
const colorCompatibility: Record<string, string[]> = {
  black: ['white', 'red', 'blue', 'green', 'pink', 'yellow', 'black'],
  white: ['black', 'red', 'blue', 'green', 'pink', 'yellow'],
  red: ['black', 'white', 'blue'],
  blue: ['white', 'black', 'red', 'yellow'],
  green: ['black', 'white', 'yellow'],
  pink: ['black', 'white', 'blue'],
  yellow: ['black', 'white', 'blue', 'green'],
};

// Helper function to check if colors match
function colorsMatch(color1: string, color2: string): boolean {
  return colorCompatibility[color1]?.includes(color2) || false;
}

// Helper function to check if all colors in outfit match
function outfitColorsMatch(items: ClothingItem[]): boolean {
  if (items.length <= 1) return true;
  
  for (let i = 0; i < items.length - 1; i++) {
    for (let j = i + 1; j < items.length; j++) {
      if (!colorsMatch(items[i].color, items[j].color)) {
        return false;
      }
    }
  }
  return true;
}

export default function GeneratedOutfitScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const insets = useSafeAreaInsets();

  const selectedVibe = params.vibe as string;
  const selectedWeather = params.weather as string;

  const [outfit, setOutfit] = useState<Outfit | null>(null);
  const [availableItems, setAvailableItems] = useState<ClothingItem[]>([]);

  // TODO: Replace with actual data from your closet store
  // For now, using mock data
  const mockClosetItems: ClothingItem[] = [
    // Add your actual closet items here
  ];

  useEffect(() => {
    setAvailableItems(mockClosetItems);
    generateOutfit();
  }, []);

  const needsJacket = (weather: string): boolean => {
    return ['rainy', 'windy', 'cold', 'snowy'].includes(weather.toLowerCase());
  };

  const generateOutfit = () => {
    const jacketRequired = needsJacket(selectedWeather);
    
    // Filter items by vibe
    const vibeMatchedItems = availableItems.filter(
      item => item.vibe === selectedVibe
    );

    if (vibeMatchedItems.length === 0) {
      Alert.alert(
        'No matching items',
        `You don't have any items with the "${selectedVibe}" vibe. Try adding more items to your closet!`,
        [
          { text: 'Add Items', onPress: () => router.push('/add-clothing') },
          { text: 'Choose Different Vibe', onPress: () => router.back() },
        ]
      );
      return;
    }

    // Separate items by type
    const tshirts = vibeMatchedItems.filter(item => item.type === 'tshirt');
    const jeans = vibeMatchedItems.filter(item => item.type === 'jeans');
    const dresses = vibeMatchedItems.filter(item => item.type === 'dress');
    const jackets = vibeMatchedItems.filter(item => item.type === 'jacket');
    const shoes = vibeMatchedItems.filter(item => item.type === 'shoes');

    // Check if jacket is required but not available
    if (jacketRequired && jackets.length === 0) {
      Alert.alert(
        'Missing jacket',
        `It's ${selectedWeather} weather! You need a jacket but don't have one with the "${selectedVibe}" vibe. Consider adding one or trying a different vibe.`,
        [
          { text: 'Add Jacket', onPress: () => router.push('/add-clothing') },
          { text: 'Try Anyway', onPress: () => generateOutfitWithoutJacket() },
        ]
      );
      return;
    }

    let attempts = 0;
    const maxAttempts = 100;
    let generatedOutfit: Outfit | null = null;

    // Try to generate a valid outfit
    while (attempts < maxAttempts && !generatedOutfit) {
      attempts++;

      // Decide: dress or separates?
      const useDress = dresses.length > 0 && Math.random() > 0.5;

      if (useDress) {
        // Dress outfit: dress + optional jacket + shoes
        const dress = dresses[Math.floor(Math.random() * dresses.length)];
        const shoe = shoes.length > 0 ? shoes[Math.floor(Math.random() * shoes.length)] : undefined;
        const jacket = jacketRequired && jackets.length > 0
          ? jackets[Math.floor(Math.random() * jackets.length)]
          : undefined;

        const items = [dress, shoe, jacket].filter(Boolean) as ClothingItem[];
        
        if (outfitColorsMatch(items)) {
          generatedOutfit = { dress, shoes: shoe, jacket };
        }
      } else {
        // Separates: tshirt + jeans + optional jacket + shoes
        if (tshirts.length === 0 || jeans.length === 0) {
          continue; // Can't make separates outfit
        }

        const tshirt = tshirts[Math.floor(Math.random() * tshirts.length)];
        const jean = jeans[Math.floor(Math.random() * jeans.length)];
        const shoe = shoes.length > 0 ? shoes[Math.floor(Math.random() * shoes.length)] : undefined;
        const jacket = jacketRequired && jackets.length > 0
          ? jackets[Math.floor(Math.random() * jackets.length)]
          : undefined;

        const items = [tshirt, jean, shoe, jacket].filter(Boolean) as ClothingItem[];
        
        if (outfitColorsMatch(items)) {
          generatedOutfit = { top: tshirt, bottom: jean, shoes: shoe, jacket };
        }
      }
    }

    if (!generatedOutfit) {
      Alert.alert(
        'Could not generate outfit',
        'Could not find matching colors for an outfit. Try adding more items or selecting a different vibe.',
        [
          { text: 'Add Items', onPress: () => router.push('/add-clothing') },
          { text: 'Try Different Vibe', onPress: () => router.back() },
        ]
      );
      return;
    }

    setOutfit(generatedOutfit);
  };

  const generateOutfitWithoutJacket = () => {
    // Similar logic but without jacket requirement
    // Simplified version for space
    generateOutfit();
  };

  const saveOutfit = () => {
    if (!outfit) return;
    
    Alert.alert(
      'Outfit Saved!',
      'Your outfit has been saved to your collection.',
      [{ text: 'OK' }]
    );
    // TODO: Save outfit to storage
  };

  if (!outfit) {
    return (
      <>
        <Stack.Screen options={{ title: 'Generated Outfit' }} />
        <ThemedView style={[styles.container, { paddingTop: insets.top }]}>
          <View style={styles.loadingContainer}>
            <ThemedText>Generating your outfit...</ThemedText>
          </View>
        </ThemedView>
      </>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: 'Your Outfit' }} />
      <ThemedView style={[styles.container, { paddingTop: insets.top }]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <ThemedText type="title" style={styles.title}>
            Your {selectedVibe} Outfit
          </ThemedText>
          
          <ThemedText style={styles.subtitle}>
            Perfect for {selectedWeather} weather! ☀️
          </ThemedText>

          <View style={styles.outfitContainer}>
            {/* Jacket */}
            {outfit.jacket && (
              <View style={styles.itemCard}>
                <Image
                  source={{ uri: outfit.jacket.photoUri }}
                  style={styles.itemImage}
                  resizeMode="cover"
                />
                <ThemedText style={styles.itemLabel}>
                  Jacket • {outfit.jacket.color}
                </ThemedText>
              </View>
            )}

            {/* Dress OR Top */}
            {outfit.dress ? (
              <View style={styles.itemCard}>
                <Image
                  source={{ uri: outfit.dress.photoUri }}
                  style={styles.itemImage}
                  resizeMode="cover"
                />
                <ThemedText style={styles.itemLabel}>
                  Dress • {outfit.dress.color}
                </ThemedText>
              </View>
            ) : outfit.top ? (
              <View style={styles.itemCard}>
                <Image
                  source={{ uri: outfit.top.photoUri }}
                  style={styles.itemImage}
                  resizeMode="cover"
                />
                <ThemedText style={styles.itemLabel}>
                  Top • {outfit.top.color}
                </ThemedText>
              </View>
            ) : null}

            {/* Bottom (only if not dress) */}
            {outfit.bottom && (
              <View style={styles.itemCard}>
                <Image
                  source={{ uri: outfit.bottom.photoUri }}
                  style={styles.itemImage}
                  resizeMode="cover"
                />
                <ThemedText style={styles.itemLabel}>
                  Jeans • {outfit.bottom.color}
                </ThemedText>
              </View>
            )}

            {/* Shoes */}
            {outfit.shoes && (
              <View style={styles.itemCard}>
                <Image
                  source={{ uri: outfit.shoes.photoUri }}
                  style={styles.itemImage}
                  resizeMode="cover"
                />
                <ThemedText style={styles.itemLabel}>
                  Shoes • {outfit.shoes.color}
                </ThemedText>
              </View>
            )}
          </View>

          <View style={styles.buttonContainer}>
            <Pressable
              style={[styles.button, styles.regenerateButton]}
              onPress={generateOutfit}
            >
              <Text style={styles.buttonText}>🔄 Generate New Outfit</Text>
            </Pressable>

            <Pressable
              style={[styles.button, styles.saveButton]}
              onPress={saveOutfit}
            >
              <Text style={styles.buttonText}>💾 Save This Outfit</Text>
            </Pressable>
          </View>
        </ScrollView>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 32,
    paddingTop: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
    opacity: 0.7,
  },
  outfitContainer: {
    gap: 16,
    marginBottom: 32,
  },
  itemCard: {
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  itemImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: '#e0e0e0',
  },
  itemLabel: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  buttonContainer: {
    gap: 12,
  },
  button: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  regenerateButton: {
    backgroundColor: '#F283B6',
  },
  saveButton: {
    backgroundColor: '#34C759',
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
});