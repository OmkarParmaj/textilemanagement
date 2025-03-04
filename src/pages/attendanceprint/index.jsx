
import { useEffect, useState } from "react";

import axios from 'axios'

import Authentication from '../components/authentication';
import { useRouter } from 'next/router';


const Attendanceprint = () => {


    const [employeedetails, setEmployeedetails] = useState([]);

    const [attendancedata, setAttendancedata] = useState([]);





    const [loading, setLoading] = useState(false);


    const router = useRouter();

    const { startdate, enddate } = router.query;



    const handleprint = () => {
        window.print();
    }



    useEffect(() => {
        fetchdata();
    }, [])


    const fetchdata = () => {
        setLoading(true)
        axios.get(`https://apitextilediwanji.work.gd:5000/attendancedata/data?startdate=${startdate}&enddate=${enddate}`, { withCredentials: true })
            .then(res => {
                setAttendancedata(res.data);
                //console.log(res.data)
                setLoading(false)

            })
            .catch(err => {
                //console.log(err);
            })
    }



    useEffect(() => {
        axios.get('https://apitextilediwanji.work.gd:5000/getemployee', { withCredentials: true })
            .then(res => {
                // //console.log(res.data)
                setEmployeedetails(res.data);

            })
            .catch(err => {
                //console.log(err);
            })
    }, [])





    const auth = Authentication;


    if (!auth) {
        return null;
    }



    return (
        <>
            <div className="container-fluid">
                <div className="row d-flex justify-content-end align-items-center dontreconsilationprint">
                    <div className="col-2 d-flex justify-content-end align-items-center">
                        <button className="btn btn-success btn-sm mt-3 mb-3" onClick={handleprint}>PRINT</button>

                    </div>

                </div>
                <div className="row scroll  reconsilationprint">
                    <h4 className="reconsilationprint mb-3 text-center mt-3">Attendance sheet</h4>
                    <p className="ms-3">From {startdate} to {enddate}</p>
                    {
                        loading ?
                            <div className="d-flex justify-content-center">
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div> :
                            <table className='table table-bordered text-center'>
                                <thead>
                                    <tr>
                                        <th>SR NO</th>
                                        <th>EMPLOYEE NAME</th>
                                        <th>PRESENT DAYS</th>
                                        <th>HALF DAYS</th>
                                        <th>ABSENT DAYS</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        attendancedata && attendancedata.map((o, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{o.ename}</td>
                                                <td>{o.presentdays}</td>
                                                <td>{o.halfdays}</td>
                                                <td>{o.absentdays}</td>

                                            </tr>
                                        ))
                                    }

                                </tbody>

                            </table>

                    }


                </div>

            </div>

        </>
    );
}


export default Attendanceprint;