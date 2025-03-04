import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
import axios from 'axios';
import { shortmonthformat, yearformat } from 'reactjs-dateformat';
import { useRouter } from 'next/router';
import Authentication from '@/pages/components/authentication';

const Payslip = () => {
    const [payslipdetails, setPayslipdetails] = useState({});
    const router = useRouter();
    const { enumber, startdate, enddate } = router.query;

    useEffect(() => {
        if (enumber && startdate && enddate) {
            axios.get(`https://apitextilediwanji.work.gd:5000/payslip/${enumber}/${startdate}/${enddate}`, { withCredentials: true })
                .then(res => {
                    setPayslipdetails(res.data[0]);
                    console.log(res.data);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }, [enumber, startdate, enddate]);


    // if (!payslipdetails || Object.keys(payslipdetails).length === 0) {
    //     return <div>Loading...</div>;
    // }

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
            <div className="row d-flex justify-content-end align-items-center dontreconsilationprint">
                <div className="col-2 d-flex justify-content-end align-items-center">
                    <button className="btn btn-success btn-sm mt-3 me-5 mb-4" onClick={handleprint}>PRINT</button>

                </div>

            </div>

            </div>

            <div className="container border border-1 reconsilationprint">

                <div className='row border-bottom'>
                    <h3 className='text-center'>PAYSLIP</h3>
                </div>
                <div className="row">
                    <h3 className="text-center border-bottom mt-3 mb-3">
                        {payslipdetails.date ? shortmonthformat(payslipdetails.date) + '-' + yearformat(payslipdetails.date) : 'Loading...'}
                    </h3>
                </div>

                <div className='row'>
                    <div className='col-6 col-md-3'>
                        <p className='text-start'>Name</p>
                        <p className='text-start'>ID</p>
                        <p className='text-start'>Designation</p>
                        <p className='text-start'>Function</p>
                        <p className='text-start'>Address</p>
                        <p className='text-start'>Phone no</p>
                    </div>
                    <div className='col-6 col-md-3'>
                        <p className='text-start fw-bold'>{payslipdetails.ename}</p>
                        <p className='text-start'>{payslipdetails.enumber}</p>
                        <p className='text-start'>{payslipdetails.designation}</p>
                        <p className='text-start'>{payslipdetails.efunction}</p>
                        <p className='text-start'>{payslipdetails.address}</p>
                        <p className='text-start'>{payslipdetails.phoneno}</p>
                    </div>

                    <div className='col-6 col-md-3'>
                        <p className='text-start'>Gender</p>
                        <p className='text-start'>Salary day</p>
                        <p className='text-start'>Salary hour</p>
                        <p className='text-start'>Fixed salary</p>
                        <p className='text-start'>Present days</p>
                        <p className='text-start'>Absent days</p>
                        <p className='text-start'>Half days</p>
                    </div>
                    <div className='col-6 col-md-3'>
                        <p className='text-start'>{payslipdetails.gender}</p>
                        <p className='text-start'>{payslipdetails.salaryday}</p>
                        <p className='text-start'>{payslipdetails.salaryhour}</p>
                        <p className='text-start'>{payslipdetails.monthsalaryfix}</p>
                        <p className='text-start'>{payslipdetails.presentdays}</p>
                        <p className='text-start'>{payslipdetails.absentdays}</p>
                        <p className='text-start'>{payslipdetails.halfdays}</p>
                    </div>
                </div>
                <div className='row mt-5'>
                    <div className='col-6 col-md-3'>
                        <h5 className='text-center'>Total Salary</h5>
                        <h2 className='text-center'>
                            {payslipdetails.salaryday ? (payslipdetails.salaryday * payslipdetails.presentdays) + ((payslipdetails.salaryday * payslipdetails.halfdays) / 2)
                                : payslipdetails.monthsalaryfix ? (payslipdetails.presentdays >= 26 ? payslipdetails.monthsalaryfix : ((payslipdetails.monthsalaryfix) / 26) * payslipdetails.presentdays)
                                    : ""}
                        </h2>
                    </div>
                    <div className='col-6 col-md-3'>
                        <h5 className='text-center'>Total Advance</h5>
                        <h2 className='text-center'>{payslipdetails.total_advance_amount}</h2>
                    </div>
                    <div className='col-6 col-md-3'>
                        <h5 className='text-center'>Total Received</h5>
                        <h2 className='text-center'>{payslipdetails.total_received_amount}</h2>
                    </div>
                    <div className='col-6 col-md-3'>
                        <h5 className='text-center'>Balance Amount</h5>
                        <h2 className='text-center'>{payslipdetails.balance_amount}</h2>
                    </div>
                </div>

            </div>

        </>
    );
}

export default Payslip;
