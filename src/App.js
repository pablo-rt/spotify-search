import React, { useState, useEffect } from "react";
import axios from "axios";
import Form from "./Components/Form";
import Songlist from "./Components/Songlist";
import Login from "./Components/Login";

function App() {
  //App state

  const [search, saveSearch] = useState("");
  const [songs, saveSongs] = useState([]);
  const [currentPage, saveCurrentPage] = useState(1);
  const [maxPagees, saveMaxPages] = useState(1);
  const [userToken, saveUserToken] = useState();

  // store users spotify token
  useEffect(() => {
    const hash = window.location.hash
      .substring(1)
      .split("&")
      .reduce(
        function (initial, item) {
          if (item) {
            var parts = item.split("=");
            initial[parts[0]] = decodeURIComponent(parts[1]);
          }

          return initial;
        },

        {}
      );
    saveUserToken(hash["access_token"]);
    window.location.hash = "";
  }, []);

  //set the auth header to axios request
  const setAuthHeader = () => {
    try {
      if (userToken !== "undefined") {
        axios.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;
      }
    } catch (error) {
      console.log("Error setting auth", error);
    }
  };

  // fetch from spotify api
  const apiQuery = async () => {
    const songsByPage = 12;
    if (search === "") return;
    const offset = (currentPage - 1) * songsByPage;
    const api_url = `https://api.spotify.com/v1/search?query=${encodeURIComponent(
      search
    )}&type=track&limit=${songsByPage}&offset=${offset}`;
    // add access token on request
    setAuthHeader();
    const response = await axios.get(api_url);
    const result = await response.data;
    // store the maximim number of pages that I might need
    const pages_calc = Math.ceil(result.tracks.total / songsByPage);
    saveMaxPages(pages_calc);
    saveSongs(result.tracks.items);
  };

  useEffect(() => {
    apiQuery();
  }, [search, currentPage]);

  const previousPage = () => {
    const newCurrentPage = currentPage - 1;
    if (newCurrentPage === 0) return;
    saveCurrentPage(newCurrentPage);
  };
  const nextPage = () => {
    const newCurrentPage = currentPage + 1;
    if (newCurrentPage > maxPagees) return;
    saveCurrentPage(newCurrentPage);
  };

  return (
    <div className="container ">
      {typeof userToken == "undefined" ? (
        <div className="jumbotron ">
          <h1 className='text-center'> Spotify music search </h1>
          <Login></Login>
        </div>
      ) : (
        <div className="container">
          <div className="jumbotron">
            <p className="lead text-center"> </p>
            <Form saveSearch={saveSearch}
                  saveCurrentPage={saveCurrentPage} />
          </div>
          <div className="row justify-content-center">
            <Songlist songs={songs} />
          </div>
          {currentPage === 1 ? null : (
            <button
              type="button"
              className="btn btn-success mr-1"
              onClick={previousPage}>
              Previous
            </button>
          )}
          {currentPage === maxPagees ? null : (
            <button type="button" className="btn btn-success float-right" onClick={nextPage}>
              Next
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
