import { useState, useEffect } from 'react';
import React from "react";
import axios from "axios";
import polearm from "../assets/polearm.webp";
import sword from "../assets/sword.webp";
import bow from "../assets/bow.webp";
import catalyst from "../assets/catalyst.webp";
import claymore from "../assets/claymore.webp";
import sumeru from "../assets/sumeru.webp";
import snezhnaya from "../assets/snezhnaya.webp";
import outlander from "../assets/outlander.webp";
import unknown from "../assets/unknown.webp";
import traveler from "../assets/traveler.webp";
import LineChart from './components/LineChart';


import cinnabar_spindle from "../assets/cinnabar_spindle.webp";
import haran_geppaku_futsu from "../assets/haran_geppaku_futsu.webp";
import prototype_archaic from "../assets/prototype_archaic.webp";
import akuoumaru from "../assets/akuoumaru.webp";
import redhorn_stonethresher from "../assets/redhorn_stonethresher.webp";
import kaguras_verity from "../assets/kaguras_verity.webp";
import everlasting_moonglow from "../assets/everlasting_moonglow.webp";
import oathsworn_eye from "../assets/oathsworn_eye.webp";
import mouuns_moon from "../assets/mouuns_moon.webp";
import polar_star from "../assets/polar_star.webp";
import calamity_queller from "../assets/calamity_queller.webp";
import royal_spear from "../assets/royal_spear.webp";
import wavebreakers_fin from "../assets/wavebreakers_fin.webp";

function TimeLine() {

  const [CharacterCard, setCharacterCard] = useState([]);
  const [WeaponCard, setWeaponCard] = useState([]);
  const [Selected, setSelected] = useState([]);

  const [weaponLabels, setWeaponLabels] = useState();
  const [weaponStats, setWeaponStats] = useState();


  useEffect(() => {
    axios.get('https://api.genshin.dev/characters/')
      .then(response => {

        for (let index = 0; index < response.data.length; index++) {
          // console.log(response.data[index]);
          axios.get('https://api.genshin.dev/characters/' + response.data[index])

            .then(response2 => {
              let character = response2.data
              
              //console.log(character.rarity);
              setCharacterCard(CharacterCard => [...CharacterCard, character]);

              character["icon"] = 'https://api.genshin.dev/characters/' + response.data[index] + '/icon-big';
              character["element"] = 'https://api.genshin.dev/elements/' + character.vision.toLowerCase() + '/icon';
              character["nation"] = 'https://api.genshin.dev/nations/' + character.nation.toLowerCase() + '/icon';

              if (character.weapon.toLowerCase() == "polearm") {
                character["weaponImg"] = polearm;
              }

              if (character.weapon.toLowerCase() == "sword") {
                character["weaponImg"] = sword;

              }

              if (character.weapon.toLowerCase() == "bow") {
                character["weaponImg"] = bow;
              }

              if (character.weapon.toLowerCase() == "catalyst") {
                character["weaponImg"] = catalyst;
              }

              if (character.weapon.toLowerCase() == "claymore") {
                character["weaponImg"] = claymore;

              }


            })
        }
      })

  }, []);

  useEffect(() => {
    axios.get('https://api.genshin.dev/weapons/')
      .then(response3 => {
        const weapons = response3.data;
        const weaponCards = [];
        let pushedWeaponNames = [];
        let pushedWeaponStats = [];

        for (let index = 0; index < response3.data.length; index++) {
          axios.get('https://api.genshin.dev/weapons/' + response3.data[index])

            .then(response4 => {
              let weapon = response4.data
              setWeaponCard(WeaponCard => [...WeaponCard, weapon]);
              //console.log(weapon.name);
              pushedWeaponNames.push(weapon.name);
              if (weapon.baseAttack > 0) {
                pushedWeaponStats.push({ x: weapon.name, y: weapon.baseAttack })
              } else {
                pushedWeaponStats.push({ x: weapon.name, y: weapon.baseattack })
              }

              // pushedWeaponStats.push({x:weapon.name, y:weapon.baseAttack}) //This is where the API falls short, some of the datapoints are written as baseattack, and others are baseAttack =============================


              weapon["iconData"] = 'https://api.genshin.dev/weapons/' + response3.data[index] + '/icon';
              //console.log(weapon.icon); 
              if (weapon.type.toLowerCase() == "polearm") {
                weapon["weaponsImg"] = polearm;
              }

              if (weapon.type.toLowerCase() == "sword") {
                weapon["weaponsImg"] = sword;

              }

              if (weapon.type.toLowerCase() == "bow") {
                weapon["weaponsImg"] = bow;
              }

              if (weapon.type.toLowerCase() == "catalyst") {
                weapon["weaponsImg"] = catalyst;
              }

              if (weapon.type.toLowerCase() == "claymore") {
                weapon["weaponsImg"] = claymore;

              }

              if (weapon.name == "Cinnabar Spindle") {
                weapon["icon"] = cinnabar_spindle;
              }
              else if (weapon.name == "Haran Geppaku Futsu") {
                weapon["icon"] = haran_geppaku_futsu;
              }
              else if (weapon.name == "Prototype Archaic") {
                weapon["icon"] = prototype_archaic;
              }
              else if (weapon.name == "Akuoumaru") {
                weapon["icon"] = akuoumaru;
              }
              else if (weapon.name == "Redhorn Stonethresher") {
                weapon["icon"] = redhorn_stonethresher;
              }
              else if (weapon.name == "Kagura's Verity") {
                weapon["icon"] = kaguras_verity;
              }
              else if (weapon.name == "Everlasting Moonglow") {
                weapon["icon"] = everlasting_moonglow;
              }
              else if (weapon.name == "Oathsworn Eye") {
                weapon["icon"] = oathsworn_eye;
              }
              else if (weapon.name == "Mouun's Moon") {
                weapon["icon"] = mouuns_moon;
              }
              else if (weapon.name == "Polar Star") {
                weapon["icon"] = polar_star;
              }
              else if (weapon.name == "Calamity Queller") {
                weapon["icon"] = calamity_queller;
              }
              else if (weapon.name == "Royal Spear") {
                weapon["icon"] = royal_spear;
              }
              else if (weapon.name == "Wavebreaker's Fin") {
                weapon["icon"] = wavebreakers_fin;
              }
              else {
                weapon["icon"] = weapon.iconData;
              }
              weaponCards.push(weapon);
            })
        } setWeaponCard(weaponCards);
        setWeaponLabels(pushedWeaponNames);
        setWeaponStats(pushedWeaponStats)




      })

  }, []);

  const selectedWeaponType = Selected ? Selected.weapon?.toLowerCase() : 'sword';

  return (
    <div className="content_container">
      <div className="content_right_weapons">
        <div className="all_weapons">

          {/* {WeaponCard.filter((weapon) => weapon.type.toLowerCase() === 'sword').map((weapon) => (  */}
          {WeaponCard.filter((weapon) => weapon.type.toLowerCase() === selectedWeaponType).map((weapon) => (
            <div className="weapon_pick">
              <img className="weapon_type" src={weapon.weaponsImg}></img>
              <h3 className="weapon_name">{weapon.name}</h3>
              <img className="weapon_image" src={weapon.icon}></img>
              <h1 className="weapon_rarity">{weapon.rarity}</h1>
              <h1 className="weapon_attack">{weapon.baseAttack}{weapon.BaseAttack}</h1>
            </div>
          ))}

        </div>
      </div>




      <div className='dropdown_box'>
        <select class="dropdown" onChange={(e) => {
          const c = CharacterCard?.find((x) => x.name === e.target.value)
          console.log(c);
          console.log(e.target.value);
          setSelected(c);
        }} defaultValue="default">
          <option value="default" class="dropdown-content">Choose an option</option>
          {CharacterCard.map((character) => (
            <option class="dropdown-content" key={character.id} value={character.id} style={{ marginLeft: 200 }}>{character.name}</option>
          ))}
        </select>

        {Selected ? (


          <div className="character_t">
            <img className="character_element" src={Selected.element}></img>
            <h3 className="character_name">{Selected.name}</h3>
            <img
              className="character_image"
              src={Selected.icon}
              onError={(e) => { e.target.onerror = null; e.target.src = traveler }}
            ></img>
            <img className="character_weapon" src={Selected.weaponImg}></img>
            <div className="character_nation_background"></div>
            <img className="character_nation" src={Selected.nation}></img>
          </div>
        ) : null}
      </div>
      <div className="chart">
        <LineChart weaponType={Selected.weapon} />
      </div>
    </div>
  );
}



export default TimeLine;