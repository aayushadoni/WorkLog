import React, { useState, useEffect } from "react";
import  {useParams} from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";

import { BallTriangle } from "react-loader-spinner";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie, Bar } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);
function Overview() {
  let { id } = useParams();
  const employeeId  =  id;
  const staus = localStorage.getItem('status');
  const [loading, setloading] = useState(false);
  const [date, setdate] = useState("");
  const [date1, setdate1] = useState("");
  const [date2, setdate2] = useState(new Date());
  const [date3, setdate3] = useState("");
  const [arra,setarra] = useState([]);
  const [time, settime] = useState("");
  const [WorkData ,setWorkData] = useState([]);
  const [BreakData ,setBreakData] = useState([]);
  const [MeetData ,setMeetData] = useState([]);
  const token = localStorage.getItem("jwt");
  const url = "https://work-log-backend.herokuapp.com";

  console.log(staus)
  var array = [];
  var work =[];
  var Break = [];
  var meet = [];
  const headers = {
      "Content-Type": "application/json",
    };
    let string = 'n';
  const getDateperday = (e) =>{
    console.log(e);

        if(e){
          for(let i=0; i<7;i++)
        {     string='';
              string = string.concat(employeeId," ",e[i])
              axios
                .get(`${url}/task/get/${string}`, { headers})
                .then((res) => {
                  const d = res.data.totalWorkTime
                  work.push(d);
                  meet.push(res.data.totalMeetTime);
                  Break.push(res.data.totalBreakTime);
                  if(i==6)
                  {console.log(Break)
                  setBreakData(Break);
                  setWorkData(work);
                  setMeetData(meet);}
                });
        }
        }
  }
 const weeklyDays=(e)=>{ if (e) {
    for (let i = 0; i < 7; i++) {
      const d = new Date(e - 86400000 * i);
      var v = getdate(d);
      console.log(date2);
      array.push(v);
      setarra(array);
    }  
    getDateperday(array);
  }
  }
  const data = {

      labels: ["Break", "Work", "Meetings"],
      datasets: [
        {
          label: "# of Votes",
          data: [BreakData[1], WorkData[1], MeetData[1]],
          backgroundColor: [
            "rgba(255, 99, 132, 0.3)",
            "rgba(54, 162, 235, 0.3)",
            "rgba(255, 206, 86, 0.3)",
          ],
          borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)"],
          borderWidth: 1,
        },
      ],
    };
  const data1 = {

      labels: ["Break", "Work", "Meetings"],
      datasets: [
        {
          label: "# of Votes",
          data: [BreakData[0], WorkData[0], MeetData[0]],
          backgroundColor: [
            "rgba(255, 99, 132, 0.3)",
            "rgba(54, 162, 235, 0.3)",
            "rgba(255, 206, 86, 0.3)",
          ],
          borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)"],
          borderWidth: 1,
        },
      ],
    };
    
     const barData = {
      labels: arra,
      datasets: [
        {
          label: "Break",
          data: BreakData,
          backgroundColor: ["rgba(255, 99, 132, 0.3)"],
          borderColor: ["rgba(255, 99, 132, 1)"],
          borderWidth: 1,
          order: 1,
        },
        {
          label: "Work",
          data: WorkData,
          backgroundColor: ["rgba(54, 162, 235, 0.3)"],
          borderColor: ["rgba(54, 162, 235, 1)"],
          borderWidth: 1,
          order: 2,
        },
        {
          label: "Meetings",
          data: MeetData,
          backgroundColor: ["rgba(255, 206, 86, 0.3)"],
          borderColor: ["rgba(255, 206, 86, 1)"],
          borderWidth: 1,
          order: 3,
        },
      ],
    };


  function getdate(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [day, mnth, date.getFullYear()].join("-");
  }
  function gettime(str) {
    var date = new Date(str),
      hours = ("0" + date.getHours()).slice(-2),
      minutes = ("0" + date.getMinutes()).slice(-2);
    return [hours, minutes].join(":");
  }
  const getdate1 = (e) =>{
      setdate2(e);
      const d = getdate(e);
      setdate3(d);
      console.log(d);
  }


  const Dateandtime = (e) => {
    setdate1(e);
    const d = getdate(e);
    const t = gettime(e);
    setdate(d);
    settime(t);
  };
  useEffect(() => {
    setloading(true);
    weeklyDays(date2);
    setTimeout(() => {
      setloading(false);
    }, 1500);
  }, []);

  if (token) {
    return (
      <div>
        {loading ? (
          <div
            style={{ height: "100vh", backgroundColor: "rgba(0,0,0,0.99" }}
            className="w-100 border d-flex justify-content-center align-items-center text-center"
          >
            <BallTriangle height="100" width="100" color="#e39a09" ariaLabel="loading" />
          </div>
        ) : (
          <DashboardLayout>
            <DashboardNavbar />
            <MDBox
              variant="gradient"
              bgColor="info"
              borderRadius="lg"
              coloredShadow="success"
              mx={2}
              mt={3}
              p={3}
              mb={1}
              textAlign="center"
            >
              <MDTypography display="block" variant="button" color="white" my={1}>
                <h6>Employee Dashboard</h6>
              </MDTypography>
            </MDBox>
            <MDBox className='d-flex justify-content-center align-item-center'>
            <MDBox className='my-5'>
            <DatePicker
                    dateFormat="dd-MM-yyyy"
                    selected={date2}
                    onChange={(date) => {getdate1(date),weeklyDays(date)}}
                    maxDate={new Date()}
                  />
             
            </MDBox>
            </MDBox>
         
            <MDBox>
              <div className="row px-5 my-5 d-flex justify-content-center">
                <div className=" px-2 col-md-5 col-lg-5">
                  <Pie
                    data={data1}
                    width={300}
                    height={200}
                    options={{
                      responsive: true,
                    }}
                  />
                  <h6 className="my-5 mx-5">{arra[0]}</h6>
                </div>
                <div className=" px-2 col-md-5 col-lg-5">
                  <Pie
                    data={data}
                    width={300}
                    height={200}
                    options={{
                      responsive: true,
                    }}
                  />
                  <h6 className="my-5 mx-5">{arra[1]}</h6>
                </div>
              </div>
              <div className="my-5">
                <Bar
                  data={barData}
                  options={{
                    responsive: true,
                    scales: {
                      x: {
                        stacked: true,
                      },
                      y: { stacked: true, stacked: true, beginAtZero: true },
                    },
                  }}
                />
              </div>
            </MDBox>

            <Footer />
          </DashboardLayout>
        )}
      </div>
    );
  } else {
    return <div>Please login</div>;
  }
}

export default Overview;
