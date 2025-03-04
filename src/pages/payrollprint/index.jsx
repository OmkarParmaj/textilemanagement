
import react, { useEffect, useState } from 'react';


import axios from 'axios';

import { shortmonthformat } from 'reactjs-dateformat';
import Link from 'next/link';

import Authentication from '../components/authentication';
import { useRouter } from 'next/router';



const Payrollprint = () => {
    const [payrolldetails, setPayrolldetails] = useState([]);

    const [loading, setLoading] = useState(false);







    const router = useRouter();

    const { startdate, enddate } = router.query;



    useEffect(() => {
        handleclick();
    }, [])






    const handleclick = () => {

        setLoading(true)

        axios.get(`http://api.textilediwanji.com:5000/payroll/report?startdate=${startdate}&enddate=${enddate}`, { withCredentials: true })
            .then(res => {
                //console.log(res.data)
                setPayrolldetails(res.data);
                setLoading(false)
            })
            .catch(err => {
                //console.log(err);
            })


    }




    const handleprint = () => {
        window.print();
    }




    // if (isLoggedIn === false) {
    //     return <Navigate to='/login' replace></Navigate>

    // }


    const auth = Authentication();


    if (!auth) {
        return null;
    }




    return (
        <>

            <div className="container-fluid">
                <div className="row d-flex justify-content-end align-items-center">
                    <div className="col-12 col-md-3 me-3">
                        <button className="btn btn-success btn-sm mt-3 float-end" onClick={handleprint}>PRINT</button>

                    </div>

                </div>
                <div className="row scroll reconsilationprint me-3">
                    <h4 className='text-center  reconsilationprint'>Payroll statement</h4>
                    <p className="ms-3 mb-3">Date:- from {startdate} to {enddate}</p>
                    {
                        loading ?
                            <div className="d-flex justify-content-center">
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div> :
                           <div className="ms-3">
                             <table className='table table-bordered text-center'>
                                <thead>
                                    <tr>
                                        <th>SR NO</th>
                                        <th>MONTH</th>
                                        <th>EMPLOYEE NAME</th>
                                        <th>EMPLOYEE ID</th>
                                        <th>DESIGNATION</th>
                                        <th>PRESENT DAY's</th>
                                        <th>ABSENT DAYS's</th>
                                        <th>HALF DAY's</th>
                                        <th>SALARY DAY</th>
                                        <th>SALARY HOUR</th>
                                        <th>FIXED SALARY</th>
                                        <th>ADVANCE BAL.</th>
                                        <th>PAYMENT AMOUNT</th>


                                    </tr>
                                </thead>
                                <tbody>
                                    {payrolldetails && payrolldetails.map((o, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{shortmonthformat(o.date)}</td>
                                            <td>{o.ename}</td>
                                            <td>{o.enumber}</td>
                                            <td>{o.efunction}</td>
                                            <td>{o.presentdays}</td>
                                            <td>{o.absentdays}</td>
                                            <td>{o.halfdays}</td>
                                            <td>{o.salaryday}</td>
                                            <td>{o.salaryhour}</td>
                                            <td>{o.monthsalaryfix}</td>
                                            <td>{o.balance_amount}</td>
                                            <td>{o.salaryday ? (o.presentdays * o.salaryday) + ((o.halfdays * o.salaryday) / 2)
                                                : o.salaryhour ? (o.presentdays * o.salaryhour) + ((o.halfdays * o.salaryhour) / 2)
                                                    : o.monthsalaryfix ? (o.presentdays >= 26 ? o.monthsalaryfix : ((o.monthsalaryfix / 26) * o.presentdays) + (o.monthsalaryfix / 26) * o.halfdays)
                                                        : ""


                                            }</td>


                                        </tr>
                                    ))}
                                </tbody>

                            </table>

                           </div>

                    }


                </div>

            </div>





        </>
    );
}


export default Payrollprint;
