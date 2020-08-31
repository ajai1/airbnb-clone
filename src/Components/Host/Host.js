import React, { useState, useEffect } from "react";
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

const Host = () => {
  //States
  const [file, setFile] = useState("");
  const [TypeOfRoom, setTypeOfRoom] = useState("");
  const [Location, setLocation] = useState("");
  const [NumberOfBeds, setNumberOfBeds] = useState("");
  const [GuestsAllowed, setGuestsAllowed] = useState("");
  const [PriceInRupees, setPriceInRupees] = useState("");
  const [AvailableFrom, setAvailableFrom] = useState(new Date());
  const [AvailableTill, setAvailableTill] = useState(new Date());
  const [Cancellation, setCancellation] = useState(false);
  const [filename, setFileName] = useState("Choose File");
  const [image, setImage] = useState("");

  //File Uploads
  const onFileUpload = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };
  //Submission
  const onSubmitForm = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("imageData", file);
    formData.append("type", TypeOfRoom);
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
      if (res.data && res.data.imageData) {
        setImage(`http://localhost:5000/${res.data.imageData.path}`);
      }
    } catch (err) {
      console.log(err.response);
    }
  };

  //   useEffect(() => {}, [image]);

  return (
    <div>
      <h1>Host</h1>
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
          value={NumberOfBeds}
          onChange={(e) => setNumberOfBeds(e.target.value)}
        />
        <TextField
          className="inputs"
          id="outlined-basic"
          label="Guests allowed"
          variant="outlined"
          value={GuestsAllowed}
          onChange={(e) => setGuestsAllowed(e.target.value)}
        />
        <TextField
          className="inputs"
          id="outlined-basic"
          label="Price in Rupees"
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
              onChange={(e) => setAvailableFrom(e.target.value)}
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
              onChange={(e) => setAvailableTill(e.target.value)}
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
        <input
          accept="image/*"
          id="contained-button-file"
          type="file"
          onChange={onFileUpload}
          style={{ display: "none" }}
        />
        <label htmlFor="contained-button-file">
          <Button variant="contained" color="primary" component="span">
            Attach Image
          </Button>
          {filename}
        </label>
        <div style={{ margin: "10px 0" }}>
          <Button type="submit" variant="contained" color="primary">
            Host Now !!!
          </Button>
        </div>
      </form>
      {image && (
        <div>
          <img src={image} alt="none" />
        </div>
      )}
    </div>
  );
};

export default Host;
