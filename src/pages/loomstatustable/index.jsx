import axios from "axios";
import React, { useEffect, useState } from "react";

import { inputdateformat } from 'reactjs-dateformat';
import Authentication from "../components/authentication";



const Loomstatustable = () => {
    const [details, setDetails] = useState([]);
    const [loading, setLoading] = useState(false)

    const [combinedData, setCombinedData] = useState([]);
    const [loomstatus, setLoomstatus] = useState([]);

    useEffect(() => {
        setLoading(true)
        axios.get('https://apitextilediwanji.work.gd/loomstatusdata', { withCredentials: true })
            .then(res => {
                const ldata = res.data;
                const sortedloomdata = [...ldata].sort((a, b) => a.loomno - b.loomno);
                setDetails(sortedloomdata);
                setLoading(false)
            })
            .catch(err => {
                // console.log(err);
            });
    }, []);



    useEffect(() => {
        axios.get('https://apitextilediwanji.work.gd/production', { withCredentials: true })
            .then(res => {
                // Assuming res.data is an array and contains the production data
                const productionData = res.data;

                // Array to hold the combined designnumber and mtr values
                const combinedArray = [];

                productionData.forEach(item => {
                    // Parse the JSON string in productiontable
                    const productionTableArray = JSON.parse(item.productiontable);

                    // Extract designnumber and mtr and add them to combinedArray
                    productionTableArray.forEach(record => {
                        combinedArray.push({
                            designnumber: record.designno,
                            mtr: record.mtr
                        });
                    });
                });

                // Update state with combined array
                setCombinedData(combinedArray);

                // Log the combinedArray to the console
                // console.log(combinedArray);
            })
            .catch(err => {
                console.error('Error fetching data:', err);
            });
    }, []);



    const totalmeter = (designnumber) => {
        // Convert the mtr values from strings to numbers for accurate summation
        const total = combinedData.reduce((acc, ind) => {
            if (ind.designnumber === designnumber) {
                // Add the numeric value of mtr to the accumulator
                return acc + Number(ind.mtr);
            }
            // Otherwise, return the accumulator as is
            return acc;
        }, 0);

        return total;
    };


    const auth = Authentication();
 

    if (!auth) {
      return null;
  }


    return (
        <>
            <div>
                {
                    loading ?
                        <div className="d-flex justify-content-center">
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div> :
                        <table className='table table-hover text-center'>
                            <thead className='border-top'>
                                <tr>
                                    <th>LOOM NO</th>
                                    <th>Loom in date</th>
                                    <th>SET NO</th>
                                    <th>DESIGN NO</th>
                                    <th>REED</th>
                                    <th>PICK</th>
                                    <th>STATUS</th>
                                    <th>PROGRESS</th>
                                    <th>SIZING MTR</th>
                                    <th>WOVEN MTR</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    details && details.map((o, index) => (
                                        <tr key={index}>
                                            <td>{o.loomno}</td>
                                            <td>{inputdateformat(o.date)}</td>
                                            <td>{o.SetNo}</td>
                                            <td>{o.DesignNo}</td>
                                            <td>{o.Reed}</td>
                                            <td>{o.Pick}</td>
                                            <td><span className="badge rounded-pill text-bg-success">on loom</span></td>
                                            <td>


                                                <div className="progress mt-2 d-flex" role="progressbar" aria-label="Example 12px high" aria-valuenow={(totalmeter(o.DesignNo) / o.SizingMtr) * 100} aria-valuemin="0" aria-valuemax="100" style={{ height: "12px" }}>
                                                    <div className="progress-bar" style={{ width: `${(totalmeter(o.DesignNo) / o.SizingMtr) * 100}%` }}>{`${((totalmeter(o.DesignNo) / o.SizingMtr) * 100).toFixed(0)}%`}</div>

                                                </div>




                                            </td>
                                            <td>{o.SizingMtr}</td>
                                            <td>{totalmeter(o.DesignNo)}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>

                }

            </div>
        </>
    );
};

export default Loomstatustable;
