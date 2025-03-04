import axios from 'axios';
import { useEffect, useState } from 'react';
import Authentication from '../components/authentication';

const Lineareachart = () => {
    const [bills, setBills] = useState([]);
    const [chartOptions, setChartOptions] = useState({});
    const [chartSeries, setChartSeries] = useState([]);
    const [loading, setLoading] = useState(false);
    const [apexChartLoaded, setApexChartLoaded] = useState(false); // Track if ApexCharts is loaded

    useEffect(() => {
        setLoading(true);
        axios.get('http://api.textilediwanji.com:5000/productiondashboard', { withCredentials: true })
            .then(res => {
                const mydata = res.data;
                setLoading(false);

                const billing = mydata.map(ind => ({
                    date: ind.date,
                    bill: ind.bill
                }));

                if (billing) {
                    const mappedbill = billing.map(item => ({
                        date: new Date(item.date).toLocaleDateString('en-GB'),
                        value: item.bill || null
                    }));

                    const billmap = mappedbill.reduce((acc, item) => {
                        acc[item.date] = item.value;
                        return acc;
                    }, {});

                    setBills(billmap);
                }

                const billMap = new Map(billing.map(item => [item.date, item.bill]));

                // Extract dates and create the series data
                const dates = billing.map(item => item.date);
                const billdata = dates.map(date => billMap.get(date) || null);

                // Chart options configuration
                const options = {
                    chart: {
                        type: 'area',
                    },
                    dataLabels: {
                        enabled: false
                    },
                    stroke: {
                        curve: 'smooth'
                    },
                    xaxis: {
                        categories: dates,
                        labels: {
                            show: false, // Hide the x-axis labels
                        },
                    },
                    yaxis: {
                        title: {
                            text: 'Bill Amount (Rs)'
                        }
                    },
                    tooltip: {
                        x: {
                            format: 'dd/MM/yy'
                        }
                    },
                    grid: {
                        show: false, // Hide grid lines
                    },
                    colors: ['#00E396']
                };

                // Chart series configuration
                const series = [
                    {
                        name: 'Billing Amount',
                        data: billdata
                    }
                ];

                // Update state with options and series
                setChartOptions(options);
                setChartSeries(series);
            })
            .catch(err => {
                console.error('API error:', err);
            });
    }, []);

    // Authentication check
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

    // Wait until the script is loaded before rendering the chart
    useEffect(() => {
        if (apexChartLoaded && chartOptions && chartSeries.length > 0) {
            const chart = new window.ApexCharts(document.querySelector("#chart"), chartOptions);
            chart.render();
        }
    }, [apexChartLoaded, chartOptions, chartSeries]);

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
                    </div>
                )
            }
        </>
    );
};

export default Lineareachart;
