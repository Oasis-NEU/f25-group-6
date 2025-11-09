import { supabase } from '@/lib/supabase';
import { Tabs } from 'expo-router';
import React, { useEffect, useState } from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useRouter } from 'expo-router';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        // No user logged in → go to signup
        router.replace('/auth/signup');
      }

      setLoading(false);
    };

    checkSession();
  }, []);

  // While checking session, don't render tabs yet
  if (loading) return null;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />

      <Tabs.Screen
        name="saved-outfits"
        options={{
          title: 'Saved Outfits',
          tabBarLabel: 'Saved',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="bookmark.fill" color={color} />,
        }}
      />

      <Tabs.Screen
        name="add-clothing"
        options={{
          title: 'Add Clothing',
          tabBarLabel: 'Add Clothing',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="plus.circle.fill" color={color} />,
        }}
      />

      <Tabs.Screen
        name="generate-outfit"
        options={{
          title: 'Generate Outfit',
          tabBarLabel: 'Generate Outfit',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="wand.and.stars" color={color} />,
        }}
      />
    </Tabs>
  );
}
