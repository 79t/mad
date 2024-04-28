import {Text, YStack, View, H2, H3, ScrollView} from 'tamagui'
import { useTossupStats } from '../stores/StatsStores'

export default function StatsScreen() {
    const {correct, incorrect, catStats} = useTossupStats()
    return (
        <ScrollView ai='center' f={1}>
            <YStack gap='$2'>
                <H2 mt='$3'>Tossups</H2>
                <Text>Questions correct: {correct}</Text>
                <Text>Questions incorrect: {incorrect}</Text>
                <H3>Tossups by Category</H3>
            </YStack>
        </ScrollView>
    )
}