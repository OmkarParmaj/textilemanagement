import React, { useEffect, useState } from 'react';
import axios from 'axios';
import getCurrentMonth from '../currentmonth';
import Authentication from '../components/authentication';

const Meterlinechart = () => {

    const [mtrData, setMtrData] = useState({});
    const [dates, setDates] = useState([]);
    const [loading, setLoading] = useState(false);
    const [apexChartLoaded, setApexChartLoaded] = useState(false); // Track if ApexCharts is loaded

    const currentmonth = getCurrentMonth();

    useEffect(() => {
        // Generate dates for the current month
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth();

        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);

        const datesArray = [];

        for (let day = firstDay.getDate(); day <= lastDay.getDate(); day++) {
            const date = new Date(year, month, day);
            datesArray.push(date.toLocaleDateString('en-GB')); // Format: DD/MM/YYYY
        }

        setDates(datesArray);
    }, []);

    useEffect(() => {
        setLoading(true);
        axios.get('http://api.textilediwanji.com:5000/productiondashboard', { withCredentials: true })
            .then(res => {
                setLoading(false);
                const mydata = res.data;

                const readydata = mydata.map(ind => ({
                    date: ind.date,
                    meter: ind.avragemtr
                }));

                const mtrArray = readydata || [];

                if (Array.isArray(mtrArray) && mtrArray.length > 0) {
                    const mappedData = mtrArray.map(item => ({
                        date: new Date(item.date).toLocaleDateString('en-GB'),
                        value: item.meter || null
                    }));

                    const mtrMap = mappedData.reduce((acc, item) => {
                        acc[item.date] = item.value;
                        return acc;
                    }, {});

                    setMtrData(mtrMap);
                } else {
                    console.error('Expected avragemtr to be a non-empty array, but got:', mtrArray);
                }
            })
            .catch(err => {
                console.error('API error:', err);
            });
    }, []);

    const lineOptions = {
        chart: {
            type: 'line',
            height: 350,
        },
        stroke: {
            curve: 'smooth',
            width: 2,
        },
        colors: ['#FFE15D'],
        dataLabels: {
            enabled: false,
        },
        xaxis: {
            categories: dates,
            labels: {
                show: false, // Hide the x-axis labels
            },
        },
        yaxis: {
            title: {
                text: 'Average Meter (mtr)',
            },
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return val + " avragemtr";
                },
            },
        },
        grid: {
            show: false, // Hide grid lines
        },
    };

    const chartData = dates.map(date => mtrData[date] || null);

    const auth = Authentication();

    if (!auth) {
        return null;
    }

    // Dynamically load the ApexCharts library from CDN
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/apexcharts';
        script.onload = () => {
            setApexChartLoaded(true); // Mark as loaded when script is ready
        };
        document.body.appendChild(script);
    }, []);

    // Render the chart when ApexCharts is loaded
    useEffect(() => {
        if (apexChartLoaded && chartOptions && chartData.length > 0) {
            const chart = new window.ApexCharts(document.querySelector("#chart"), lineOptions);
            chart.render();
        }
    }, [apexChartLoaded, chartOptions, chartData]);

    return (
        <>
            {
                loading ? (
                    <div className='row' style={{ height: "350px" }}>
                        <div className="d-flex justify-content-center">
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div>
                        {/* Create a container for the chart */}
                        <div id="chart" style={{ height: 350 }}></div>
                        <div className='d-flex align-items-center'>
                            <div className='ms-3 mb-2 mt-1' style={{ width: "14px", height: "10px", background: "#FFE15D" }}></div>
                            <span className='ms-3 mb-2'>: Total meter per day for the month of {currentmonth}</span>
                        </div>
                    </div>
                )
            }
        </>
    );
};

export default Meterlinechart;
