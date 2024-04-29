import { useState, useEffect, useRef } from "react";
import { Text, View, Button, Input, Sheet } from "tamagui";
import { ActivityIndicator, Pressable } from "react-native";
import { useTossupSettings } from "../stores/TossupSettingsStore";
import { useTossupStats } from "../stores/StatsStores";
import type { ValidCategory } from "../stores/StatsStores";

type Bonus = {
  leadin: string;
  parts: [string, string, string];
  answer: [string, string, string];
  category: string;
};
export default function TabOneScreen() {
  const [data, setData] = useState<Bonus[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [i, setI] = useState(0);
  const [disable, setDisable] = useState(false);
  const [answer, setAnswer] = useState("");
  const [position, setPosition] = useState(0);
  const [open, setOpen] = useState(false);
  const [sessionCorrect, setSessionCorrect] = useState(0)
  const [sessionIncorrect, setSessionIncorrect] = useState(0)
  const sessionScore = (sessionCorrect * 10) + (sessionIncorrect * -5)
  const spMode = "fit";
  const modal = false;
  const threePartBonuses = true;
  var n = 0;
  const tossupSettings = useTossupSettings()
  const bonusStats = useTossupStats()
  

  const getBonus = async () => {
    setLoading(true);
    try {
      const diffsToUse = [...tossupSettings.difficulties.keys()].filter(x => tossupSettings.difficulties[x]).map(z => z+1).map(zz => `&difficulties=${zz}`).join('')
      const catsToUse = tossupSettings.cat.map((c: any) => `&categories=${c}`)
      const req = await fetch(`https://qbreader.org/api/random-bonus?number=1${diffsToUse}${catsToUse}`);
      const res = await req.json();
      setData(res.bonuses);
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
        data[0].answer[n]
      )}&givenAnswer=${answer}
      `);
  
      const res = await req.json();
      if (res["directive"] == "accept") {
        alert("Correct!");
        setSessionCorrect((sessionCorrect: number) => sessionCorrect + 1)
        bonusStats.addCorrect(data[0].category.toLowerCase().split(' ').join('') as ValidCategory)
        n = n+1
      } 
      else {
        alert(`Incorrect - the correct answer was ${data[0].answer}`)
        setSessionIncorrect((sessionIncorrect: number) => sessionIncorrect + 1)
        bonusStats.addIncorrect(data[0].category.toLowerCase().split(' ').join('') as ValidCategory)
        n = n+1
      }
      if (res["directive"] == "accept") {
        setAnswer("");
        setI(0);
        setOpen(false)
        await getBonus();
      }
      if (res['directive'] == 'reject') {
        setI(data[0].parts[n].split(" ").length)
        setOpen(false)
      }
  
    } catch (e) {
      console.warn(e)
    }
  };
  useEffect(() => {
    getBonus();
  }, []);

  return (
    <View flex = {1}>
      useEffect()
      <View flex = {1}>
        {data[0].parts[0].split(" ").slice(0, i).join(" ")}
      </View>
    </View>
  )

}
