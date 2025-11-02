import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
  Alert,
  Image,
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
import * as ImagePicker from 'expo-image-picker';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

type Option = { value: string; label: string };

const WhatIsIt = [
  { label: 'T-Shirt', value: 'tshirt' },
  { label: 'Jeans', value: 'jeans' },
  { label: 'Dress', value: 'dress' },
  { label: 'Jacket', value: 'jacket' },
  { label: 'Shoes', value: 'shoes' },
];

const WhatColorIsIt: Option[] = [
  { label: 'Black', value: 'black' },
  { label: 'White', value: 'white' },
  { label: 'Red', value: 'red' },
  { label: 'Blue', value: 'blue' },
  { label: 'Green', value: 'green' },
  { label: 'Pink', value: 'pink' },
  { label: 'Yellow', value: 'yellow' },
];

const WhatIsTheVibe: Option[] = [
  { label: 'Fancy dinner', value: 'fancy' },
  { label: 'Work event', value: 'work' },
  { label: 'Workout', value: 'workout' },
  { label: 'Casual', value: 'casual' },
  { label: 'Comfy', value: 'comfy' },
  { label: 'Edgy', value: 'edgy' },
];

export default function AddClothingScreen() {
  // router for back button
  const router = useRouter();

  // dropdown states
  const [type, setType] = useState<Option | undefined>();
  const [color, setColor] = useState<Option | undefined>();
  const [vibe, setVibe] = useState<Option | undefined>();

  // photo state
  const [photoUri, setPhotoUri] = useState<string | undefined>();

  // refs for the Select workaround
  const typeRef = useRef<TriggerRef>(null);
  const colorRef = useRef<TriggerRef>(null);
  const vibeRef = useRef<TriggerRef>(null);

  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: Platform.select({ ios: insets.bottom, android: insets.bottom + 24 }),
    left: 12,
    right: 12,
  };

  const handleTakePhoto = async () => {
    // ask for camera permission
    const camPerm = await ImagePicker.requestCameraPermissionsAsync();
    if (!camPerm.granted) {
      Alert.alert(
        'Camera permission needed',
        'Please allow camera access to take a photo.'
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'], 
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setPhotoUri(result.assets[0].uri);
    }
  };

  const save = () => {
    if (!photoUri) {
      Alert.alert('Missing photo', 'Please take a picture of the item.');
      return;
    }
    if (!type || !color || !vibe) {
      Alert.alert('Missing info', 'Please select all options.');
      return;
    }

    // TODO: actually save to closet data store
    Alert.alert(
      'Added to Closet!',
      `Saved:\n${type.label} · ${color.label} · ${vibe.label}`
    );
  };

  return (
    <ThemedView style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* HEADER ROW: back + title */}
        <View style={styles.headerRow}>
          <Pressable
            style={styles.backButton}
            onPress={() => router.back()}
            accessibilityRole="button"
            accessibilityLabel="Go back"
          >
            <Text style={styles.backButtonText}>←</Text>
          </Pressable>

          <ThemedText type="title" style={styles.title}>
            Add Clothing Item
          </ThemedText>

          <View style={{ width: 32 }} />
        </View>

        {/* PHOTO AREA */}
        <View style={styles.photoSection}>
          <View style={styles.photoPreview}>
            {photoUri ? (
              <Image
                source={{ uri: photoUri }}
                style={styles.photoImage}
                resizeMode="cover"
              />
            ) : (
              <View style={styles.photoPlaceholder}>
                <Text style={styles.photoPlaceholderIcon}>📷</Text>
                <Text style={styles.photoPlaceholderText}>
                  Add a photo of the item
                </Text>
              </View>
            )}
          </View>

          <Pressable style={styles.cameraButton} onPress={handleTakePhoto}>
            <Text style={styles.cameraButtonText}>Take Photo</Text>
          </Pressable>
        </View>

        {/* What is it? */}
        <View style={styles.inputGroup}>
          <ThemedText style={styles.label}>Item</ThemedText>
          <Select.Root value={type} onValueChange={setType}>
            <Select.Trigger
              ref={typeRef}
              style={styles.trigger}
              onTouchStart={() => typeRef.current?.open()}
            >
              <View style={styles.triggerContent}>
                <Select.Value placeholder="Select item type" />
                <Text style={styles.arrow}>▼</Text>
              </View>
            </Select.Trigger>
            <Select.Portal>
              <Select.Overlay style={styles.overlay}>
                <Select.Content insets={contentInsets} style={styles.content}>
                  <Select.Viewport style={styles.viewport}>
                    <Select.Group>
                      <Select.Label style={styles.selectLabel}>
                        Item Type
                      </Select.Label>
                      {WhatIsIt.map((item) => (
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

        {/* Color */}
        <View style={styles.inputGroup}>
          <ThemedText style={styles.label}>Color</ThemedText>
          <Select.Root value={color} onValueChange={setColor}>
            <Select.Trigger
              ref={colorRef}
              style={styles.trigger}
              onTouchStart={() => colorRef.current?.open()}
            >
              <View style={styles.triggerContent}>
                <Select.Value placeholder="Select color" />
                <Text style={styles.arrow}>▼</Text>
              </View>
            </Select.Trigger>
            <Select.Portal>
              <Select.Overlay style={styles.overlay}>
                <Select.Content insets={contentInsets} style={styles.content}>
                  <Select.Viewport style={styles.viewport}>
                    <Select.Group>
                      <Select.Label style={styles.selectLabel}>
                        Color
                      </Select.Label>
                      {WhatColorIsIt.map((item) => (
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

        {/* Vibe */}
        <View style={styles.inputGroup}>
          <ThemedText style={styles.label}>What's the vibe?</ThemedText>
          <Select.Root value={vibe} onValueChange={setVibe}>
            <Select.Trigger
              ref={vibeRef}
              style={styles.trigger}
              onTouchStart={() => vibeRef.current?.open()}
            >
              <View style={styles.triggerContent}>
                <Select.Value placeholder="Select vibe" />
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
                      {WhatIsTheVibe.map((item) => (
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

        <Pressable style={styles.saveButton} onPress={save}>
          <Text style={styles.saveButtonText}>Add to Closet</Text>
        </Pressable>
      </ScrollView>
    </ThemedView>
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

  // header
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    justifyContent: 'space-between',
  },
  backButton: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonText: {
    fontSize: 18,
    fontWeight: '600',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },

  // photo section
  photoSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  photoPreview: {
    width: 180,
    height: 180,
    borderRadius: 16,
    backgroundColor: '#f3f3f3',
    borderWidth: 1,
    borderColor: '#ddd',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoImage: {
    width: '100%',
    height: '100%',
  },
  photoPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoPlaceholderIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  photoPlaceholderText: {
    fontSize: 13,
    color: '#666',
  },
  cameraButton: {
    marginTop: 12,
    backgroundColor: '#222',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
  },
  cameraButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },

  // dropdown sections
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
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

  saveButton: {
    marginTop: 12,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: '#ff6aa2',
  },
  saveButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});
