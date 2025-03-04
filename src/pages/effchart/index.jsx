import React, { useEffect, useState } from 'react';
import axios from 'axios';
import getCurrentMonth from '../currentmonth';
import Authentication from '../components/authentication';

// Effchart component to display the average efficiency chart
const Effchart = () => {
  const [dates, setDates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [eff, setEff] = useState([]);
  const [apexChartLoaded, setApexChartLoaded] = useState(false); // Track if the ApexCharts script is loaded

  const currentmonth = getCurrentMonth();

  // Generate dates for the current month
  useEffect(() => {
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

  // Load the efficiency data from the API
  useEffect(() => {
    setLoading(true);
    axios.get('https://apitextilediwanji.work.gd/productiondashboard', { withCredentials: true })
      .then(res => {
        setLoading(false);
        const mydata = res.data;

        const avrageeff = mydata.map(ind => ({
          date: ind.date,
          eff: ind.aeff
        }));

        if (avrageeff) {
          const mappedeff = avrageeff.map(item => ({
            date: new Date(item.date).toLocaleDateString('en-GB'),
            value: item.eff || null
          }));

          const effmap = mappedeff.reduce((acc, item) => {
            acc[item.date] = item.value;
            return acc;
          }, {});

          setEff(effmap);
        }
      })
      .catch(err => {
        console.error('API error:', err);
      });
  }, []);

  const effdata = dates.map(date => eff[date] || null);

  const lineOptions2 = {
    chart: {
      type: 'line',
      height: 350,
    },
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    colors: ['#FF5733'],
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
        text: 'Average Efficiency',
      },
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + " averageeff";
        },
      },
    },
    grid: {
      show: false, // Hide grid lines
    },
  };

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
      setApexChartLoaded(true); // Mark that the script has finished loading
    };
    document.body.appendChild(script);
  }, []);

  // Wait until the script is loaded before rendering the chart
  if (!apexChartLoaded) {
    return (
      <div className="row" style={{ height: '350px' }}>
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  // Render the chart after ApexCharts is loaded
  useEffect(() => {
    if (apexChartLoaded) {
      const chart = new window.ApexCharts(document.querySelector("#chart"), lineOptions2);
      chart.render();
    }
  }, [apexChartLoaded, lineOptions2]);

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
            <div id="chart" style={{ height: 250 }}></div>

            <div className='d-flex align-items-center'>
              <div className=' ms-3 mb-2 mt-1' style={{ width: "14px", height: "10px", background: "#FF7051" }}></div>
              <span className='ms-3 mb-2'>: Total Eff per day for month of {currentmonth}</span>
            </div>
          </div>
        )
      }
    </>
  );
}

export default Effchart;
