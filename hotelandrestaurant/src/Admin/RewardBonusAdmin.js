import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "./include/Nav";
import Sidebar from "./include/Sidebar";
import { Link, useNavigate } from "react-router-dom";

function RewardBonusAdmin() {
  const [toggle, setToggle] = useState(true);
  const navigate = useNavigate();
  const Toggle = () => {
    setToggle(!toggle);
  };

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");
  const [date, setDate] = useState("");
  const [rewardBonuses, setRewardBonuses] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  useEffect(() => {
    (async () => await loadRewardBonuses())();
  }, []);

  async function loadRewardBonuses() {
    try {
      const result = await axios.get(
        "https://localhost:7264/api/RewardBonus/GetAllList"
      );
      setRewardBonuses(result.data);
    } catch (err) {
      console.error(err);
    }
  }

  async function save(event) {
    event.preventDefault();
    try {
      await axios.post("https://localhost:7264/api/RewardBonus/Add", {
        name: name,
        amount: amount,
        reason: reason,
        date: date,
      });
      showAndHideAlert("The reward bonus has been successfully registered!");
      clearForm();
      loadRewardBonuses();
    } catch (err) {
      showAndHideAlert(`Error: ${err}`, true);
    }
  }

  function clearForm() {
    setId("");
    setName("");
    setAmount("");
    setReason("");
    setDate("");
  }

  async function editRewardBonus(rewardBonus) {
    setName(rewardBonus.name);
    setAmount(rewardBonus.amount);
    setReason(rewardBonus.reason);
    setDate(rewardBonus.date);
    setId(rewardBonus.id);
  }

  async function deleteRewardBonus(id) {
    
    try {
      await axios.delete(
        `https://localhost:7264/api/RewardBonus/Delete/${id}`
      );
      showAndHideAlert("The reward bonus has been successfully deleted!");
      clearForm();
      loadRewardBonuses();
    } catch (err) {
      showAndHideAlert(`Error: ${err}`, true);
    }
  }

  async function update(event) {
    event.preventDefault();
    try {
      const rewardBonus = rewardBonuses.find((rb) => rb.id === id);
      await axios.put(
        `https://localhost:7264/api/RewardBonus/Update/${rewardBonus.id}`,
        {
          id: rewardBonus.id,
          name: name,
          amount: amount,
          reason: reason,
          date: date,
        }
      );
      showAndHideAlert("The reward bonus has been successfully edited!");
      clearForm();
      loadRewardBonuses();
    } catch (err) {
      showAndHideAlert(`Error: ${err}`, true);
    }
  }

  function showAndHideAlert(message, isError = false) {
    setAlertMessage(message);
    setIsAlertVisible(true);

    setTimeout(() => {
      setIsAlertVisible(false);
    }, 3000); // Hide the alert after 3 seconds
  }

  return (
    <div
      className="container-fluid"
      style={{
        backgroundColor: "#3f4345",
        minHeight: "100vh",
        backgroundSize: "cover",
      }}
    >
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
            <h4 className="description">Data for Reward Bonuses</h4>
            <div className="container mt-4">
              <form>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    id="id"
                    hidden
                    value={id}
                    onChange={(event) => {
                      setId(event.target.value);
                    }}
                  />

                  <label className="label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={name}
                    onChange={(event) => {
                      setName(event.target.value);
                    }}
                  />
                </div>

                <div className="form-group">
                  <label className="label">Amount</label>
                  <input
                    type="text"
                    className="form-control"
                    id="amount"
                    value={amount}
                    onChange={(event) => {
                      setAmount(event.target.value);
                    }}
                  />
                </div>

                <div className="form-group">
                  <label className="label">Reason</label>
                  <input
                    type="text"
                    className="form-control"
                    id="reason"
                    value={reason}
                    onChange={(event) => {
                      setReason(event.target.value);
                    }}
                  />
                </div>

                <div className="form-group">
                  <label className="label">Date</label>
                  <input
                    type="date"
                    className="form-control"
                    id="date"
                    value={date}
                    onChange={(event) => {
                      setDate(event.target.value);
                    }}
                  />
                </div>

                <div>
                  <button
                    className="btn btn-success m-4 button"
                    onClick={save}
                  >
                    Save
                  </button>
                  <button
                    className="btn btn-warning m-4 button"
                    onClick={update}
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
            <br />

            {/* Alert Message */}
            {isAlertVisible && (
              <div
                className={`alert ${
                  alertMessage.includes("Error")
                    ? "alert-danger"
                    : "alert-success"
                }`}
              >
                {alertMessage}
              </div>
            )}

            <div className="table-responsive m-3">
              <table className="table border-gray">
                <thead>
                  <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Name</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Reason</th>
                    <th scope="col">Date</th>
                    <th scope="col">Options</th>
                  </tr>
                </thead>
                <tbody>
                  {rewardBonuses.map((rewardBonus) => (
                    <tr key={rewardBonus.id}>
                      <td>{rewardBonus.id}</td>
                      <td>{rewardBonus.name}</td>
                      <td>{rewardBonus.amount}</td>
                      <td>{rewardBonus.reason}</td>
                      <td>{new Date(rewardBonus.date).toLocaleDateString()}</td>
                      <td className="d-flex align-items-center button-container">
                        <button
                          type="button"
                          className="btn btn-warning mx-1 button"
                          onClick={() => editRewardBonus(rewardBonus)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger mx-1 button"
                          onClick={() => deleteRewardBonus(rewardBonus.id)}
                        >
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

export default RewardBonusAdmin;

