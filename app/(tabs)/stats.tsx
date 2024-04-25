import {Text, YStack} from 'tamagui'
import { useTossupStats } from '../stores/StatsStores'

export default function StatsScreen() {
    const {correct, incorrect} = useTossupStats()
    return (
        <>
            <YStack gap='$2'>
                <Text>Questions correct: {correct}</Text>
                <Text>Questions incorrect: {incorrect}</Text>
            </YStack>
        </>
    )
}