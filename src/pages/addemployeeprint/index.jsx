
import { useEffect, useState } from 'react'

import axios from 'axios';

import { toast } from 'react-toastify';

import { inputdateformat } from 'reactjs-dateformat';



import Link from "next/link";

import Authentication from "../components/authentication";


const Addemployeeprint = () => {
    const [date, setDate] = useState("")
    const [employeename, setEmployeename] = useState("")
    const [employeenumber, setEmployeenumber] = useState("");
    const [designation, setDesignation] = useState("");
    const [employeefunction, setEmployeefunction] = useState("")
    const [location, setLocation] = useState("");
    const [gender, setGender] = useState("");
    const [address, setAddress] = useState("");
    const [phoneno, setPhoneno] = useState("");
    const [salaryday, setSalaryday] = useState("")
    const [salaryhour, setSalaryhour] = useState("")
    const [monthsalaryfix, setMonthsalaryfix] = useState("");
    const [employeedetails, setEmployeedetails] = useState([])
    const [details, setDetails] = useState([]);

    const [loading, setLoading] = useState(false);


    useEffect(() => {
        fechemployee()
    }, [])


    const fechemployee = () => {
        setLoading(true)

        axios.get('https://apitextilediwanji.work.gd:5000/getemployee', { withCredentials: true })
            .then(res => {
                // //console.log(res.data)
                setEmployeedetails(res.data);
                setDetails(res.data);
                setLoading(false)


            })
            .catch(err => {
                //console.log(err);
            })

    }





    const handleprint = () => {
        window.print();
    }








    const auth = Authentication();


    if (!auth) {
        return null;
    }


    return (
        <>

            <div className="container-fluid">
            <div className="row d-flex justify-content-end align-items-center dontreconsilationprint">
                    <div className="col-2 d-flex justify-content-end align-items-center">
                        <button className="btn btn-success btn-sm mt-3" onClick={handleprint}>PRINT</button>

                    </div>

                </div>
                <div className="row scroll reconsilationprint">
                    <div className="col-12">
                        <h4 className="reconsilationprint mt-4 text-center">Employee Details</h4>
                        {
                            loading ?
                                <div className="d-flex justify-content-center">
                                    <div className="spinner-border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div> :
                               <div>
                                 <table className='table table-bordered mt-4 text-center'>
                                    <thead>
                                        <tr>
                                            <th>SR NO</th>
                                            <th>EMPLOYEE NAME</th>
                                            <th>DATE OF JOINING</th>
                                            <th>EMPLOYEE ID</th>
                                            <th>DESIGNATION</th>
                                            <th>FUNCTION</th>
                                            <th>SALARY DAY</th>
                                            <th>SALARY HOUR</th>
                                            <th>SALARY FIX</th>
                                            <th>CLOSING BALANCE</th>





                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            employeedetails && employeedetails.map((o, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{o.ename}</td>
                                                    <td>{inputdateformat(o.date)}</td>
                                                    <td>{o.enumber}</td>
                                                    <td>{o.designation}</td>
                                                    <td>{o.efunction}</td>
                                                    <td>{o.salaryday}</td>
                                                    <td>{o.salaryhour}</td>
                                                    <td>{o.monthsalaryfix}</td>
                                                    <td>{o.Advance}</td>



                                                </tr>
                                            ))
                                        }
                                    </tbody>

                                </table>
                               </div>

                        }


                    </div>

                </div>

            </div>




        </>
    );
}


export default Addemployeeprint;
