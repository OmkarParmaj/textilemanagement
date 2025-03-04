import axios from "axios";
import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom"
import QRCode from 'qrcode.react';


import { useRouter } from "next/router";


const Reconsilation = () => {
    const [reconsile, setReconsile] = useState([]);
    const [pack, setPack] = useState([]);
    const [yarnparty, setYarnparty] = useState([]);
    const [totalMtr, setTotalMtr] = useState(0); // State to hold the sum of mtr values
    const [totalWt, setTotalWt] = useState(0);
    const [sizingmtr, setSizingmtr] = useState(0);
    const [totalyarn, setTotalyarn] = useState(0);
    const [billingreport, setBillingreport] = useState([])
    const [totalqu, setTotalqu] = useState(0);
    const [amount, setAmount] = useState(0);
    const router = useRouter();

    const { SetNo, DesignNo } = router.query;
    const [company, setCompany] = useState([]);
    const [packextra, setPackextra] = useState([]);
    const [rolls, setRolls] = useState(0);
    const [weight1, setWeight1] = useState(0);
    const [weight2, setWeight2] = useState(0);
    const [weight3, setWeight3] = useState(0);
    const [weight4, setWeight4] = useState(0);
    const [weight5, setWeight5] = useState(0);
    const [beammtr, setBeammtr] = useState(0);
    const [countwt1per, setCountwt1per] = useState(0);
    const [beaminwarddata, setBeaminwarddata] = useState([]);
    const [pick1, setPick1] = useState(0);
    const [pick2, setPick2] = useState(0);
    const [pick3, setPick3] = useState(0);
    const [pick4, setPick4] = useState(0);
    const [pick5, setPick5] = useState(0);
    const [totalpick, setTotalpick] = useState(0);
    const [setnumber, setSetnumber] = useState(0)
    const [designnumber, setDesignnumber] = useState(0);

    const [url, setUrl] = useState("");

    const [recosetnumber, setRecosetnumber] = useState([]);
    const [totalyarnwt, setTotalyarnwt] = useState(0);









    useEffect(() => {


        axios.get(`https://apitextilediwanji.work.gd/setnumberwisereco/data?setnumber=${SetNo}`, { withCredentials: true })
            .then(res => {
                // console.log(res.data)
                setRecosetnumber(res.data);

                const fetcheddata = res.data;
                const one = fetcheddata.reduce((acc, omkar) => acc + omkar.alltotalwt5, 0);

                setTotalyarnwt(one)

            })
            .catch(err => {
                console.log(err)
            })




    }, [])















    useEffect(() => {
        axios.get(`https://apitextilediwanji.work.gd/reconsilecompany/${SetNo}`, {
            withCredentials: true
        })
            .then(res => {
                // console.log(res.data);
                setCompany(res.data[0]);
            })
            .catch(err => {
                // console.log(err);
            })
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response1 = await axios.get(`https://apitextilediwanji.work.gd/reconsilation/${SetNo}`, { withCredentials: true });
                const response2 = await axios.get(`https://apitextilediwanji.work.gd/packslip2/${SetNo}/${DesignNo}`, { withCredentials: true });
                const response3 = await axios.get(`https://apitextilediwanji.work.gd/yarninward/${SetNo}`, { withCredentials: true });
                const response4 = await axios.get(`https://apitextilediwanji.work.gd/billingreport/${SetNo}/${DesignNo}`, { withCredentials: true });
                setReconsile(response1.data);
                setPack(response2.data);
                const packslipdata = response2.data;

                const myone = response1.data;


                const mappedsetno = myone.map(omkar => omkar.DesignNo);
                console.log(mappedsetno);

                const yesdata = packslipdata.map(item => JSON.parse(item.packingdata));

                setPackextra(yesdata);

                setYarnparty(response3.data);
                setBillingreport(response4.data);
                // console.log(response2.data);
                // console.log(response4.data);

                // Calculate the sum of mtr values
                const sumMtr = response2.data.reduce((acc, packdata) => acc + packdata.toalmtr, 0);
                const sumwt = response2.data.reduce((acc, packdata) => acc + packdata.totalwt, 0);
                const sumrolls = response2.data.reduce((acc, packdata) => acc + packdata.totalrolls, 0);
                const sumsizingmtr = response1.data.reduce((acc, packdata) => acc + packdata.SizingMtr, 0);
                const sumyarnweight = response3.data.reduce((acc, packdata) => acc + packdata.weight, 0);
                const sumquantity = response4.data.reduce((acc, billingreport) => acc + billingreport.totalquantity, 0);
                const sumamount = response4.data.reduce((acc, billingreport) => acc + billingreport.totalmeters, 0);
                setTotalMtr(sumMtr);
                setTotalWt(sumwt);
                setSizingmtr(sumsizingmtr);
                setTotalyarn(sumyarnweight);
                setTotalqu(sumquantity);
                setAmount(sumamount);
                setRolls(sumrolls);

            } catch (err) {
                // console.log("Error in fetching data", err);
            }
        };

        fetchData();
    }, [SetNo]);


    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }




































    //reconsilatio summary api start


    useEffect(() => {
        axios.get(`https://apitextilediwanji.work.gd/reconsilationbeaminward/${SetNo}/${DesignNo}`, { withCredentials: true })
            .then(res => {

                console.log(res.data);
                const setno1 = res.data[0].SetNo;
                const designno1 = res.data[0].DesignNo;
                const email1 = res.data[0].Email;
                setSetnumber(setno1)
                setDesignnumber(designno1)


                setUrl(`https://www.textilediwanji.com/scansetnumberreco?setno=${setno1}&designno=${designno1}&recoemail=${email1}`);


                setBeaminwarddata(res.data[0]);
                setBeammtr(res.data[0].SizingMtr);


                const additionOfPickPatter = res.data[0].Countwt1 + res.data[0].Countwt2 + res.data[0].Countwt3 + res.data[0].Countwt4 + res.data[0].Countwt5;
                const countwt1 = res.data[0].Countwt1;
                const countwt2 = res.data[0].Countwt2;
                const countwt3 = res.data[0].Countwt3;
                const countwt4 = res.data[0].Countwt4;
                const countwt5 = res.data[0].Countwt5;

                const pick = res.data[0].Pick;

                const countwt1perc = (countwt1 / additionOfPickPatter) * 100;
                const countwt2perc = (countwt2 / additionOfPickPatter) * 100;
                const countwt3perc = (countwt3 / additionOfPickPatter) * 100;
                const countwt4perc = (countwt4 / additionOfPickPatter) * 100;
                const countwt5perc = (countwt5 / additionOfPickPatter) * 100;

                const pick1 = (pick / 100) * countwt1perc;
                const pick2 = (pick / 100) * countwt2perc;
                const pick3 = (pick / 100) * countwt3perc;
                const pick4 = (pick / 100) * countwt4perc;
                const pick5 = (pick / 100) * countwt5perc;

                setPick1(pick1);
                setPick2(pick2);
                setPick3(pick3);
                setPick4(pick4);
                setPick5(pick5);

                setTotalpick(pick1 + pick2 + pick3 + pick4 + pick5);





                const upper1 = res.data[0].Pick * res.data[0].width;
                const lower1 = res.data[0].Count1 * 1693.33;
                const wt1 = upper1 / lower1;
                const fivepercent1 = (wt1 / 100) * 5;
                const wt1With5Percent = wt1 + fivepercent1;

                const fabmtr = totalMtr;
                const final1 = wt1With5Percent;
                const allset1 = (final1 / 100) * countwt1perc;

                setWeight1(allset1);

                const upper2 = res.data[0].Pick * res.data[0].width;
                const lower2 = res.data[0].Count2 * 1693.33;
                const wt2 = upper2 / lower2;
                const fivepercent2 = (wt2 / 100) * 5;
                const wt2With5Percent = wt2 + fivepercent2;
                setWeight2(wt2With5Percent);

                const final2 = wt2With5Percent;
                const allset2 = (final2 / 100) * countwt2perc;

                setWeight2(allset2);


                const upper3 = res.data[0].Pick * res.data[0].width;
                const lower3 = res.data[0].Count3 * 1693.33;
                const wt3 = upper3 / lower3;
                const fivepercent3 = (wt3 / 100) * 5;
                const wt3With5Percent = wt3 + fivepercent3;
                setWeight3(wt3With5Percent);

                const final3 = wt3With5Percent;
                const allset3 = (final3 / 100) * countwt3perc;

                setWeight3(allset3);



                const upper4 = res.data[0].Pick * res.data[0].width;
                const lower4 = res.data[0].Count4 * 1693.33;
                const wt4 = upper4 / lower4;
                const fivepercent4 = (wt4 / 100) * 5;
                const wt4With5Percent = wt4 + fivepercent4;
                setWeight4(wt4With5Percent);

                const final4 = wt4With5Percent;
                const allset4 = (final4 / 100) * countwt4perc;

                setWeight4(allset4);



                const upper5 = res.data[0].Pick * res.data[0].width;
                const lower5 = res.data[0].Count5 * 1693.33;
                const wt5 = upper5 / lower5;
                const fivepercent5 = (wt5 / 100) * 5;
                const wt5With5Percent = wt5 + fivepercent5;
                setWeight5(wt5With5Percent);

                const final5 = wt5With5Percent;
                const allset5 = (final5 / 100) * countwt5perc;

                setWeight5(allset5);






            })
            .catch(err => {
                // console.log(err);
            })
    }, [SetNo, DesignNo])



const handleprint = () => {
    window.print();
}





    //reconsilaion summary api end



    return (
        <>
            <div className="container-fluid " style={{ fontSize: "small" }}>
                <div className="row d-flex justify-content-end align-items-center dontreconsilationprint">
                    <div className="col-2 d-flex justify-content-end align-items-center">
                        <button className="btn btn-success btn-sm mt-3" onClick={handleprint}>PRINT</button>

                    </div>

                </div>
                <div className="row mt-3 ms-2 me-2 reconsilationprint">


                    <div className="container border border-1 mobilecontainer ">

                        <div className="row">
                            <div className="col-4 col-md-2  border-bottom d-flex justify-content-center align-items-center ">
                                <img src={`https://apitextilediwanji.work.gd/companyimage/${company.filenameas}`} style={{ maxWidth: 250, maxHeight: 90 }} alt={`Image ${company.filenameas}`} />
                            </div>
                            <div className="col-8 col-md-10 border-start border-bottom">
                                {company && <h3 className="m-0 text-center  companyname">{company.companyname}</h3>}
                                {company && <p className="m-0 text-center companyaddress">{company.companyaddress}</p>}
                                {company && <p className="m-0 text-center companyphoneno"> {company.emailid} {company.phoneno}</p>}
                                {company && <p className="m-0 text-center companygst">{company.gst}</p>}
                            </div>
                        </div>
                        <div className="row d-flex justify-content-evenly mt-3">
                            <div className="col-12 col-md-6 beaminwardreconsilation">
                                <div className="row bg-primary">
                                    <h4 className="text-white text-center">Beam Inward </h4>
                                </div>

                                <div className="row scroll beaminwardcomputerrow">
                                    <table className="table table-bordered ">
                                        <thead>
                                            <tr>
                                                <th>Sr no</th>
                                                <th>Date</th>
                                                <th>Set No</th>
                                                <th>Design No</th>
                                                <th>UID</th>
                                                <th>Reed</th>
                                                <th>Pick</th>
                                                <th>Width/R.S</th>
                                                <th>Sizing mtr</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {reconsile.map((rec, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{formatDate(rec.Date)}</td>
                                                    <td>{rec.SetNo}</td>
                                                    <td>{rec.DesignNo}</td>
                                                    <td>{rec.UID}</td>
                                                    <td>{rec.Reed}</td>
                                                    <td>{rec.Pick}</td>
                                                    <td>{rec.width}</td>
                                                    <td>{rec.SizingMtr}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <td colSpan={8}>Total sizing mtr</td>
                                                <td>{sizingmtr}</td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>

                            </div>
                            <div className="col-12 col-md-6 border-start yarninwardreconsilation">
                                <div className="row bg-primary">
                                    <h4 className="text-white text-center">Yarn Inward</h4>
                                </div>

                                <div className="row scroll yarninwardcomputerrow">
                                    <table className="table table-bordered ">
                                        <thead>
                                            <tr>
                                                <th>Sr no</th>
                                                <th>Set no</th>
                                                <th>Design no</th>
                                                <th>Date</th>
                                                <th>Yarn party</th>
                                                <th>Count</th>
                                                <th>Party</th>
                                                <th>Weight</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {yarnparty.map((yarn, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{yarn.setNo}</td>
                                                    <td>{yarn.Designno}</td>
                                                    <td>{formatDate(yarn.date)}</td>
                                                    <td>{yarn.yarnParty}</td>
                                                    <td>{yarn.count}</td>
                                                    <td>{yarn.party}</td>
                                                    <td>{yarn.weight}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <td colSpan={7}>Total wt</td>
                                                <td>{totalyarn.toFixed(2)}</td>
                                            </tr>
                                        </tfoot>

                                    </table>
                                </div>



                            </div>
                        </div>
                        <div className="row d-flex ">
                            <div className="col-12 col-md-6 border-bottom  fabricoutwardreconsilation">
                                <div className="row bg-primary">
                                    <h4 className="text-white text-center">Fabric outward</h4>
                                </div>
                                <div className="row scroll fabricoutwardcomputerrow">
                                    <table className="table table-bordered ">
                                        <thead>
                                            <tr>
                                                <th>Sr no</th>
                                                <th>Design no</th>
                                                <th>Date</th>
                                                <th>Packing slip No</th>
                                                <th>Total rolls</th>
                                                <th>Total Mtr</th>
                                                <th>Total wt</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {pack.map((packdata, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{packdata.DesignNo}</td>
                                                    <td>{formatDate(packdata.date)}</td>
                                                    <td>{packdata.Packingslipno}</td>
                                                    <td>{packdata.totalrolls}</td>
                                                    <td>{packdata.toalmtr.toFixed(2)}</td>
                                                    <td>{packdata.totalwt}</td>


                                                </tr>
                                            ))}

                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <td colSpan={4}>Total</td>
                                                <td>{rolls}</td>
                                                <td >{totalMtr.toFixed(2)}</td>
                                                <td>{totalWt.toFixed(2)}</td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>

                                <div className="row scroll billingcomputerrow">
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>Bill NO</th>
                                                <th>Packing slip no</th>
                                                <th>UID</th>
                                                <th>Set no</th>
                                                <th>Design no</th>
                                                <th>Quantity</th>
                                                <th>Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody>




                                            {billingreport.map((o, index) => (
                                                <tr key={index}>
                                                    <td>{o.billNo}</td>
                                                    <td>{o.billpackingslipno}</td>
                                                    <td>{o.UID}</td>
                                                    <td>{o.SetNo}</td>
                                                    <td>{o.DesignNo}</td>
                                                    <td>{o.totalquantity}</td>
                                                    <td>{o.totalmeters}</td>
                                                </tr>
                                            ))}





                                        </tbody>

                                        <tfoot>
                                            <tr>
                                                <td colSpan={5}>Total</td>
                                                <td>{totalqu}</td>
                                                <td>{amount}</td>

                                            </tr>
                                        </tfoot>


                                    </table>
                                </div>



                            </div>
                            <div className="col-12 col-md-6 border-start border-bottom summaryreconsilation">
                                <div className="row bg-primary">
                                    <h4 className="text-white text-center">Summary</h4>
                                </div>
                                {/* <div className="row scroll summarycomputerrow">
                                    <h5>Reconsilation summary for Design number {designnumber}</h5>
                                    <table className="table table-bordered ">
                                        <thead>
                                            <tr>

                                                <th>Particulars</th>
                                                <th>Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>


                                            <tr>
                                                <td>Total Sizing mtr</td>
                                                <td>{beammtr} mtr</td>
                                            </tr>
                                            <tr>
                                                <td>Total Fabric outward</td>
                                                <td>{totalMtr.toFixed(2)} mtr</td>
                                            </tr>
                                           
                                            <tr>
                                                <td>Fabric Shrinkage</td>
                                                <td>{(100 - (totalMtr / beammtr) * 100).toFixed(2)} %</td>
                                            </tr>

                                        </tbody>
                                    </table>
                                </div> */}


                                <div className="row scroll summary2computerrow">
                                    <h5> Yarn weight reconsilation for set number {setnumber}</h5>
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>Sr no</th>
                                                <th>SET NO</th>
                                                <th>DESIGN NO</th>

                                                <th>Weft consumption</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                recosetnumber && recosetnumber.map((o, index) => (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{o.SetNo}</td>
                                                        <td>{o.DesignNo}</td>

                                                        <td>{(((o.totalwtforcount1 * o.totalmtrpack) ? (o.totalwtforcount1 * o.totalmtrpack) : 0) + ((o.totalwtforcount2 * o.totalmtrpack) ? (o.totalwtforcount2 * o.totalmtrpack) : 0) + ((o.totalwtforcount3 * o.totalmtrpack) ? (o.totalwtforcount3 * o.totalmtrpack) : 0) + ((o.totalwtforcount4 * o.totalmtrpack) ? (o.totalwtforcount4 * o.totalmtrpack) : 0) + ((o.totalwtforcount5 * o.totalmtrpack) ? (o.totalwtforcount5 * o.totalmtrpack) : 0)).toFixed(2)} Kg
                                                        </td>
                                                    </tr>

                                                ))
                                            }


                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <td colSpan={3}>Total yarn wt</td>

                                                <td>{totalyarnwt.toFixed(4)} Kg</td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>





                                <div className="row mt-5 mb-4 me-3 d-flex justify-content-end">
                                    <QRCode className="mt-5" value={url}></QRCode>

                                </div>
                            </div>
                        </div>



                        <div className="row scroll d-flex summary2computerrow">
                            {/* <div classname="border border-1"> */}
                            {
                                recosetnumber && recosetnumber.map((o, index) => (
                                    <div className="col-12 col-md-4 border border-1" key={index}>
                                        <span>Reconsilation for Design no:- <span style={{ fontSize: "18px" }}>{o.DesignNo}</span></span>

                                        <table className="table table-bordered" >
                                            <thead>
                                                <tr>
                                                    <th>Sr no</th>
                                                    <th>Count</th>
                                                    <th>Count pick</th>
                                                    {/* <th>Pick</th> */}
                                                    <th>Weft consumption</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>1</td>
                                                    <td>{o.Count1}</td>
                                                    <td>{o.Countwt1}</td>
                                                    {/* <td>{pick1}</td> */}
                                                    <td>{(o.totalwtforcount1 * o.totalmtrpack).toFixed(2)}</td>
                                                </tr>
                                                <tr>
                                                    <td>1</td>
                                                    <td>{o.Count2}</td>
                                                    <td>{o.Countwt2}</td>
                                                    {/* <td>{pick2}</td>xamp */}
                                                    <td>{(o.totalwtforcount2 * o.totalmtrpack).toFixed(2)}</td>
                                                </tr>
                                                <tr>
                                                    <td>1</td>
                                                    <td>{o.Count3}</td>
                                                    <td>{o.Countwt3}</td>
                                                    {/* <td>{pick3}</td> */}
                                                    <td>{(o.totalwtforcount3 * o.totalmtrpack).toFixed(2)}</td>
                                                </tr>
                                                <tr>
                                                    <td>1</td>
                                                    <td>{o.Count4}</td>
                                                    <td>{o.Countwt4}</td>
                                                    {/* <td>{pick4}</td> */}
                                                    <td>{(o.totalwtforcount4 * o.totalmtrpack).toFixed(2)}</td>
                                                </tr>
                                                <tr>
                                                    <td>1</td>
                                                    <td>{o.Count5}</td>
                                                    <td>{o.Countwt5}</td>
                                                    {/* <td>{pick5}</td> */}
                                                    <td>{(o.totalwtforcount5 * o.totalmtrpack).toFixed(2)}</td>
                                                </tr>
                                            </tbody>
                                            <tfoot>
                                                <tr>
                                                    <td colSpan={3}>Total Pick</td>
                                                    {/* <td>{totalpick}</td> */}
                                                    <td>{(((o.totalwtforcount1 * o.totalmtrpack) ? (o.totalwtforcount1 * o.totalmtrpack) : 0) + ((o.totalwtforcount2 * o.totalmtrpack) ? (o.totalwtforcount2 * o.totalmtrpack) : 0) + ((o.totalwtforcount3 * o.totalmtrpack) ? (o.totalwtforcount3 * o.totalmtrpack) : 0) + ((o.totalwtforcount4 * o.totalmtrpack) ? (o.totalwtforcount4 * o.totalmtrpack) : 0) + ((o.totalwtforcount5 * o.totalmtrpack) ? (o.totalwtforcount5 * o.totalmtrpack) : 0)).toFixed(2)} Kg</td>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </div>

                                ))
                            }

                            {/* </div> */}

                        </div>





                        <div className="row mt-5">
                            <div className="col-12 col-md-8 ">
                                <h5 className="text-start">Statements</h5>

                            </div>
                            <div className="col-12  col-md-4">
                                <p className="ms-3   for ">For</p>
                                <p className="mt-5   sourabhtextile">SOURABH TEXTILE</p>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </>
    );
};

export default Reconsilation;
