import { Link, Tabs } from "expo-router";
import { Pressable } from "react-native";
import {
  ChevronsUp,
  MessageCircleQuestion,
  Settings,
  Award,
} from "@tamagui/lucide-icons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "orange",
      }}
    >
      <Tabs.Screen
        name="tossups"
        options={{
          title: "Tossups",
          tabBarIcon: ({ color }) => <MessageCircleQuestion />,
          headerRight: () => (
            <Link href="/TossupSettingsModal" asChild>
              <Pressable>
                <Settings mr="$3" />
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="bonuses"
        options={{
          title: "Bonuses",
          tabBarIcon: ({ color }) => <ChevronsUp />,
          headerRight: () => (
            <Link href="/BonusSettingsModal" asChild>
              <Pressable>
                <Settings mr="$3" />
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="stats"
        options={{
          title: "Stats",
          tabBarIcon: ({ color }) => <Award />,
        }}
      />
    </Tabs>
  );
}
