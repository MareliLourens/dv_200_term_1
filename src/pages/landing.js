/* Imports */
import React from "react";
import { useState, useEffect } from "react";
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
import BarChart from './components/BarChart';

function Landing() {

  const [CharacterCard, setCharacterCard] = useState([]);
  const [Selected, setSelected] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0)


  useEffect(() => {
    axios.get('https://api.genshin.dev/characters/')
      .then(response => {

        for (let index = 0; index < response.data.length; index++) {
          // console.log(response.data[index]);
          axios.get('https://api.genshin.dev/characters/' + response.data[index])
            .then(response2 => {
              let character = response2.data
              //console.log(response.data[index]);
              character["icon"] = 'https://api.genshin.dev/characters/' + response.data[index] + '/icon-big';
              character["card"] = 'https://api.genshin.dev/characters/' + response.data[index] + '/card';
              character["element"] = 'https://api.genshin.dev/elements/' + character.vision.toLowerCase() + '/icon';
              character["nationData"] = 'https://api.genshin.dev/nations/' + character.nation.toLowerCase() + '/icon';



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

              if (character.nation.toLowerCase() == "sumeru") {
                character["nationImg"] = sumeru;
              }
              else if (character.nation.toLowerCase() == "snezhnaya") {
                character["nationImg"] = snezhnaya;
              }
              else if (character.nation.toLowerCase() == "outlander"){
                character["nationImg"] = outlander;
              }
              else if (character.nation.toLowerCase() == "unknown"){
                character["nationImg"] = unknown;
              }
              else{
                character["nationImg"] = character.nationData;
              }
              console.log(character);

              setCharacterCard(CharacterCard => [...CharacterCard, character]);
            })
        }
      })
  }, []);


  function selectedCharacter(character) {
    // console.log(character);

    let addCharacter = false
    for (let i = 0; i < Selected.length; i++) {
      if (Selected[i].name == character.name) {
        // console.log("Already Selected!");
        setSelected(Selected.filter(select => select.name !== character.name));
        addCharacter = false
      } else {
        addCharacter = true;

      }
    }

    if (addCharacter) {
      if (Selected.length < 4) {
        // console.log("Adding Character");
        setSelected(Selected => [...Selected, character]);
      } else {
        // console.log("Too many selected!");
      }
    }

    if (Selected.length == 0) {
      // console.log("First Item");
      setSelected(Selected => [...Selected, character]);
    }

    setSelectedIndex(Selected.length)
  }

  return (
    <div className="content_container">

      {Selected && (
        <div className="content_left_top">

          <div className="character" >
            <img className="character_element" src={Selected[0]?.element}></img>
            <h3 className="character_name">{Selected[0]?.name}</h3>
            <img
              className="character_image"
              src={Selected[0]?.icon}
              onError={(e) => { e.target.onerror = null; e.target.src = traveler }}
            ></img>
            <img className="character_weapon" src={Selected[0]?.weaponImg}></img>
            <div className="character_nation_background"></div>
            <img className="character_nation" src={Selected[0]?.nationImg}></img>
          </div>

          <div className="character" >
            <img className="character_element" src={Selected[1]?.element}></img>
            <h3 className="character_name">{Selected[1]?.name}</h3>
            <img
              className="character_image"
              src={Selected[1]?.icon}
              onError={(e) => { e.target.onerror = null; e.target.src = traveler }}
            ></img>
            <img className="character_weapon" src={Selected[1]?.weaponImg}></img>
            <div className="character_nation_background"></div>
            <img className="character_nation" src={Selected[1]?.nationImg}></img>
          </div>

          <div className="character" >
            <img className="character_element" src={Selected[2]?.element}></img>
            <h3 className="character_name">{Selected[2]?.name}</h3>
            <img
              className="character_image"
              src={Selected[2]?.icon}
              onError={(e) => { e.target.onerror = null; e.target.src = traveler }}
            ></img>
            <img className="character_weapon" src={Selected[2]?.weaponImg}></img>
            <div className="character_nation_background"></div>
            <img className="character_nation" src={Selected[2]?.nationImg}></img>
          </div>

          <div className="character" >
            <img className="character_element" src={Selected[3]?.element}></img>
            <h3 className="character_name">{Selected[3]?.name}</h3>
            <img
              className="character_image"
              src={Selected[3]?.icon}
              onError={(e) => { e.target.onerror = null; e.target.src = traveler }}
            ></img>
            <img className="character_weapon" src={Selected[3]?.weaponImg}></img>
            <div className="character_nation_background"></div>
            <img className="character_nation" src={Selected[3]?.nationImg}></img>
          </div>

        </div>
      )}



      <div className="content_left_bottom">
        <div className="all_characters">

          {CharacterCard.map((character) => (
            <div className="character_pick" onClick={() => {
              // setSelected(character);
              selectedCharacter(character)
              // console.log(character);
            }}>
              <img className="character_element" src={character.element}></img>
              <h3 className="character_name">{character.name}</h3>
              <img
                className="character_image"
                src={character.icon}
                onError={(e) => { e.target.onerror = null; e.target.src = traveler }}

              ></img>
              <img className="character_weapon" src={character.weaponImg}></img>
              <div className="character_nation_background"></div>
              <img className="character_nation" src={character.nationImg}></img>
            </div>
          ))}

        </div>
      </div>


      {Selected && (
        <div className="content_right">
          <div className="content_right_top">
            <BarChart characters={Selected} />
          </div>
          <div className="content_right_bottom">
            <img className="character_element_stats" src={Selected[selectedIndex]?.element}></img>
            <h1 className="character_name_stats">{Selected[selectedIndex]?.name}</h1>
            <img
              className="character_image_stats"
              src={Selected[selectedIndex]?.card}
              onError={(e) => { e.target.onerror = null; e.target.src = traveler }}
            ></img>
            <div className="title_stats">
              <h2>{Selected[selectedIndex]?.title}</h2>
            </div>
            <div className="boxes">
              <img className="character_element_small" src={Selected[selectedIndex]?.element}></img>
              <h4 className="stats">Vision: {Selected[selectedIndex]?.vision}</h4>
            </div>
            <div className="boxes">
              <img className="character_weapon_small" src={Selected[selectedIndex]?.weaponImg}></img>
              <h4 className="stats">Weapon: {Selected[selectedIndex]?.weapon}</h4>
            </div>
            <div className="boxes_bigger">
              <h4 className="stats">Affiliation: {Selected[selectedIndex]?.affiliation}</h4>
            </div>
            <div className="boxes_bigger">
              <h4 className="stats">Constellation: {Selected[selectedIndex]?.constellation}</h4>
            </div>
            <div className="boxes">
              <h4 className="stats">Birthday: {new Date(Selected[selectedIndex]?.birthday).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</h4>
            </div>

          </div>
        </div>
      )}
    </div>
  )

}

export default Landing;