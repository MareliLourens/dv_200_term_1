import React from 'react'
import { Radar } from 'react-chartjs-2'
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

function CompareRadarChart({ HitLabel, HitData }) {

    const data = {
        labels: HitLabel,
        datasets: [
            {
                label: "Attack DMG",
                data: HitData,
            },
        ],
    };

    return (
        <Radar data={data} />

    )
}
export default CompareRadarChart