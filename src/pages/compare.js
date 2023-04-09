/* Imports */
import { useState, useEffect } from 'react';
import React from "react";
import axios from "axios";
import polearm from "../assets/polearm.webp";
import sword from "../assets/sword.webp";
import bow from "../assets/bow.webp";
import catalyst from "../assets/catalyst.webp";
import claymore from "../assets/claymore.webp";
import traveler from "../assets/traveler.webp";
import CompareBarChart from "../pages/components/CompareBarChart";
import ComparePieChart from "../pages/components/ComparePieChart";
import CompareRadarChart from "../pages/components/CompareRadarChart";

const Compare = () => {


    const [CharacterCard, setCharacterCard] = useState([]);
    const [Selected, setSelected] = useState([]);
    const [Selected2, setSelected2] = useState([]);

    useEffect(() => {
        axios.get('https://api.genshin.dev/characters/')
            .then(response => {

                for (let index = 0; index < response.data.length; index++) {
                    // console.log(response.data[index]);
                    axios.get('https://api.genshin.dev/characters/' + response.data[index])
                        .then(response2 => {
                            let character = response2.data
                            //console.log(character);
                            setCharacterCard(CharacterCard => [...CharacterCard, character]);

                            character["card"] = 'https://api.genshin.dev/characters/' + response.data[index] + '/card';
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

    return (
        <div className="content_container_c">
            <div className='dropdown_box_left'>
                <select className="dropdown_right" onChange={(e) => {
                    const c = CharacterCard?.find((x) => x.name === e.target.value)
                    console.log(CharacterCard);
                    console.log(c);
                    console.log(e.target.value);
                    setSelected(c);
                }} defaultValue="default">
                    <option value="default" className="dropdown-content_right">Choose an option</option>
                    {CharacterCard.filter(character => character.weapon === "Bow" && character.name !== "Gorou" && character.name !== "Kujou Sara" && character.name !== "Aloy").map((character) => (
                        <option className="dropdown-content_right" key={character.id} value={character.name} style={{ marginLeft: 200 }}>{character.name}</option>
                    ))}
                </select>

                {Selected ? (
                    <>
                        <img className="character_element_stats" src={Selected.element}></img>
                        <h1 className="character_name_stats">{Selected.name}</h1>
                        <img
                            className="character_image_stats"
                            src={Selected.card}
                            onError={(e) => { e.target.onerror = null; e.target.src = traveler }}
                        ></img>
                        <div className="boxes_c">
                            <img className="character_element_small" src={Selected.element}></img>
                            <h3 className="stats">Vision: {Selected.vision}</h3>
                        </div>
                        <div className="boxes_c">
                            <img className="character_weapon_small" src={Selected.weaponImg}></img>
                            <h3 className="stats">Weapon: {Selected.weapon}</h3>
                        </div>
                        <div className="boxes_bigger_c">
                            <h3 className="stats">Affiliation: {Selected.affiliation}</h3>
                        </div>
                        <div className="boxes_bigger_c">
                            <h3 className="stats">Constellation: {Selected.constellation}</h3>
                        </div>
                        <div className="boxes_c">
                            <h3 className="stats">Birthday: {new Date(Selected.birthday).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</h3>
                        </div>

                        {Selected && Selected.skillTalents && Selected.skillTalents[0] && Selected.skillTalents[0].upgrades.slice(0, 5).map((upgrade, index) => (
                            <React.Fragment key={index}>
                                <h3 className="character_name_stats">{upgrade.name}</h3>
                                <h3 className="character_name_stats">{upgrade.value}</h3>
                            </React.Fragment>
                        ))}

                        {Selected && Selected.skillTalents && Selected.skillTalents[0] && Selected.skillTalents[0].upgrades.slice(0, 5).length > 0 && (
                            <>
                                <div id="bar_wrapper">
                                    <CompareBarChart
                                        HitLabel={Selected.skillTalents[0].upgrades.slice(0, 5).map((upgrade) => upgrade.name)}
                                        HitData={Selected.skillTalents[0].upgrades.slice(0, 5).map((upgrade) => parseFloat(upgrade.value))}
                                    />
                                </div>
                                <div id="pie_wrapper">
                                    <ComparePieChart
                                        HitLabel={Selected.skillTalents[0].upgrades.slice(0, 5).map((upgrade) => upgrade.name)}
                                        HitData={Selected.skillTalents[0].upgrades.slice(0, 5).map((upgrade) => parseFloat(upgrade.value))}
                                    />
                                </div>
                                <div id="pie_wrapper">
                                    <CompareRadarChart
                                        HitLabel={Selected.skillTalents[0].upgrades.slice(0, 5).map((upgrade) => upgrade.name)}
                                        HitData={Selected.skillTalents[0].upgrades.slice(0, 5).map((upgrade) => parseFloat(upgrade.value))}
                                    />
                                </div>
                            </>
                        )}
                    </>
                ) : null}
            </div>

            <div className='dropdown_box_right'>
                <select className="dropdown_right" onChange={(e) => {
                    const c = CharacterCard?.find((x) => x.name === e.target.value)
                    console.log(CharacterCard);
                    console.log(c);
                    console.log(e.target.value);
                    setSelected2(c);
                }} defaultValue="default">
                    <option value="default" className="dropdown-content_right">Choose an option</option>
                    {CharacterCard.filter(character => character.weapon === "Bow" && character.name !== "Gorou" && character.name !== "Kujou Sara" && character.name !== "Aloy").map((character) => (
                        <option className="dropdown-content_right" key={character.id} value={character.name} style={{ marginLeft: 200 }}>{character.name}</option>
                    ))}
                </select>

                {Selected2 ? (
                    <>
                        <img className="character_element_stats" src={Selected2.element}></img>
                        <h1 className="character_name_stats">{Selected2.name}</h1>
                        <img
                            className="character_image_stats"
                            src={Selected2.card}
                            onError={(e) => { e.target.onerror = null; e.target.src = traveler }}
                        ></img>
                        <div className="boxes_c">
                            <img className="character_element_small" src={Selected2.element}></img>
                            <h3 className="stats">Vision: {Selected2.vision}</h3>
                        </div>
                        <div className="boxes_c">
                            <img className="character_weapon_small" src={Selected2.weaponImg}></img>
                            <h3 className="stats">Weapon: {Selected2.weapon}</h3>
                        </div>
                        <div className="boxes_bigger_c">
                            <h3 className="stats">Affiliation: {Selected2.affiliation}</h3>
                        </div>
                        <div className="boxes_bigger_c">
                            <h3 className="stats">Constellation: {Selected2.constellation}</h3>
                        </div>
                        <div className="boxes_c">
                            <h3 className="stats">Birthday: {new Date(Selected2.birthday).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</h3>
                        </div>

                        {Selected2 && Selected2.skillTalents && Selected2.skillTalents[0] && Selected2.skillTalents[0].upgrades.slice(0, 5).map((upgrade, index) => (
                            <React.Fragment key={index}>
                                <h3 className="character_name_stats">{upgrade.name}</h3>
                                <h3 className="character_name_stats">{upgrade.value}</h3>
                            </React.Fragment>
                        ))}

                        {Selected2 && Selected2.skillTalents && Selected.skillTalents[0] && Selected.skillTalents[0].upgrades.slice(0, 5).length > 0 && (
                            <>
                                <div id="bar_wrapper">
                                    <CompareBarChart
                                        HitLabel={Selected2.skillTalents[0].upgrades.slice(0, 5).map((upgrade) => upgrade.name)}
                                        HitData={Selected2.skillTalents[0].upgrades.slice(0, 5).map((upgrade) => parseFloat(upgrade.value))}
                                    />
                                </div>
                                <div id="pie_wrapper">
                                    <ComparePieChart
                                        HitLabel={Selected2.skillTalents[0].upgrades.slice(0, 5).map((upgrade) => upgrade.name)}
                                        HitData={Selected2.skillTalents[0].upgrades.slice(0, 5).map((upgrade) => parseFloat(upgrade.value))}
                                    />
                                </div>
                                <div id="pie_wrapper">
                                    <CompareRadarChart
                                        HitLabel={Selected2.skillTalents[0].upgrades.slice(0, 5).map((upgrade) => upgrade.name)}
                                        HitData={Selected2.skillTalents[0].upgrades.slice(0, 5).map((upgrade) => parseFloat(upgrade.value))}
                                    />
                                </div>
                            </>
                        )}
                    </>
                ) : null}
            </div>
        </div>

    );
}



export default Compare;