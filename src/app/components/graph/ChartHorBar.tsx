"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useAppContext } from "@/context/AppContext"; 

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface YearMonth {
    year_month: string;
}

interface ChartData {
    labels: string[];
    datasets: {
        data: number[];
        backgroundColor: string[];
        borderColor: string[];
        borderWidth: number;
    }[];
}
interface AgeGroupData {
    age_group: string;
    total_users: number;
    usage_rate: string;
}

const ChartHorBar: React.FC = () => {
    const { yearMonth, setAgeGroupData } = useAppContext();
    const [chartData, setChartData] = useState<ChartData>({
        labels: [],
        datasets: [{
            data: [],
            backgroundColor: [
                'rgba(232, 117, 26, 0.8)',
                'rgba(253, 164, 3, 0.8)',
                'rgba(137, 129, 33, 0.8)',
                'rgba(229, 194, 135, 0.8)',
                'rgba(167, 146, 119, 0.8)'
            ],
            borderColor: [
                'rgba(232, 117, 26)',
                'rgba(253, 164, 3)',
                'rgba(137, 129, 33)',
                'rgba(229, 194, 135)',
                'rgba(167, 146, 119)'
            ],
            borderWidth: 1
        }]
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/usage-group/${yearMonth.year_month}`);
                const ageGroupData = response.data.age_group_data as AgeGroupData[];
                console.log(response.data.age_group_data);
                console.log("Age Group Data:", ageGroupData);
                let totalUsers = ageGroupData.reduce((sum, group) => sum + group.total_users, 0);
                
                const newAgeGroupData = ageGroupData.map(group => ({
                    ...group,
                    usage_rate: ((group.total_users / totalUsers) * 100).toFixed(2)
                }));
                
                setAgeGroupData(newAgeGroupData); 

                setChartData({
                    labels: newAgeGroupData.map(data => data.age_group),
                    datasets: [{
                        data: newAgeGroupData.map(data => parseFloat(data.usage_rate)),
                        backgroundColor: chartData.datasets[0].backgroundColor,
                        borderColor: chartData.datasets[0].borderColor,
                        borderWidth: chartData.datasets[0].borderWidth
                    }]
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [yearMonth]);


    const options = {
        maintainAspectRatio: false,
        responsive: true,
        indexAxis: 'y',
        scales: {
            x: {
                grid: {
                    offset: false,
                },
                max: 100,
                min: 0,
                ticks: {
                    stepSize:25,
                    callback: function(value: number) {
                        return value + '%';
                    }
                }
            },
            y: {
                ticks: {
                    fontSize:14,
                    autoSkip: true,
                }
            }
        },
        plugins: {
            legend: {
                display: false
            }
        },
        layout: {
            padding: 0
        },
        barThickness: 30
    };


    return (
        <div className="flex flex-col aline-center justify-center mb-3">
            <div className="title flex aline-center justify-center mb-3"
             style={{fontSize:"14px",fontWeight:"bold"}}>
                年代別利用率
            </div>
            <div className="HorBarChart"
                style={{ 
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '40vh',
                    width: '40vh',
                    backgroundColor: 'var(--sub10)',
                    borderRadius: '10px',
                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', 
                }}>
                <div className="HorBarChart"
                    style={{ 
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '30vh',
                        width: '35vh',
                    }}>
                    <Bar data={chartData} options={options} />
                </div>
            </div>
        </div>
    );
};

export default ChartHorBar
