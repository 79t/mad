import { View, H3, Button } from "tamagui";
import { useEffect } from "react";
import { useNavigation, router } from "expo-router";

const IndexPage = () => {
  const nav = useNavigation();
  useEffect(() => {
    nav.setOptions({ title: "QB Mobile" });
  }, []);

  return (
    <View f={1} ai="center" jc="center" mx="$5">
      <H3 mb="$3">Welcome to QB Mobile! Click the below buttons to begin</H3>
      <Button
        size="$4"
        onPress={() => router.replace("/(tabs)/tossups")}
        mb="$3"
      >
        Tossups
      </Button>
      <Button
        size="$4"
        backgroundColor="blue"
        onPress={() => router.replace("/(tabs)/bonuses")}
        mb="$3"
      >
        Bonuses
      </Button>
      <Button size="$4" onPress={() => router.replace("/(tabs)/stats")}>
        Stats
      </Button>
    </View>
  );
};

export default IndexPage;
