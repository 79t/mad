import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { Button, Text, View, Checkbox } from "tamagui";
import { Check } from "@tamagui/lucide-icons";

type Bonus = {
  leadin: string;
  parts: string[];
  answers: string[];
};

export default function TabOneScreen() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<Bonus[]>([]);
  const [result, setResults] = useState([false, false, false]);
  const [i, setI] = useState(0);
  const getBonus = async () => {
    setLoading(true);
    try {
      const req = await fetch("https://qbreader.org/api/random-bonus");
      const res = await req.json();
      setData(res.bonuses);
    } catch (e) {
      console.error(e);
    } finally {
      setI(0);
      setLoading(false);
    }
  };

  useEffect(() => {
    getBonus();
  }, []);
  return (
    <View f={1}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View f={1}>
          <View f={1}>
            <Text p="$3" fs={10}>
              {data[0].leadin}
            </Text>
            <Text px="$3" fs={10} mt="$2">
              - {data[0].parts[0]}
            </Text>
            <Text px="$3" py="$2" fs={10} mt="$2">
              {i >= 1 ? `- ${data[0].parts[1]}` : ""}
            </Text>
            <Text px="$3" fs={10} mt="$2">
              {i >= 2 ? `- ${data[0].parts[2]}` : ""}
            </Text>
            <Checkbox size="$4" disabled checked={'indeterminate'}>
              <Checkbox.Indicator>
                <Check />
              </Checkbox.Indicator>
            </Checkbox>
          </View>
          <View pos="relative" b={0}>
            <Button onPress={() => setI((i) => i + 1)}>Reveal</Button>
            <Button onPress={() => getBonus()}>New question</Button>
          </View>
        </View>
      )}
    </View>
  );
}
