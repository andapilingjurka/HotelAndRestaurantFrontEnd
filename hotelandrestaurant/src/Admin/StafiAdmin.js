import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Nav from "./include/Nav";
import Sidebar from "./include/Sidebar";

function StafiAdmin() {
  const [toggle, setToggle] = useState(true);
  const [stafi, setStafi] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [id, setId] = useState("");
  const [emri, setEmri] = useState("");
  const [mbiemri, setMbiemri] = useState("");
  const [image, setImage] = useState("");
  const [nrTelefonit, setNrTelefonit] = useState("");
  const [kualifikimi, setKualifikimi] = useState("");
  const inputFileRef = useRef(null);

  const Toggle = () => {
    setToggle(!toggle);
  };

  useEffect(() => {
    loadStafi();
  }, []);

  async function loadStafi() {
    try {
      const response = await axios.get('https://localhost:7264/api/Staff/GetAllList');
      setStafi(response.data);
      console.log(stafi)
    } catch (error) {
      console.error("Error loading stafi:", error);
    }
  }
  
  async function save(event) {
    event.preventDefault();
    try {
      await axios.post("https://localhost:7264/api/Staff/Add", {
        name: emri,
        surname: mbiemri,
        image: image, 
        nrPhone: nrTelefonit, 
        cualification: kualifikimi,
        rewardBonusId: 1, 
        rewardBonus: {
          name: 'Performance Bonus',
          amount: 100.00,
          reason: 'Exceeded targets',
          date: '2024-04-24T00:00:00' 
        }
      });
      //showAndHideAlert("Guest has been successfully registered!");
      setId("");
      setEmri("");
      setMbiemri("");
      setImage("");
      setNrTelefonit("");
      setKualifikimi("");
      
      
    } catch (err) {
    //  console.error('Error:', error);
  }
  }
//   async function save(event) {

//     const stafiData = {
//   id: 0, 
//   name: emri,
//   surname: mbiemri,
//   image: image, 
//   nrPhone: nrTelefonit, 
//   cualification: kualifikimi,
//   rewardBonusId: 1, 
//   rewardBonus: {
//     name: 'Performance Bonus',
//     amount: 100.00,
//     reason: 'Exceeded targets',
//     date: '2024-04-24T00:00:00' 
//   }
// };
// fetch('https://localhost:7264/api/Staff/Add', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify(stafiData)
// })
// .then(response => {
//   if (response.ok) {
//     return response.json();
//   } else {
//     throw new Error('POST request failed');
//   }
// })
// .then(data => {
//   console.log('Success:', data);
//   clearForm();
//       loadStafi();
// })
// .catch(error => {
// 
// });

  //  event.preventDefault();
  //   try {
  //     await axios.post('https://localhost:7010/api/Staff/Add', {
  //       name: emri,
  //       surname: mbiemri,
  //       Image: image,
  //       nrPhone: nrTelefonit,
  //       cualification: kualifikimi,
  //     });
  //     clearForm();
  //     loadStafi();
  //   } catch (error) {
  //     console.error("Error saving stafi:", error);
  //   }
  // }

  async function deleteStafi(stafiId) {
    try {
      await axios.delete(`https://localhost:7264/api/Staff/Delete/${stafiId}`);
      loadStafi();
    } catch (error) {
      console.error("Error deleting stafi:", error);
    }
  }

  async function editStafi(stafi) {
    setId(stafi.stafiId);
    setEmri(stafi.name);
    setMbiemri(stafi.surname);
    setImage(stafi.image);
    setNrTelefonit(stafi.nrPhone);
    setKualifikimi(stafi.cualification);
  }

  async function update(event) {
    event.preventDefault();
    try {
      await axios.put('https://localhost:7264/api/Staff/Update/', {
        stafiId: id,
        emri: emri,
        mbiemri: mbiemri,
        image: image,
        nrTelefonit: nrTelefonit,
        kualifikimi: kualifikimi,
      });
      clearForm();
      loadStafi();
    } catch (error) {
      console.error("Error updating stafi:", error);
    }
  }

  function clearForm() {
    setId("");
    setEmri("");
    setMbiemri("");
    setImage("");
    setNrTelefonit("");
    setKualifikimi("");
    setSelectedImage(null);
    inputFileRef.current.value = "";
  }

  return (
    <div className="container-fluid" style={{ backgroundColor: "#3f4345", minHeight: "100vh", backgroundSize: "cover" }}>
      <div className="row">
        {toggle && (
          <div className="col-4 col-md-2 bg-white vh-100 position-fixed">
            <Sidebar />
          </div>
        )}
        <div className="col-4 col-md-2"></div>
        <div className="col">
          <Nav Toggle={Toggle} />
          <div>
            <h4 className="description">Data for Stafi</h4>
            <div className="container mt-4">
              <form>
                <div className="form-group">
                  <input type="text" className="form-control" id="id" hidden value={id} onChange={(event) => setId(event.target.value)} />
                  <label className="label">Emri</label>
                  <input type="text" className="form-control" id="emri" value={emri} onChange={(event) => setEmri(event.target.value)} />
                </div>
                <div className="form-group">
                  <label className="label">Mbiemri</label>
                  <input type="text" className="form-control" id="mbiemri" value={mbiemri} onChange={(event) => setMbiemri(event.target.value)} />
                </div>
                <div className="form-group">
                  <label className="label">Image</label>
                  <input
                    type="file"
                    ref={inputFileRef}
                    className="form-control"
                    id="image"
                    onChange={(event) => {
                      setSelectedImage(URL.createObjectURL(event.target.files[0]));
                      setImage('./images/' + event.target.files[0].name);
                    }}
                  />
                  {selectedImage && (
                    <img
                      src={selectedImage}
                      style={{ maxWidth: "100%", height: "auto", maxHeight: "150px", marginTop: "10px" }}
                      alt="SelectedImagePreview"
                    />
                  )}
                </div>
                <div className="form-group">
                  <label className="label">Nr Telefonit</label>
                  <input type="text" className="form-control" id="nrTelefonit" value={nrTelefonit} onChange={(event) => setNrTelefonit(event.target.value)} />
                </div>
                <div className="form-group">
                  <label className="label">Kualifikimi</label>
                  <input type="text" className="form-control" id="kualifikimi" value={kualifikimi} onChange={(event) => setKualifikimi(event.target.value)} />
                </div>
                <div>
                  <button className="btn btn-success m-4 button" onClick={save}>
                    Save
                  </button>
                  <button className="btn btn-warning m-4 button" onClick={update}>
                    Update
                  </button>
                </div>
              </form>
            </div>
            <br />
            <div className="table-responsive m-3">
              <table className="table border-gray">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Emri</th>
                    <th scope="col">Mbiemri</th>
                    <th scope="col">Image</th>
                    <th scope="col">Nr Telefonit</th>
                    <th scope="col">Kualifikimi</th>
                    <th scope="col">Options</th>
                  </tr>
                </thead>
                <tbody>
                  {stafi.map((person) => (
                    <tr key={person.stafiId}>
                      <td>{person.stafiId}</td>
                      <td>{person.name}</td>
                      <td>{person.surname}</td>
                      <td>
                        <img src={person.image} style={{ maxWidth: "100%", height: "auto", maxHeight: "150px", borderRadius:"15px" }} alt="PersonPhoto" />
                      </td>
                      <td>{person.nrPhone}</td>
                      <td>{person.cualification}</td>
                      <td>
                        <button className="btn btn-warning mx-1 button" onClick={() => editStafi(person)}>
                          Edit
                        </button>
                        <button className="btn btn-danger mx-1 button" onClick={() => deleteStafi(person.stafiId)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}
export default StafiAdmin;

