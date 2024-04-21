import { Link, Tabs } from 'expo-router'
import { Pressable } from 'react-native'
import { Text } from 'tamagui'
import {ChevronsUp, MessageCircleQuestion, Settings} from '@tamagui/lucide-icons'
import React from 'react'

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'red',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Tossups',
          tabBarIcon: ({ color }) => <MessageCircleQuestion />,
          headerRight: () => (
            <Link href="/TossupSettingsModal" asChild>
              <Pressable>
                <Settings mr='$3'/>
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="bonuses"
        options={{
          title: 'Bonuses',
          tabBarIcon: ({ color }) => <ChevronsUp />,
          headerRight: () => (
            <Link href="/BonusSettingsModal" asChild>
              <Pressable>
                <Settings mr='$3'/>
              </Pressable>
            </Link>
          ),
        }}
      />
    </Tabs>
  )
}
