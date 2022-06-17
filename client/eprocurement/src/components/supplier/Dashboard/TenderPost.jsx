import * as React from "react";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { MdArrowDropDown } from "react-icons/md";
import { Container, Grid, Stack } from "@mui/material";
import Modal from "./Modal";
import { Link } from "react-router-dom";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useState } from "react";
import TenderInfo from "./TenderInfo";
import { connect } from "react-redux";
import { fetchTender } from "../../../actions/tenderAction";
import { useEffect } from "react";
import { ProgressBar } from "primereact/progressbar";
import img from "../../../assets/images.jfif";
import { saveAs } from "file-saver";
import { useRef } from "react";
import { Toast } from "primereact/toast";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { IoAddCircleOutline } from "react-icons/io5";
import axios from "axios"
import {useNavigate} from 'react-router-dom'

const MediaCard = ({ tenders, fetchTenders }) => {
  const navigate =useNavigate()
  const toastBR  = useRef(null);
  const [disable,setDisable]=useState(true)
  const [techDoc, setTechDoc] = useState(null);
  const [busiDoc,setBusiDoc]= useState(null)
  let checkPay=(t)=>{
    let dis=true
    t.payers.map((su)=>{
      if(su==localStorage.getItem('whoId')){
        dis=false
      }
      // return false
    })
    return dis
    // return true
  }
  const labels=(t)=>{
    let paid=checkPay(t)
    return paid?'Buy Bid':'Paid'
  }
const checkPayu=()=>false
const [selected,setSelected]=useState({})

  const header = <img alt="Card" src={img} height={'23rem'}/>;
  const footer = (t)=>(
    <span>
      <Button  
        disabled={checkPay(t)}
        label="Apply"
        icon={!checkPay(t)?"pi pi-arrow-circle-down":"pi pi-arrow-circle-right"}
        onClick={() => {
          setSelected(t)
          setVis(true);
        }}
      />
      <Button

        label={labels(t)}
        icon="pi pi-angle-right"
        className={!checkPay(t)? "p-button-success ml-2 bg-red-500":"p-button-secondary ml-2 bg-red-500"}
        onClick={ () => {
          // setSelected(t)
           axios.post("http://localhost:3001/Home/CheckoutExpress", {
            ItemId: `${t._id},${localStorage.getItem('whoId')}`,
            ItemName: `Bid Form-${t.number}`,
            UnitPrice: t.bidFee,
          }).then((mess)=>{
            // var myWindow = window.open("", "_self");
            // myWindow.document.write("<p>I replaced the current window.</p>");

            // window.open(mess.data.message)
            // window.location(mess.data.message)
            // navigate(mess.data.message)
            
            // window.location.replace(mess.data.message,'_blank');
            // window.open(mess.data.message);
            window.location.replace(mess.data.message);

          });
          // setVis2(true);
        }}
      />
    </span>
  );
  const seen=(pubDate)=>(<i class="pi pi-calendar-plus  p-2 text-xl text-black-500  font-medium ">{`  ${pubDate}`}</i>)
  const [vis, setVis] = useState(false);
  const [vis2, setVis2] = useState(false);
  console.log("tenders are from supplier", tenders);
  let ten=[]
  useEffect(() => {
    fetchTenders();
  }, []);
  
  console.log('filtered',ten) 

  return tenders.length !== 0 ? (
    <>
      <Grid container spacing={5}>
        {tenders.map((t) => (
          new Date(t.closingDate).toISOString()>new Date().toISOString()?
          <Grid item xs={3}>
            <Card
              className="m-0 scalein animation-duration-250 max-h-1rem"
              title={t.title}
              subTitle={seen(new Date(t.publishedDate).toDateString())}
              style={{ width: "25em" }}
              footer={footer(t)}
              header={header}
            >
              <p
                className="m-0 "
                style={{ lineHeight: "1.5", height: "10rem" }}
              >
                {t.description}
              </p>
            </Card>
            <Toast ref={toastBR } />
          </Grid>:''
        ))}
      </Grid>
      <Dialog
        modal
        draggable={false}
        dismissableMask
        style={{ width: "90rem", height: "300rem", left: "8%" }}
        visible={vis}
        onHide={() => {
          setVis(false);
        }}
      >
        <div className="bg-orange-400 m-0 w-12 h-5rem"></div>
        <div className="formgrid grid">
          
          <Card
            // title="Tender Information/"
            
            style={{ width: "25rem", marginBottom: "2rem" }}
            className="col m-6 p-6 "
          >
            {/* <p class="text-3xl w-10 font-bold">{selected.title}</p> */}
            <center className="text-3xl w-10 font-bold">{selected.title}</center>

            <p className="text-2xl w-10 ">
               <br /> {selected.description}
            </p>
            <p className="text-2xl w-10 flex align-items-center justify-content-end mt-8">
              Published <pre>  </pre><i className="pi pi-calendar-minus"> </i>  <pre>  </pre>{new Date(selected.publishedDate).toDateString()}
            </p>
            <p className="text-2xl w-10 flex align-items-center justify-content-end">
              Closing Date<pre>  </pre><i className="pi pi-calendar-minus"> </i> <pre>  </pre>
              {new Date(selected.closingDate).toDateString().replace(/ /g, "-")}
            </p>
            <p className="text-2xl w-10 flex align-items-center justify-content-end">
              Bid Opening <pre>  </pre><i className="pi pi-calendar-minus"> </i><pre>  </pre> {new Date(selected.bidOpenOn).toDateString()}
            </p>
            <p className="text-2xl w-10 flex align-items-center justify-content-start">Download Attached Documents Below</p>
           {/* <p>Remaining Days</p> */}
            <Button
              onClick={() => {
                window.open(`http://localhost:5001/image/${selected.document}`, "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=400,width=1350,height=800");

                saveAs(
                  `http://localhost:5001/image/${selected.document}`,
                  `Tender Bid ${selected.document}.pdf`
                );
              }}
              className="w-full  p-0 h-6rem flex justify-content-center p-button-rounded p-button-info"
            >
              <i className="pi pi-download px-2 "></i>
              {/* <span className="px-3 align-self-center flex"> */}
              Download Documents
              {/* </span> */}
            </Button>
          </Card>
        </div>
        
          <Card className="m-0   flex align-items-center justify-content-center">
            <form
              className="m-5"
              onSubmit={async(e) => {
                e.preventDefault();
                console.log(busiDoc);
                const data1=new FormData()
                const data2=new FormData()
                data1.append('doc',busiDoc)
                data2.append('doc',techDoc)
// return;
                await axios.post( "http://localhost:5001/upload",data1)
                .then(async(res)=>{
                  const busi=res.data
                  await axios.post( "http://localhost:5001/upload",data2)
                  .then(async(res2)=>{
                    const tech=res2.data

                    await axios.post('http://localhost:5001/tenders/applied-tenders',{
                      tender:selected._id,
                      applier:localStorage.getItem('whoId'),
                      businessDoc:busi,
                      technicalDoc:tech
                    }).then(()=>{console.log("post applied tender")
                  setVis(false)
                  toastBR .current.show({severity:'success', summary: 'You Applied Successfully', detail:'Tender Application', life: 8000});
                  })
                  .catch(()=>{
                    alert("You Can't Apply agian")
                    setVis(false)

                  })
                  })
                })
              }}
            >
              <div className=" mt-7">
                <Button className="p-button-rounded p-button-info ">
                  <input
                    onInput={(e) => setTechDoc(e.target.files[0])}
                    accept=".pdf"
                    type="file"
                    name="doc"
                    required
                  />
                </Button>
              </div>
              <div className=" mt-4 w-full h-5rem">
                <Button className="p-button-rounded p-button-info">
                  <input
                    onInput={(e) => setBusiDoc(e.target.files[0])}
                    accept=".pdf"
                    type="file"
                    name="doc"
                    required
                  />
                </Button>
              </div>
              <Button
                type="submit"
                className="p-button-warning p-button-rounded p-button-contained w-full  p-0 h-6rem flex justify-content-center"
                aria-label="Amazon"
              >
                Apply
              </Button>
            </form>
          </Card>
        
      </Dialog>

      <Dialog
        draggable={false}
        dismissableMask
        style={{ width: "90rem", height: "300rem", left: "8%" }}
        visible={vis2}
        onHide={() => {
          setVis2(false);
        }}
      >
        Tender Details Here
        <TenderInfo />
      </Dialog>
    </>
  ) : (
    <>
      <ProgressBar mode="indeterminate" style={{ height: "6px" }}></ProgressBar>
      <ProgressBar mode="indeterminate" style={{ height: "6px" }}></ProgressBar>
      <ProgressBar mode="indeterminate" style={{ height: "6px" }}></ProgressBar>
      <ProgressBar mode="indeterminate" style={{ height: "6px" }}></ProgressBar>
      <ProgressBar mode="indeterminate" style={{ height: "6px" }}></ProgressBar>
      <ProgressBar mode="indeterminate" style={{ height: "6px" }}></ProgressBar>
      <ProgressBar mode="indeterminate" style={{ height: "6px" }}></ProgressBar>
      ;
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    tenders: state.tenders.tenders,
    suppliers: state.suppliers.suppliers,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchTenders: () => dispatch(fetchTender()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MediaCard);
