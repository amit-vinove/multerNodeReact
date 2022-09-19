import React from "react";
import { useState,useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Navbar , Nav , Button,Table} from "react-bootstrap";
import './uploadForm.css';

export default function UploadForm() {
    const [records, setRecords] = useState([]);

    useEffect(() => {
        axios
          .get(
            `http://localhost:3005/api/getData`
          )
          .then((response) => {
            setRecords(response.data);
          });
      }, []);
      console.log(records);
    

      const download = (e,imgName) => {
        fetch(`http://localhost:3005/api/images/${imgName}`, {
          method: "GET",
          headers: {}
        })
          .then(response => {
            response.arrayBuffer().then(function(buffer) {
              const url = window.URL.createObjectURL(new Blob([buffer]));
              const link = document.createElement("a");
              link.href = url;
              link.setAttribute("download", imgName.split("_")[0]); //or any other extension
              document.body.appendChild(link)
              link.click();
            });
          })
          .catch(err => {
            console.log(err);
          })}

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Image Upload</Navbar.Brand>
          <Nav className="me-2">
            <Nav.Link><h5 style={{'marginTop':'4px'}}>User : </h5></Nav.Link>
            <Nav.Link><Button variant="danger">Logout</Button></Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <div>
        <div className="container">
        <h3 className="title">Image Records</h3>
        <Table striped hover>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Image Name</th>
          <th>Profile Image</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {records && records.map((record) => (
        <tr>
          <td>{record.name}</td>
          <td>{record.email}</td>
          <td>
            <img src={`http://localhost:3005/api/images/${record.image}`}  width="80"/>
            </td>
          <td>{record.image.split("_")[0]}</td>
          <td>
            <a href={`http://localhost:3005/api/images/${record.image}`}><Button variant="info">View</Button></a>
            <a  onClick={e => download(e,record.image)}><Button variant="primary" style={{'marginLeft':'10px'}}>Download</Button></a>
          </td>
        </tr>
        ))}
      </tbody>
    </Table>
        </div>
      </div>
    </div>
  );
}
