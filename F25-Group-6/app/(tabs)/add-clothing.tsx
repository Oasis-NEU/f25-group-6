import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import * as Select from '@rn-primitives/select';
import React, { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const WhatIsIt = [
  { label: 'T-Shirt', value: 'tshirt' },
  { label: 'Jeans', value: 'jeans' },
  { label: 'Dress', value: 'dress' },
  { label: 'Jacket', value: 'jacket' },
  { label: 'Shoes', value: 'shoes' },
];

const WhatColorIsIt = [
  { label: 'Black', value: 'black' },
  { label: 'White', value: 'white' },
  { label: 'Red', value: 'red' },
  { label: 'Blue', value: 'blue' },
  { label: 'Green', value: 'green' },
  { label: 'Pink', value: 'pink' },
  { label: 'Yellow', value: 'yellow' },
];

const WhatIsTheVibe = [
  { label: 'Fancy', value: 'fancy' },
  { label: 'Casual', value: 'casual' },
  { label: 'Comfy', value: 'comfy' },
  { label: 'Professional', value: 'professional' },
  { label: 'Sporty', value: 'sporty' },
  { label: 'Edgy', value: 'edgy' },
];

export default function AddClothingScreen() {
  const [type, setType] = useState<{ value: string; label: string } | undefined>();
  const [color, setColor] = useState<{ value: string; label: string } | undefined>();
  const [vibe, setVibe] = useState<{ value: string; label: string } | undefined>();

  const insets = useSafeAreaInsets();

  const save = () => {
    if (!type || !color || !vibe) {
      Alert.alert('Missing info', 'Please select all options');
      return;
    }
    Alert.alert('Saved!', `${type.label}, ${color.label}, ${vibe.label}`);
  };

  return (
    <ThemedView style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <ThemedText type="title" style={styles.title}>Add Clothing Item</ThemedText>

        {/* What is it? */}
        <View style={styles.inputGroup}>
          <ThemedText style={styles.label}>What is it?</ThemedText>
          <Select.Root value={type} onValueChange={setType}>
            <Select.Trigger style={styles.trigger}>
              <View style={styles.triggerContent}>
                <Select.Value placeholder="Select item type" />
                <Text style={styles.arrow}>▼</Text>
              </View>
            </Select.Trigger>
            <Select.Portal>
              <Select.Overlay style={styles.overlay}>
                <Select.Content style={styles.content}>
                  <Select.Viewport style={styles.viewport}>
                    <Select.Group>
                      <Select.Label style={styles.selectLabel}>Item Types</Select.Label>
                      {WhatIsIt.map((item) => (
                        <Select.Item key={item.value} label={item.label} value={item.value} style={styles.item}>
                          <Text style={styles.itemText}>{item.label}</Text>
                          <Select.ItemIndicator style={styles.indicator}>
                            <Text>✓</Text>
                          </Select.ItemIndicator>
                        </Select.Item>
                      ))}
                    </Select.Group>
                  </Select.Viewport>
                </Select.Content>
              </Select.Overlay>
            </Select.Portal>
          </Select.Root>
        </View>

        {/* What color is it? */}
        <View style={styles.inputGroup}>
          <ThemedText style={styles.label}>What color is it?</ThemedText>
          <Select.Root value={color} onValueChange={setColor}>
            <Select.Trigger style={styles.trigger}>
              <View style={styles.triggerContent}>
                <Select.Value placeholder="Select color" />
                <Text style={styles.arrow}>▼</Text>
              </View>
            </Select.Trigger>
            <Select.Portal>
              <Select.Overlay style={styles.overlay}>
                <Select.Content style={styles.content}>
                  <Select.Viewport style={styles.viewport}>
                    <Select.Group>
                      <Select.Label style={styles.selectLabel}>Colors</Select.Label>
                      {WhatColorIsIt.map((item) => (
                        <Select.Item key={item.value} label={item.label} value={item.value} style={styles.item}>
                          <Text style={styles.itemText}>{item.label}</Text>
                          <Select.ItemIndicator style={styles.indicator}>
                            <Text>✓</Text>
                          </Select.ItemIndicator>
                        </Select.Item>
                      ))}
                    </Select.Group>
                  </Select.Viewport>
                </Select.Content>
              </Select.Overlay>
            </Select.Portal>
          </Select.Root>
        </View>

        {/* What's the vibe? */}
        <View style={styles.inputGroup}>
          <ThemedText style={styles.label}>What's the vibe?</ThemedText>
          <Select.Root value={vibe} onValueChange={setVibe}>
            <Select.Trigger style={styles.trigger}>
              <View style={styles.triggerContent}>
                <Select.Value placeholder="Select vibe" />
                <Text style={styles.arrow}>▼</Text>
              </View>
            </Select.Trigger>
            <Select.Portal>
              <Select.Overlay style={styles.overlay}>
                <Select.Content style={styles.content}>
                  <Select.Viewport style={styles.viewport}>
                    <Select.Group>
                      <Select.Label style={styles.selectLabel}>Vibes</Select.Label>
                      {WhatIsTheVibe.map((item) => (
                        <Select.Item key={item.value} label={item.label} value={item.value} style={styles.item}>
                          <Text style={styles.itemText}>{item.label}</Text>
                          <Select.ItemIndicator style={styles.indicator}>
                            <Text>✓</Text>
                          </Select.ItemIndicator>
                        </Select.Item>
                      ))}
                    </Select.Group>
                  </Select.Viewport>
                </Select.Content>
              </Select.Overlay>
            </Select.Portal>
          </Select.Root>
        </View>

        <Pressable style={styles.button} onPress={save}>
          <ThemedText style={styles.buttonText}>Create Item</ThemedText>
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
    padding: 16,
    paddingTop: 24,
  },
  title: {
    marginBottom: 24,
    textAlign: 'center',
  },
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
  button: {
    marginTop: 24,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: '#ff6aa2',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});