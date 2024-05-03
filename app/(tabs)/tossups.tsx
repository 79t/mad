import { useState, useEffect } from "react";
import { Text, View, Button, Input, Sheet } from "tamagui";
import { ActivityIndicator } from "react-native";
import { useInterval } from "../../constants/utils";
import { ChevronDown } from "@tamagui/lucide-icons";
import { useTossupSettings } from "../stores/TossupSettingsStore";
import { useTossupStats } from "../stores/TossupStatsStore";
import type { ValidCategory } from "../stores/TossupStatsStore";

type Tossup = {
  question: string;
  answer: string;
  category: string;
};

export default function TabOneScreen() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<Tossup[]>([]);
  const [i, setI] = useState(0);
  const [disable, setDisable] = useState(false);
  const [answer, setAnswer] = useState("");
  const [position, setPosition] = useState(0);
  const [open, setOpen] = useState(false);
  const [sessionCorrect, setSessionCorrect] = useState(0)
  const [sessionIncorrect, setSessionIncorrect] = useState(0)
  const sessionScore = (sessionCorrect * 10) + (sessionIncorrect * -5)
  const modal = false;

  const tossupSettings = useTossupSettings()
  const tossupStats = useTossupStats()

  const getTossup = async () => {
    setLoading(true);
    try {
      const diffsToUse = [...tossupSettings.difficulties.keys()].filter(x => tossupSettings.difficulties[x]).map(z => z+1).map(zz => `&difficulties=${zz}`).join('')
      const catsToUse = tossupSettings.cat.map(c => `&categories=${c}`)
      const req = await fetch(`https://qbreader.org/api/random-tossup?number=1${diffsToUse}${catsToUse}`);
      const res = await req.json();
      setData(res.tossups);
    } catch (error) {
      console.error(error);
    } finally {
      setI(1);
      setLoading(false);
      setDisable(false)
    }
  };

  const checkAnswer = async () => {
    try {
      const req = await fetch(`
      https://qbreader.org/api/check-answer?answerline=${encodeURIComponent(
        data[0].answer
      )}&givenAnswer=${answer}
      `);
  
      const res = await req.json();
      if (res["directive"] == "accept") {
        alert("Correct!");
        setSessionCorrect(sessionCorrect => sessionCorrect + 1)
        tossupStats.addCorrect(data[0].category.toLowerCase().split(' ').join('') as ValidCategory)
      } else if (res['directive'] == 'prompt') {
        alert("Prompt! try again");
      } else {
        alert(`Incorrect - the correct answer was ${data[0].answer}`)
        setSessionIncorrect(sessionIncorrect => sessionIncorrect + 1)
        tossupStats.addIncorrect(data[0].category.toLowerCase().split(' ').join('') as ValidCategory)
      }
      if (res["directive"] == "accept") {
        setAnswer("");
        setI(0);
        setOpen(false)
        await getTossup();
      }
      if (res['directive'] == 'reject') {
        setI(data[0].question.split(" ").length)
        setOpen(false)
      }
  
    } catch (e) {
      console.warn(e)
    }
  };

  useInterval(() => {
    if (!isLoading && !disable && i <= data[0].question.split(" ").length)
      setI((i) => i + 1);
  }, 200);

  useEffect(() => {
    getTossup();
  }, []);



  const buzzButton = () => {
    setDisable((disable) => !disable);
    setOpen((open) => !open);
  };

  return (
    <View flex={1}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View flex={1}>
          <View flex={1}>
            <Text fs={10} p={"$2"}>
              {data[0].question.split(" ").slice(0, i).join(" ")}
            </Text>
          </View>
          <View style={{ position: "relative", bottom: 0 }}>
            <Text textAlign='center' mb='$2'>Session Score: {sessionScore} (✅: {sessionCorrect}, ❌: {sessionIncorrect})</Text>
            <Button onPress={() => buzzButton()}>
              <Text>Buzz</Text>
            </Button>
            <Button onPress={() => getTossup()}>
              <Text>New question</Text>
            </Button>
          </View>
          <Sheet
            forceRemoveScrollEnabled={open}
            modal={modal}
            open={open}
            onOpenChange={setOpen}
            snapPointsMode="fit"
            dismissOnSnapToBottom
            position={position}
            onPositionChange={setPosition}
            zIndex={100_000}
            animation="medium"
            moveOnKeyboardChange={true}
          >
            <Sheet.Overlay
              animation="lazy"
              enterStyle={{ opacity: 0 }}
              exitStyle={{ opacity: 0 }}
            />
            <Sheet.Handle />
            <Sheet.Frame
              padding="$4"
              justifyContent="center"
              alignItems="center"
            >
              <Button
                size="$6"
                mb="$5"
                circular
                icon={ChevronDown}
                onPress={() => { setOpen(false); setDisable(disable => !disable)}}
              />
              <Text>Type your answer here</Text>
              <Input flex={1} mt="$3" size="$4" width={200} value={answer} onChangeText={v => setAnswer(v)} />
              <Button onPress={() => checkAnswer()} mt={"$5"}>
                Submit answer
              </Button>
            </Sheet.Frame>
          </Sheet>
        </View>
      )}
    </View>
  );
}
