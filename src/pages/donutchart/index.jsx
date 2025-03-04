import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import axios from 'axios';
import Authentication from '../components/authentication';

// Dynamically load the ApexCharts library (client-side only)
const Donutchart = () => {
  const [readytodispatch, setReadytodispatch] = useState(0);
  const [onloom, setOnloom] = useState(0);
  const [onfloor, setOnFloor] = useState(0);
  const [undermending, setUndermending] = useState(0);
  const [loading, setLoading] = useState(false);
  const [apexChartLoaded, setApexChartLoaded] = useState(false);

  useEffect(() => {
    // Dynamically load ApexCharts script from CDN
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/apexcharts';
    script.onload = () => {
      setApexChartLoaded(true);  // Mark that the script has been loaded
    };
    document.body.appendChild(script);

    setLoading(true);

    axios.get('https://apitextilediwanji.work.gd:5000/beaminward', { withCredentials: true })
      .then(res => {
        const data = res.data;
        const countOnLoom = data.filter(item => item.beamstatus === "Ready to dispatch").length;
        const countonloom = data.filter(item => item.beamstatus === "on loom").length;
        const countonfloor = data.filter(item => item.beamstatus === "on floor").length;
        const countundermending = data.filter(item => item.beamstatus === "under mending").length;

        setLoading(false);

        setReadytodispatch(countOnLoom);
        setOnloom(countonloom);
        setOnFloor(countonfloor);
        setUndermending(countundermending);
      })
      .catch(err => {
        // Handle error
      });

  }, []);

  const options = {
    series: [readytodispatch, onloom, onfloor, undermending],
    chart: {
      type: 'donut',
    },
    labels: ['Ready to Dispatch', 'On Loom', 'On Floor', 'Under Mending'],
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
  };

  const chartType = 'donut';
  const chartHeight = 350;

  const auth = Authentication();

  if (!auth) {
    return null;
  }

  if (!apexChartLoaded) {
    // Wait until the script is loaded
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

  // Create chart after script load
  useEffect(() => {
    if (apexChartLoaded) {
      const chart = new window.ApexCharts(document.querySelector("#chart"), options);
      chart.render();
    }
  }, [apexChartLoaded, options]);

  return (
    <div>
      {
        loading ? (
          <div className="row" style={{ height: '350px' }}>
            <div className="d-flex justify-content-center">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>
        ) : (
          <div id="chart" style={{ height: chartHeight }}></div>
        )
      }
    </div>
  );
};

export default Donutchart;
