



import { useEffect, useState } from 'react'



import axios from 'axios';





import { inputdateformat } from 'reactjs-dateformat';

import Authentication from "../components/authentication";
import { useRouter } from 'next/router';



const Drawprint = () => {







    const [drawindata, setDrawindata] = useState([]);

    const [totalprice, setTotalprice] = useState(0);

    const [loading, setLoading] = useState(false);







    const router = useRouter();

    const { startdate, enddate } = router.query;






    useEffect(() => {
        fetchdata();
    }, [])








    const fetchdata = () => {






        setLoading(true)

        axios.get(`https://apitextilediwanji.work.gd/getdrawindata/data?startdate=${startdate}&enddate=${enddate}`, { withCredentials: true })
            .then(res => {
                // //console.log(res.data)
                setDrawindata(res.data);

                setLoading(false)
                const mydata = res.data
                const filtereddata = mydata.map(value => value.drawinprice)
                // //console.log(filtereddata)


                const initialprice = 0;
                const totalPrice = filtereddata.reduce((accumulator, currentValue) => accumulator + currentValue, initialprice);

                // Set the total price in state
                setTotalprice(totalPrice);
                // //console.log(totalPrice);







            })
            .catch(err => {
                //console.log(err)
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
                <div className='row dontdrawinprint d-flex justify-content-end align-items-center'>
                    <div className="col-2 d-flex justify-content-end align-items-center mt-3 me-3">
                        <button className='btn btn-success btn-sm' onClick={handleprint}>PRINT</button>

                    </div>

                </div>
                <div className='row mt-5 scroll ms-e me-3 printdrawinprint'>
                    <h4 className='text-center mb-4 printdrawinprint'>DRAWIN STATEMENT</h4>
                    <p className='ms-3 printdrawinprint'>Date:- from {startdate} to {enddate}</p>
                    {
                        loading ?
                        <div className="d-flex justify-content-center">
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div> :
                            <div className="ms-3">
                                <table className='table table-bordered text-center divToPrint'>
                                    <thead>
                                        <tr>
                                            <th>SR NO</th>
                                            <th>DRAWIN DATE</th>
                                            <th>SET NO</th>
                                            <th>DESIGN NO</th>
                                            <th>REEED</th>
                                            <th>CLUB</th>
                                            <th>DRAWIN PRICE</th>
                                            <th>REED PRICE</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {drawindata && drawindata.map((o, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{inputdateformat(o.drawindate)}</td>
                                                <td>{o.SetNo}</td>
                                                <td>{o.DesignNo}</td>
                                                <td>{o.Reed}</td>
                                                <td><span
                                                    className={`badge rounded-pill ${o.club === "nonclub" ? "text-bg-success" : "text-bg-danger"}`}
                                                    style={{ width: "120px" }}
                                                >
                                                    {o.club}
                                                </span>
                                                </td>
                                                <td>{o.drawinprice}</td>
                                                <td>{o.reedprice}</td>
                                            </tr>
                                        ))}

                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td>Total</td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td>{totalprice}</td>
                                            <td></td>
                                        </tr>
                                    </tfoot>

                                </table>

                            </div>

                    }


                </div>



            </div>







        </>
    );
}



export default Drawprint;
