import { Stack, useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import {
  Alert,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import type { TriggerRef } from '@rn-primitives/select';
import * as Select from '@rn-primitives/select';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

type Option = { value: string; label: string };

const VibeOptions: Option[] = [
  { label: 'Fancy', value: 'fancy' },
  { label: 'Casual', value: 'casual' },
  { label: 'Comfy', value: 'comfy' },
  { label: 'Professional', value: 'professional' },
  { label: 'Sporty', value: 'sporty' },
  { label: 'Edgy', value: 'edgy' },
];

const WeatherOptions: Option[] = [
  { label: 'Rainy', value: 'rainy' },
  { label: 'Sunny', value: 'sunny' },
  { label: 'Windy', value: 'windy' },
  { label: 'Cold', value: 'cold' },
  { label: 'Hot', value: 'hot' },
  { label: 'Snowy', value: 'snowy' },
];

export default function GenerateOutfitsScreen() {
  const router = useRouter();
  
  // dropdown states
  const [vibe, setVibe] = useState<Option | undefined>();
  const [weather, setWeather] = useState<Option | undefined>();

  // refs for the Select workaround
  const vibeRef = useRef<TriggerRef>(null);
  const weatherRef = useRef<TriggerRef>(null);

  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: Platform.select({ ios: insets.bottom, android: insets.bottom + 24 }),
    left: 12,
    right: 12,
  };

  const handleGenerateOutfit = () => {
    if (!vibe || !weather) {
      Alert.alert('Missing info', 'Please select both vibe and weather.');
      return;
    }

    // Navigate to generated-outfit screen with parameters
    router.push({
      pathname: '/generated-outfit',
      params: { 
        vibe: vibe.value, 
        weather: weather.value 
      }
    });
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Generate Outfit' }} />
      <ThemedView style={[styles.container, { paddingTop: insets.top }]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <ThemedText type="title" style={styles.title}>
            Let's create your outfit!
          </ThemedText>

          {/* Vibe Dropdown */}
          <View style={styles.inputGroup}>
            <ThemedText style={styles.label}>What's the vibe? ✨</ThemedText>
            <Select.Root value={vibe} onValueChange={setVibe}>
              <Select.Trigger
                ref={vibeRef}
                style={styles.trigger}
                onTouchStart={() => vibeRef.current?.open()}
              >
                <View style={styles.triggerContent}>
                  <Select.Value placeholder="Select a vibe" />
                  <Text style={styles.arrow}>▼</Text>
                </View>
              </Select.Trigger>
              <Select.Portal>
                <Select.Overlay style={styles.overlay}>
                  <Select.Content insets={contentInsets} style={styles.content}>
                    <Select.Viewport style={styles.viewport}>
                      <Select.Group>
                        <Select.Label style={styles.selectLabel}>
                          Vibe
                        </Select.Label>
                        {VibeOptions.map((item) => (
                          <Select.Item
                            key={item.value}
                            label={item.label}
                            value={item.value}
                          >
                            <View style={styles.item}>
                              <Text style={styles.itemText}>{item.label}</Text>
                              <Select.ItemIndicator style={styles.indicator}>
                                <Text>✓</Text>
                              </Select.ItemIndicator>
                            </View>
                          </Select.Item>
                        ))}
                      </Select.Group>
                    </Select.Viewport>
                  </Select.Content>
                </Select.Overlay>
              </Select.Portal>
            </Select.Root>
          </View>

          {/* Weather Dropdown */}
          <View style={styles.inputGroup}>
            <ThemedText style={styles.label}>What's the weather? 🌤️</ThemedText>
            <Select.Root value={weather} onValueChange={setWeather}>
              <Select.Trigger
                ref={weatherRef}
                style={styles.trigger}
                onTouchStart={() => weatherRef.current?.open()}
              >
                <View style={styles.triggerContent}>
                  <Select.Value placeholder="Select weather" />
                  <Text style={styles.arrow}>▼</Text>
                </View>
              </Select.Trigger>
              <Select.Portal>
                <Select.Overlay style={styles.overlay}>
                  <Select.Content insets={contentInsets} style={styles.content}>
                    <Select.Viewport style={styles.viewport}>
                      <Select.Group>
                        <Select.Label style={styles.selectLabel}>
                          Weather
                        </Select.Label>
                        {WeatherOptions.map((item) => (
                          <Select.Item
                            key={item.value}
                            label={item.label}
                            value={item.value}
                          >
                            <View style={styles.item}>
                              <Text style={styles.itemText}>{item.label}</Text>
                              <Select.ItemIndicator style={styles.indicator}>
                                <Text>✓</Text>
                              </Select.ItemIndicator>
                            </View>
                          </Select.Item>
                        ))}
                      </Select.Group>
                    </Select.Viewport>
                  </Select.Content>
                </Select.Overlay>
              </Select.Portal>
            </Select.Root>
          </View>

          {/* Generate Button */}
          <Pressable style={styles.generateButton} onPress={handleGenerateOutfit}>
            <Text style={styles.generateButtonText}>🎨 Generate Outfit</Text>
          </Pressable>
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
    paddingTop: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 32,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  trigger: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    backgroundColor: '#f8f8f8',
  },
  triggerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 14,
  },
  arrow: {
    fontSize: 12,
    opacity: 0.5,
    marginLeft: 8,
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginHorizontal: 20,
    width: '90%',
    maxHeight: '50%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  viewport: {
    padding: 8,
  },
  selectLabel: {
    fontSize: 12,
    fontWeight: '700',
    paddingVertical: 8,
    paddingHorizontal: 12,
    opacity: 0.5,
    textTransform: 'uppercase',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
  indicator: {
    marginLeft: 8,
  },
  generateButton: {
    marginTop: 32,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: '#F283B6',
  },
  generateButtonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 18,
  },
});