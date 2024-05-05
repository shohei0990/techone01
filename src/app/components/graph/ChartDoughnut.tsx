"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useAppContext } from "@/context/AppContext"; 


ChartJS.register(ArcElement, Tooltip, Legend);

interface YearMonth {
    year_month: string;
}

interface FrequencyData {
    avg: number;
    pct: number;
    gr: number;
}
  
interface UsageFrequency {
freq: {
    once: FrequencyData;
    twice: FrequencyData;
    thrice: FrequencyData;
    four: FrequencyData;
    five_plus: FrequencyData;
};
}
interface Rates {
    threeOrMore: number;
    averageUsage: number;
    threeOrMoreDifference?: string;
    averageUsageDifference?: string; 
}

const ChartDoughnut = () => {
    const { yearMonth ,prevYearMonth } = useAppContext();
    const [usageData, setUsageData] = useState<number[]>([300, 50, 100, 50, 20]);
    const [usageRates, setUsageRates] = useState<Rates>({ threeOrMore: 0, averageUsage: 0});
    const [prevRates, setPrevRates] = useState<Rates>({ threeOrMore: 0, averageUsage: 0 });


    useEffect(() => {
        console.log("Current yearMonth:", yearMonth.year_month);
        console.log("Previous yearMonth:", prevYearMonth);

        const fetchUsageFrequency = async  (month: string) => {
            try {
                const response = await axios.get(`http://localhost:8000/usage-frequency/${month}`);
                const data = response.data;
                
                if (!data || !data.freq) {
                    console.error('No frequency data available for the month:', month);
                    return { threeOrMoreRate: 0, averageUsage: 0 }; 
                }

                const totalUsers = data.freq.five_plus.avg + data.freq.four.avg + data.freq.thrice.avg + data.freq.twice.avg + data.freq.once.avg;
                const threeOrMore = data.freq.five_plus.avg + data.freq.four.avg + data.freq.thrice.avg;
                const threeOrMoreRate = totalUsers > 0 ? Math.round((threeOrMore / totalUsers) * 100) : 0;
                const averageUsage = totalUsers > 0 ? (
                    (1 * data.freq.once.avg +
                     2 * data.freq.twice.avg +
                     3 * data.freq.thrice.avg +
                     4 * data.freq.four.avg +
                     5 * data.freq.five_plus.avg) / totalUsers
                ).toFixed(1) : 0; 

                // usageDataの更新
                setUsageData([data.freq.five_plus.avg, data.freq.four.avg, data.freq.thrice.avg, data.freq.twice.avg, data.freq.once.avg]);

                // 必要なデータ形式に変換して状態を更新
                return { threeOrMoreRate, averageUsage, totalUsers }; 

            } catch (error) {
                console.error('Error fetching usage frequency data:', error);
                setUsageRates({ threeOrMore: 0, averageUsage: 0 });
            }
        };

        //前月の情報を取得
        const updateUsageData = async () => {
            if (yearMonth.year_month && prevYearMonth) {
                // 現在の月と前月のデータをフェッチ
                const currentData = await fetchUsageFrequency(yearMonth.year_month);
                const previousData = await fetchUsageFrequency(prevYearMonth);
                console.log("Current yearMonth Data:", currentData);
                console.log("Previous yearMonth Data:", previousData);   

                // 前月と比較
                const threeOrMoreDifference = previousData.totalUsers > 0 ?
                ((currentData.threeOrMoreRate - previousData.threeOrMoreRate) / previousData.totalUsers * 100).toFixed(1) : '0.0';
                const averageUsageDifference = previousData.totalUsers > 0 ?
                (currentData.averageUsage - previousData.averageUsage).toFixed(1) : '0.0';
    
                // 前月のデータをセット
                setPrevRates({
                    threeOrMore: previousData.threeOrMoreRate,
                    averageUsage: previousData.averageUsage,
                    threeOrMoreDifference,
                    averageUsageDifference
                });
    
                // 現在のデータをセット
                setUsageRates({
                    threeOrMore: currentData.threeOrMoreRate,
                    averageUsage: currentData.averageUsage,
                    threeOrMoreDifference,
                    averageUsageDifference
                });
            }
        };
        updateUsageData();
    }, [yearMonth.year_month , prevYearMonth]);


    const data = {
        labels: ['5回以上', '4回', '3回', '2回' , '1回' ],
        datasets: [{
            //label: 'My First Dataset',
            data: usageData,
            backgroundColor: [
                'rgba(232, 117, 26, 0.8)',
                'rgba(253, 164, 3, 0.8)',
                'rgba(137, 129, 33, 0.8)',
                'rgba(229, 194, 135, 0.8)',
                'rgba(167, 146, 119, 0.8)',
            ],
            hoverOffset: 4
        }]
    };

    const options = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            legend: {
                position: 'right',
                align: 'start'
            }
        }

    };

    return (
        <div className="flex flex-col aline-center justify-center">
            <div className="title flex aline-center justify-center mb-3"
             style={{fontSize:"14px",fontWeight:"bold"}}>
                一人あたりの週当たり利用回数
            </div>
            <div className="DoughnutChart"
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
                <div className="DoughnutChart flex flex-col"
                    style={{ 
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'flex-start', 
                        height: '28vh',
                        width: '35vh',
                        padding:'5px 0px 0px 0px',
                    }}>
                    <Doughnut data={data} options={options} />
                    <a style={{ fontSize: '14px', padding:'0px 0px 0px 5px'}}>平均 {usageRates.averageUsage} 回 （前月比 {usageRates.averageUsageDifference}回）</a>
                    <a style={{ fontSize: '14px', padding:'3px 0px 10px 5px'}}>週3回以上 {usageRates.threeOrMore} ％ （前月比 {usageRates.threeOrMoreDifference}％）</a>
                </div>
            </div>
        </div>
    );
};

export default ChartDoughnut;