import React, { useState, useEffect } from "react";
import "./SearchPage.css";
import { Button } from "@material-ui/core";
import SearchResult from "./SearchResult/SearchResult";
import axios from "axios";
import { useLocation } from "react-router";

const SearchPage = () => {
  const [rooms, setRooms] = useState([]);
  const [showCancel, setShowCancel] = useState(false);

  const uselocation = useLocation();

  let location = {};
  if (uselocation.state) {
    location = uselocation.state.location;
  }
  useEffect(() => {
    async function fetchData() {
      try {
        let path = "/rooms";
        if (location) {
          path = `/rooms/location/${location}`;
        }
        const res = await axios.get(path, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (res.data) {
          setRooms(res.data);
        }
      } catch (err) {
        console.log(err.response);
      }
    }
    fetchData();
  }, [setRooms, location]);

  const searchResult = showCancel
    ? rooms
        .filter((room) => {
          return room.cancellation === true;
        })
        .map((room) => {
          return (
            <SearchResult
              key={room._id}
              img={
                room.imageData && "http://localhost:5000/" + room.imageData.path
              }
              location={room.location}
              title={room.type}
              description={room.description}
              star={4.73}
              price={"₹ " + room.price}
            />
          );
        })
    : rooms.map((room) => {
        return (
          <SearchResult
            key={room._id}
            img={
              room.imageData && "http://localhost:5000/" + room.imageData.path
            }
            location={room.location}
            title={room.type}
            description={room.description}
            star={4.73}
            price={"₹ " + room.price}
          />
        );
      });

  return (
    <div className="searchPage">
      <div className="searchPage__info">
        <p>{`${rooms.length} stays`} - 27 August to 31 August - 2 guest</p>
        <h1>Stays nearby</h1>
        <Button variant="outlined" onClick={() => setShowCancel(!showCancel)}>
          Cancellation {showCancel.toString()}
        </Button>
        <Button variant="outlined">Type of place</Button>
        <Button variant="outlined">Price</Button>
        <Button variant="outlined">Rooms and beds</Button>
        <Button variant="outlined">More filters</Button>
      </div>
      {rooms.length > 0 ? (
        searchResult
      ) : (
        <div>
          <h3>Nothing Hosted yet</h3>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
