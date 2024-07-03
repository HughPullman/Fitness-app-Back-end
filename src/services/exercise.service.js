import axios from "axios";

const findExercises = async ({ searchValue, selectedType, selectedMuscle, selectedDifficulty }) => {
    let url = process.env.EXERCISE_API + "?";
    if (searchValue !== "") url = url + `name=${searchValue}&`
    if (selectedType !== "") url = url + `type=${selectedType}&`
    if (selectedMuscle !== "") url = url + `muscle=${selectedMuscle}&`
    if (selectedDifficulty !== "") url = url + `difficulty=${selectedDifficulty}`
    try {
        const exerciseRes = await axios.get(
            url,
            { headers: { 'X-Api-Key': `${process.env.API_KEY}` } });
        return exerciseRes.data;
    } catch (e) {
        throw new Error({ error: e.message });
    }
};

export const exerciseService = {
    findExercises
};