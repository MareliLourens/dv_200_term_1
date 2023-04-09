import React from 'react'
import { Line } from 'react-chartjs-2'
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

function LineChart(weaponType) {

  const [WeaponCard, setWeaponCard] = useState([]);

  const [weaponLabels, setWeaponLabels] = useState();
  const [weaponStats, setWeaponStats] = useState();
  const [weaponRarity, setWeaponRarity] = useState();

  useEffect(() => {
    console.log(weaponType);
    axios.get('https://api.genshin.dev/weapons/')
      .then(response3 => {
        const weapons = response3.data;

        const weaponCards = [];
        let pushedWeaponNames = [];
        let pushedWeaponStats = [];
        let pushedWeaponRarity = [];

        for (let index = 0; index < response3.data.length; index++) {
          axios.get('https://api.genshin.dev/weapons/' + response3.data[index])
            .then(response4 => {
              // console.log(weaponType.weaponType);
              // console.log(response4.data.type);
              if (weaponType.weaponType == response4.data.type) {
                // console.log(response4.data);
                let weapon = response4.data
                setWeaponCard(WeaponCard => [...WeaponCard, weapon]);

                //console.log(weapon.name);
                pushedWeaponNames.push(weapon.name);

                // for line chart data must match this following structure [{x:1,y:1},{x:1,y:1},{x:1,y:1}]
                if (weapon.baseAttack > 0) {
                  pushedWeaponStats.push({ x: weapon.name, y: weapon.baseAttack })
                } else if (weapon.baseAttack > 0) {
                  pushedWeaponStats.push({ x: weapon.name, y: weapon.baseattack })
                } else {
                  pushedWeaponStats.push({ x: weapon.name, y: weapon.BaseAttack })
                }

                if (weapon.rarity > 0) {
                  pushedWeaponRarity.push({ x: weapon.name, y: weapon.rarity })
                } else {
                  pushedWeaponRarity.push({ x: weapon.name, y: weapon.rarity })
                }
                // pushedWeaponStats.push({x:weapon.name, y:weapon.baseAttack}) //This is where the API falls short, some of the datapoints are written as baseattack, and others are baseAttack =============================



                weaponCards.push(weapon);
              }


            })
        } setWeaponCard(weaponCards);
        setWeaponLabels(pushedWeaponNames);
        setWeaponStats(pushedWeaponStats);
        setWeaponRarity(pushedWeaponRarity);



      })

  }, [weaponType]);


  const labels = weaponLabels;





  const data = {
    labels,
    datasets: [
      {
        label: "Base Attack",
        data: weaponStats,
        tension: 0.5,
      },
      {
        label: "Rarity",
        data: weaponRarity,
        tension: 0.5,
      },
    ],
  };

  return (
    <Line height={80} data={data} />

  )
}

export default LineChart