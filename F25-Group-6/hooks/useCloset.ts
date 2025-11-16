import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

type ClothingItem = {
  id: string;
  type: 'tshirt' | 'jeans' | 'dress' | 'jacket' | 'shoes';
  color: 'black' | 'white' | 'red' | 'blue' | 'green' | 'pink' | 'yellow';
  vibe: 'fancy' | 'work' | 'workout' | 'casual' | 'comfy' | 'edgy';
  photoUri: item.photo_url;
};

export function useCloset() {
  const [items, setItems] = useState<ClothingItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClosetItems();
  }, []);

  const fetchClosetItems = async () => {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from('clothing_item')
      .select('*')
      .eq('user_id', user.id);

    if (error) {
      console.error('Error fetching closet items:', error);
    } else {
      const mappedItems = (data || []).map(item => ({
              id: item.clothing_id,
              type: item.type,
              color: item.color,
              vibe: item.vibe,
              photoUri: item.photo_url
            }));
            setItems(mappedItems);
    }

    setLoading(false);
  };

  return { items, loading, refetch: fetchClosetItems };
}