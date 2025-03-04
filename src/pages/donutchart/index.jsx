import React, { useEffect, useState } from 'react';
// import ApexCharts from 'react-apexcharts';

import dynamic from 'next/dynamic';

const apexcharts = dynamic(() => import('react-apexcharts'), {
  ssr: false,  // Disable server-side rendering for this component
});

import axios from 'axios';
import Authentication from '../components/authentication';





const Donutchart = () => {
    const [readytodispatch, setReadytodispatch] = useState(0);
    const [onloom, setOnloom] = useState(0)
    const [onfloor, setOnFloor] = useState(0)
    const [undermending, setUndermending] = useState(0);
    const [loading, setLoading] = useState(false);




    useEffect(() => {
        setLoading(true);

        axios.get('http://api.textilediwanji.com/beaminward', { withCredentials: true })
            .then(res => {
                //console.log(res.data)

                const data = res.data;
                const countOnLoom = data.filter(item => item.beamstatus === "Ready to dispatch").length;
                const countonloom = data.filter(item => item.beamstatus === "on loom").length;
                const countonfloor = data.filter(item => item.beamstatus === "on floor").length;
                const countundermending = data.filter(item => item.beamstatus === "under mending").length

                setLoading(false);


                setReadytodispatch(countOnLoom)
                setOnloom(countonloom);
                setOnFloor(countonfloor);
                setUndermending(countundermending);





            })
            .catch(err => {
                //console.log(err);
            })
    }, [])


    const options = {
        series: [readytodispatch, onloom, onfloor, undermending], // Series data as an array of numbers
        chart: {
            type: 'donut',
        },
        responsive: [{
            // breakpoint: 480,
            // options: {
            //     chart: {
            //         width: 100
            //     }
            // }
        }],
        labels: ['Ready to Dispatch', 'On Loom', 'On Floor', 'Under Mending'],
        legend: {
            show: false // Hide the legend
        },
        dataLabels: {
            enabled: false // Hide data labels
        }
    };

    // Define the chart's type and height
    const chartType = 'donut';
    const chartHeight = 350; // You can adjust this value

    const auth = Authentication();
 

    if (!auth) {
      return null;
  }

    return (
        <>
            {
                loading ?
                    <div className='row' style={{ height: "350px" }}>
                        <div className="d-flex justify-content-center">
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>

                    </div> :
                    <div>
                        <apexcharts
                            options={options}
                            series={options.series}
                            type={chartType}
                            height={chartHeight}
                        />
                    </div>


            }






        </>
    );
}


export default Donutchart