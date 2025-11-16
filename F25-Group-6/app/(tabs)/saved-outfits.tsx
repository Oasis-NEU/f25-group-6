import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { supabase } from '@/lib/supabase';
import { Stack, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { SafeAreaView } from 'react-native-safe-area-context';

type ClothingItem = {
  clothing_id: string;
  user_id: string;
  type: string;
  type_label: string;
  color: string;
  color_label: string;
  vibe: string;
  vibe_label: string;
  photo_url: string;
  created_at: string;
};

export default function SavedOutfitsScreen() {
  const [items, setItems] = useState<ClothingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = async () => {
    try {
      setLoading(true);
      setError(null);

      // Get current user
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !user) {
        console.error('Auth error:', userError);
        setError('Not authenticated');
        return;
      }

      console.log('Fetching items for user:', user.id);

      // Fetch clothing items
      const { data, error: fetchError } = await supabase
        .from('clothing_item')  // Singular - matches your table
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (fetchError) {
        console.error('Fetch error:', fetchError);
        setError(fetchError.message);
        return;
      }

      console.log('Fetched items:', data);
      setItems(data || []);

    } catch (err: any) {
      console.error('Error fetching items:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Refetch when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      fetchItems();
    }, [])
  );

  const renderItem = ({ item }: { item: ClothingItem }) => (
    <View style={styles.itemCard}>
      <Image
        source={{ uri: item.photo_url }}
        style={styles.itemImage}
        contentFit="cover"
       onError={(err) => console.log("IMAGE LOAD ERROR:", err)}
      />
      <View style={styles.itemInfo}>
        <Text style={styles.itemLabel}>{item.type_label}</Text>
        <Text style={styles.itemDetail}>
          {item.color_label} · {item.vibe_label}
        </Text>
      </View>
    </View>
  );

  return (
    <>
      <Stack.Screen options={{ title: 'Saved Outfits' }} />
      <SafeAreaView style={[styles.container, { backgroundColor: '#FFFFFF' }]} edges={['top', 'left', 'right']}>
        <ThemedView style={styles.content}>
          <ThemedText type="title" style={styles.title}>
            Your Closet
          </ThemedText>

          {loading ? (
            <View style={styles.centerContainer}>
              <ActivityIndicator size="large" color="#F283B6" />
              <Text style={styles.loadingText}>Loading your items...</Text>
            </View>
          ) : error ? (
            <View style={styles.centerContainer}>
              <Text style={styles.errorText}>Error: {error}</Text>
            </View>
          ) : items.length === 0 ? (
            <View style={styles.centerContainer}>
              <Text style={styles.emptyIcon}>👗</Text>
              <Text style={styles.emptyText}>Your closet is empty</Text>
              <Text style={styles.emptySubtext}>
                Add items using the + button
              </Text>
            </View>
          ) : (
            <FlatList
              data={items}
              renderItem={renderItem}
              keyExtractor={(item) => item.clothing_id}
              numColumns={2}
              columnWrapperStyle={styles.row}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.listContent}
            />
          )}
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
  content: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 24,
    textAlign: 'center',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    fontSize: 16,
    color: '#ff3b30',
    textAlign: 'center',
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  listContent: {
    paddingBottom: 16,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  itemCard: {
    width: '48%',
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  itemImage: {
    width: '100%',
    height: 180,
    backgroundColor: '#e0e0e0',
  },
  itemInfo: {
    padding: 12,
  },
  itemLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  itemDetail: {
    fontSize: 13,
    color: '#666',
  },
});

