import React from 'react'
import { Bar, Line } from 'react-chartjs-2'
import { Chart as Chartjs } from 'chart.js/auto'
import axios from "axios";
import { useState, useEffect } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

function BarChart({ characters }) {

    const [CharacterCard, setCharacterCard] = useState([]);
    const [characterLabels, setCharacterLabels] = useState();
    const [characterRarity, setCharacterRarity] = useState();

    useEffect(() => {
        // console.log(characters);
        axios.get('https://api.genshin.dev/characters/')
            .then(response3 => {
                const character = response3.data;

                const characterCards = [];
                let pushedCharacterNames = [];
                let pushedCharacterRarity = [];

                for (let index = 0; index < response3.data.length; index++) {
                    axios.get('https://api.genshin.dev/characters/' + response3.data[index])

                        .then(response4 => {
                            let character = response4.data

                            for (let i = 0; i < characters.length; i++) {
                                const element = characters[i];
                                if (characters[i].name == character.name) {
                                    setCharacterCard(CharacterCard => [...CharacterCard, character]);
                                    pushedCharacterNames.push(character.name);
                                    if (character.rarity > 0) {
                                        pushedCharacterRarity.push({ x: character.name, y: character.rarity })
                                    }

                                    characterCards.push(character);
                                }
                            }


                        })
                } setCharacterCard(characterCards);
                setCharacterLabels(pushedCharacterNames);
                setCharacterRarity(pushedCharacterRarity);



            })

    }, [characters]);


    const labels = characterLabels;





    const data = {
        labels,
        datasets: [
            {
                label: "Rarity",
                data: characterRarity,
                Color: 'Pink',
                tension: 0.5,
            },
        ],
    };

    return (
        <Bar height={170} data={data} />

    )
}

export default BarChart