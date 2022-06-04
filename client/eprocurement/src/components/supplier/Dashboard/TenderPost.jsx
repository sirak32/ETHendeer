import * as React from "react";
// import Card from '@mui/material/Card';
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
// import Button from '@mui/material/Button';
import Typography from "@mui/material/Typography";
import { MdArrowDropDown } from "react-icons/md";
import { Grid, Stack } from "@mui/material";
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

const MediaCard = ({ tenders, fetchTenders }) => {
  const toast = useRef(null);
const [selected,setSelected]=useState({})
  const header = <img alt="Card" src={img} />;
  const footer = (t)=>(
    
    <span>
      <Button
        label="Apply"
        icon="pi pi-check"
        onClick={() => {
          setSelected(t)
          setVis(true);
          // toast.current.show({
          //   severity: "success",
          //   summary: "Success Message",
          //   detail: "Message Content",
          //   life: 3000,
          // });
        }}
      />
      <Button
        label="See Detail"
        icon="pi pi-chevron-circle-down"
        className="p-button-secondary ml-2"
        onClick={() => {
          // setSelected(t)
          setVis2(true);
        }}
      />
    </span>
  );
  const seen=<i class="pi pi-eye text-xl text-yellow-500  font-medium "> 3k</i>
  const [vis, setVis] = useState(false);
  const [vis2, setVis2] = useState(false);
  console.log("tenders are from supplier", tenders);
  useEffect(() => {
    fetchTenders();
  }, []);

  return tenders.length !== 0 ? (
    <>
      <Grid container spacing={5}>
        {tenders.map((t) => (
          <Grid item xs={3}>
            <Card
              className="m-0 scalein animation-duration-250 max-h-1rem"
              title={t.title}
              subTitle={seen}
              style={{ width: "25em" }}
              footer={footer(t)}
              header={header}
            >
              <p className="m-0 " style={{ lineHeight: "1.5" }}>
                {/* Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Inventore sed consequuntur error repudiandae numquam deserunt
                quisquam repellat libero asperiores earum nam nobis, culpa
                ratione quam perferendis esse, cupiditate neque quas! */}
               {t.description}
              </p>
            </Card>

            <Toast  ref={toast} />
          </Grid>
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
          <div className="col">
            <p class="text-4xl w-10 font-semibold">
              Tender Title : - {selected.title}
            </p>
            <p class="text-4xl w-10 font-semibold">
              Tender Description :- {selected.description}
            </p>
            <p class="text-4xl w-10 font-semibold">Published Date</p>
            <p class="text-4xl w-10 font-semibold">Closing Date</p>
            <p class="text-4xl w-10 font-semibold">Bid Opening Date</p>
            <p class="text-4xl w-10 font-semibold">Attached Documents</p>
            <Button
              onClick={() => {
                saveAs(
                  `http://localhost:5001/image/${selected.document}`,
                  `Tender Bid ${selected.document}.pdf`
                );
              }}
              className="w-full  p-0 h-6rem flex justify-content-center bg-yellow-400"
              aria-label="Amazon"
            >
              <i className="pi pi-download px-2 bg-yellow-400"></i>
              <span className="px-3 align-self-center flex bg-yellow-400">
                Download Documents
              </span>
            </Button>
          </div>
          <Card
            title="Simple Card "
            style={{ width: "25rem", marginBottom: "2rem" }}
            className="col m-6 p-6"
          >
            <p className="m-0  " style={{ lineHeight: "1.5" }}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              
            </p>

            <p class="text-2xl w-10 font-semibold">
              Tender Title : - {selected.title}
            </p>
            <p class="text-2xl w-10 font-semibold">
              Tender Description :- {selected.description}
            </p>
            <p class="text-2xl w-10 font-semibold">Published Date</p>
            <p class="text-2xl w-10 font-semibold">Closing Date</p>
            <p class="text-2xl w-10 font-semibold">Bid Opening Date</p>
            <p class="text-2xl w-10 font-semibold">Attached Documents</p>
          </Card>
        </div>
        <Button
          className="w-full  p-0 h-6rem flex justify-content-center"
          aria-label="Amazon"
        >
          <i className="pi pi-right px-2"></i>
          <span
            className="px-3 align-self-center flex m-4"
            onClick={() => {
              toast.current.show({
                severity: "success",
                summary: "Success Message",
                detail: "Message Content",
                life: 3000,
              });
            }}
          >
            Apply
          </span>
        </Button>
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
