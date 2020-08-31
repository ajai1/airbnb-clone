import React, { useState } from "react";
import "./Host.css";
import axios from "axios";
import DateFnsUtils from "@date-io/date-fns";
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

const Host = () => {
  //States
  const [file, setFile] = useState("");
  const [TypeOfRoom, setTypeOfRoom] = useState("");
  const [Description, setDescription] = useState("");
  const [Location, setLocation] = useState("");
  const [NumberOfBeds, setNumberOfBeds] = useState("");
  const [GuestsAllowed, setGuestsAllowed] = useState("");
  const [PriceInRupees, setPriceInRupees] = useState("");
  const [AvailableFrom, setAvailableFrom] = useState(new Date());
  const [AvailableTill, setAvailableTill] = useState(new Date());
  const [Cancellation, setCancellation] = useState(false);
  const [filename, setFileName] = useState("Choose File");

  //File Uploads
  const onFileUpload = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const onFileRemove = () => {
    setFile("");
    setFileName("Choose File");
  };

  //Handle Date
  const availableFromChange = (date) => {
    setAvailableFrom(date);
  };
  const availableTillChange = (date) => {
    setAvailableTill(date);
  };

  //Submission
  const onSubmitForm = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("imageData", file);
    formData.append("type", TypeOfRoom);
    formData.append("description", Description);
    formData.append("location", Location);
    formData.append("beds", NumberOfBeds);
    formData.append("guests", GuestsAllowed);
    formData.append("price", PriceInRupees);
    formData.append("availableFrom", AvailableFrom);
    formData.append("availableTill", AvailableTill);
    formData.append("cancellation", Cancellation);
    try {
      const res = await axios.post("/rooms", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res.data);
      if (res.data) {
        alert("Hosted !!!");
      }
    } catch (err) {
      console.log(err.response);
    }
  };

  return (
    <div className="container">
      <h1>Ready to Host your place?</h1>
      <form className="form-data" onSubmit={onSubmitForm}>
        <TextField
          className="inputs"
          id="outlined-basic"
          label="Type of Room"
          variant="outlined"
          value={TypeOfRoom}
          onChange={(e) => setTypeOfRoom(e.target.value)}
        />
        <TextField
          className="inputs"
          id="outlined-basic"
          label="Description"
          variant="outlined"
          value={Description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          className="inputs"
          id="outlined-basic"
          label="Location"
          variant="outlined"
          value={Location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <TextField
          className="inputs"
          id="outlined-basic"
          label="Number of beds"
          variant="outlined"
          type="number"
          value={NumberOfBeds}
          onChange={(e) => setNumberOfBeds(e.target.value)}
        />
        <TextField
          className="inputs"
          id="outlined-basic"
          label="Guests allowed"
          variant="outlined"
          type="number"
          value={GuestsAllowed}
          onChange={(e) => setGuestsAllowed(e.target.value)}
        />
        <TextField
          className="inputs"
          id="outlined-basic"
          label="Price in Rupees"
          type="number"
          variant="outlined"
          value={PriceInRupees}
          onChange={(e) => setPriceInRupees(e.target.value)}
        />
        <div className="DatePicker">
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              style={{ marginRight: "20px" }}
              margin="normal"
              id="date-picker-dialog"
              label="Available From"
              format="MM/dd/yyyy"
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
              value={AvailableFrom}
              onChange={availableFromChange}
            />
            <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog"
              label="Available Till"
              format="MM/dd/yyyy"
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
              value={AvailableTill}
              onChange={availableTillChange}
            />
          </MuiPickersUtilsProvider>
        </div>
        <FormControlLabel
          control={
            <Checkbox
              name="checkedB"
              color="primary"
              value={Cancellation}
              onChange={(e) => setCancellation(!Cancellation)}
            />
          }
          label="Cancellation Allowed"
        />
        <div className="AttachImage">
          <input
            accept="image/*"
            id="contained-button-file"
            type="file"
            onChange={onFileUpload}
            style={{ display: "none" }}
          />
          <label htmlFor="contained-button-file">
            <Button
              variant="outlined"
              component="span"
              style={{
                marginRight: "10px",
                textTransform: "inherit",
              }}
            >
              Attach Image
            </Button>
            <span>{filename}</span>
          </label>
          {file && (
            <DeleteForeverIcon color="secondary" onClick={onFileRemove} />
          )}
        </div>

        <div style={{ margin: "10px 0" }}>
          <Button type="submit" variant="contained" color="primary">
            Host Now !!!
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Host;
