import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { Button, Text, View, Checkbox } from "tamagui";
import { Check } from "@tamagui/lucide-icons";

type Bonus = {
  leadin: string;
  parts: string[];
  answers: string[];
};

function getCorrectCheckbox(state: boolean | undefined) {
  switch (state) {
    case undefined: 
      return '🕐'
    case true:
      return '✅'
    case false:
      return '❌'
    default:
      return 'ummmm'
  }
}

export default function TabOneScreen() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<Bonus[]>([]);
  const [result, setResults] = useState<(boolean | undefined)[]>([undefined, undefined, undefined]);
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
              - { `${getCorrectCheckbox(result[0])} ${data[0].parts[0]}` }
            </Text>
            <Text px="$3" py="$2" fs={10} mt="$2">
              {i >= 1 ? `- ${getCorrectCheckbox(result[1])} ${data[0].parts[1]}` : ""}
            </Text>
            <Text px="$3" fs={10} mt="$2">
              {i >= 2 ? `- ${getCorrectCheckbox(result[2])} ${data[0].parts[2]}` : ""}
            </Text>
          </View>
          <View pos="relative" b={0}>
            <Button onPress={() => {
              const newArr = [...result]
              newArr[0] = true
              setResults(newArr)
            }}>Test</Button>
            <Button onPress={() => setI((i) => i + 1)}>Reveal</Button>
            <Button onPress={() => getBonus()}>New question</Button>
          </View>
        </View>
      )}
    </View>
  );
}
