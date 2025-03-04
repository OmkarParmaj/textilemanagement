
import React, { useEffect, useState } from 'react'



import { inputdateformat } from 'reactjs-dateformat'
import axios from 'axios';

import Authentication from '../components/authentication';




const Misprint = () => {

    const [details, setDetails] = useState([]);

    const [combinedData, setCombinedData] = useState([]);





    const [records, setRecords] = useState([]);
    const [dispatch, setDispatch] = useState([]);

    const [loading, setLoading] = useState(false);


    const today = inputdateformat(new Date())




    useEffect(() => {
        setLoading(true)
        axios.get('http://api.textilediwanji.com:5000/readytodispatchmis', { withCredentials: true })
            .then(res => {
                setDispatch(res.data);
                setLoading(false)

            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    useEffect(() => {
        setLoading(true)
        axios.get("http://api.textilediwanji.com:5000/beamstatusreportmis", { withCredentials: true })
            .then(res => {

                setRecords(res.data);
                setLoading(false)

            })
            .catch(err => {
                console.log(err)
            })
    }, [])




    useEffect(() => {
        axios.get('http://api.textilediwanji.com:5000/production', { withCredentials: true })
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





    useEffect(() => {
        setLoading(true)
        axios.get('http://api.textilediwanji.com:5000/loomstatusdata', { withCredentials: true })
            .then(res => {
                const ldata = res.data;
                const sortedloomdata = [...ldata].sort((a, b) => a.loomno - b.loomno);
                setDetails(sortedloomdata);
                setLoading(false)
            })
            .catch(err => {
                console.log(err);
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



    const handleprint = () => {
        window.print();
    }

    const auth = Authentication();


    if (!auth) {
        return null;
    }

    return (
        <>

            <div className='container-fluid'>
                <div className='row d-flex justify-content-end align-items-center dontprintmis'>
                    <div className='col-3 d-flex justify-content-end align-items-center mt-4'>
                        <button className='btn btn-primary btn-sm' onClick={handleprint}>PRINT</button>


                    </div>

                </div>
                <div className='printmis' >
                    <h4>LOOM STATUS</h4>
                    <div className='row mt-5'>
                        {
                            loading ?
                                <div className="d-flex justify-content-center">
                                    <div className="spinner-border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div>

                                :
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

                    <h4 className="mt-5">BEAM'S ON FLOOR</h4>

                    <div className='row me-4 ms-4 mb-5 scroll'>
                        {
                            loading ?
                                <div className="d-flex justify-content-center">
                                    <div className="spinner-border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div>

                                : <table className='table table-hover mt-4  text-center'   >
                                    <thead className='border border-1 '>
                                        <tr>
                                            <th>UID</th>
                                            <th>DATE</th>
                                            <th>SETNO</th>
                                            <th>DESIGN NO</th>
                                            <th>WARP COUNT</th>
                                            <th>ERFT COUNT</th>
                                            <th>REED</th>
                                            <th>PICK</th>
                                            <th>DRAWIN STATUS</th>


                                        </tr>
                                    </thead>


                                    <tbody>
                                        {records && records.map((report, index) => (
                                            <tr key={index}>
                                                <td>{report.UID}</td>
                                                <td>{inputdateformat(report.Date)}</td>
                                                <td>{report.SetNo}</td>
                                                <td>{report.DesignNo}</td>
                                                <td>{report.WarpCount}</td>
                                                <td>{report.WeftCount}</td>
                                                <td>{report.Reed}</td>
                                                <td>{report.Pick}</td>
                                                <td>
                                                    <span
                                                        className={`${report.beamstatus === "drawin completed" ? "text-bg-dark badge rounded-pill" :
                                                            report.beamstatus === "under drawin" ? "text-bg-secondary badge rounded-pill" :
                                                                report.beamstatus === "on loom" ? "text-bg-warning badge rounded-pill" :
                                                                    report.beamstatus === "on floor" ? "text-bg-danger badge rounded-pill" :
                                                                        report.beamstatus === "Ready to dispatch" ? "text-bg-primary badge rounded-pill" :
                                                                            report.beamstatus === "Fabric dispatched" ? "text-bg-success badge rounded-pill" :
                                                                                "" // default case if none of the conditions match
                                                            }`}
                                                        style={{ width: "120px" }}
                                                    >
                                                        {report.beamstatus}
                                                    </span>

                                                </td>


                                            </tr>
                                        ))}
                                    </tbody>



                                </table>
                        }


                    </div>


                    <h4 className='mt-5'>FABRIC READY TO DISPATCH</h4>


                    <div className='row me-4 ms-4 mb-5 scroll'>
                        {
                            loading === true ?
                                <div className="d-flex justify-content-center">
                                    <div className="spinner-border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div>

                                : <table className='table table-hover mt-4  text-center'   >
                                    <thead className='border border-1 '>
                                        <tr>
                                            <th>UID</th>
                                            <th>DATE</th>
                                            <th>SETNO</th>
                                            <th>DESIGN NO</th>
                                            <th>WARP COUNT</th>
                                            <th>ERFT COUNT</th>
                                            <th>REED</th>
                                            <th>PICK</th>
                                            <th>DRAWIN STATUS</th>


                                        </tr>
                                    </thead>


                                    <tbody>
                                        {dispatch && dispatch.map((report, index) => (
                                            <tr key={index}>
                                                <td>{report.UID}</td>
                                                <td>{inputdateformat(report.Date)}</td>
                                                <td>{report.SetNo}</td>
                                                <td>{report.DesignNo}</td>
                                                <td>{report.WarpCount}</td>
                                                <td>{report.WeftCount}</td>
                                                <td>{report.Reed}</td>
                                                <td>{report.Pick}</td>
                                                <td>
                                                    <span
                                                        className={`${report.beamstatus === "drawin completed" ? "text-bg-dark badge rounded-pill" :
                                                            report.beamstatus === "under drawin" ? "text-bg-secondary badge rounded-pill" :
                                                                report.beamstatus === "on loom" ? "text-bg-warning badge rounded-pill" :
                                                                    report.beamstatus === "on floor" ? "text-bg-danger badge rounded-pill" :
                                                                        report.beamstatus === "Ready to dispatch" ? "text-bg-primary badge rounded-pill" :
                                                                            report.beamstatus === "Fabric dispatched" ? "text-bg-success badge rounded-pill" :
                                                                                report.beamstatus === "under mending" ? "text-bg-warning badge rounded-pill" :
                                                                                    "" // default case if none of the conditions match
                                                            }`}
                                                        style={{ width: "120px" }}
                                                    >
                                                        {report.beamstatus}
                                                    </span>

                                                </td>


                                            </tr>
                                        ))}
                                    </tbody>


                                </table>

                        }


                    </div>
                </div>


            </div>






        </>
    );
}


export default Misprint;
