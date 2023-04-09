import React from 'react'
import { Bar } from 'react-chartjs-2'
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

function CompareBarChart({ HitLabel, HitData }) {

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
        <Bar data={data} />

    )
}
export default CompareBarChart