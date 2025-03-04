import React, { useEffect, useState } from 'react';
import axios from 'axios';
import getCurrentMonth from '../currentmonth';
import Authentication from '../components/authentication';

const Mtrbarchart = () => {

    const [mtrData, setMtrData] = useState({});
    const [dates, setDates] = useState([]);
    const [totalmtr, setTotalmtr] = useState(0);
    const [loading, setLoading] = useState(false);
    const [apexChartLoaded, setApexChartLoaded] = useState(false); // Track ApexCharts loading

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
        axios.get('https://apitextilediwanji.work.gd:5000/productiondashboard', { withCredentials: true })
            .then(res => {
                setLoading(false);
                const mydata = res.data;

                // Calculate total meter
                const totatmtr = mydata.reduce((acc, inde) => acc + inde.avragemtr, 0);
                const formattedTotal = totatmtr.toLocaleString();
                setTotalmtr(formattedTotal);

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

    const chartData = dates.map(date => mtrData[date] || null);

    const barOptions = {
        chart: {
            type: 'bar',
            height: 350,
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded',
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            show: true,
            width: 2,
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
        fill: {
            opacity: 1,
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
        if (apexChartLoaded && chartData.length > 0) {
            const chart = new window.ApexCharts(document.querySelector("#chart"), barOptions);
            chart.render();
        }
    }, [apexChartLoaded, chartData]);

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
                        <div className="row ">
                            <div className='col-md-6'>
                                <h4 className='mt-3 ps-3 '>Total meters</h4>
                                <p className='ps-3 mb-2 mt-0' style={{ fontSize: "12px" }}>Month of {currentmonth}</p>
                            </div>
                            <div className='col-md-6 d-flex justify-content-end'>
                                <h4 className='mt-3 pe-3 mb-2'>{totalmtr}</h4>
                            </div>
                        </div>
                        <div className='ps-3 pe-3 '>
                            {/* Chart container */}
                            <div id="chart" style={{ height: 350 }}></div>
                        </div>

                        <div className='row '>
                            <div className='col-12 ps-3 d-flex align-items-center'>
                                <div className='bg-primary ms-3 mb-2' style={{ width: "14px", height: "10px" }}></div>
                                <span className='ms-3 mb-2'>: Total meter per day for the month of {currentmonth}</span>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    );
};

export default Mtrbarchart;
