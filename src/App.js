import "./styles.css";
import React, { useState, useEffect } from "react";
import ToolbarComponent from "../src/header/Toolbar.js";
import Posts from "./posts/Posts";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";

export default function App() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(true);
  const [loading, setLoading] = useState(null);
  const [openSnack, setOpenSnack] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnack(false);
  };

  const handleFilterChange = (searchTerm) => {
    setSearchTerm(searchTerm);
    localStorage.setItem("searchTerm", searchTerm);
  };

  useEffect(() => {
    // Load the search term from localStorage when the component mounts
    const savedSearchTerm = localStorage.getItem("searchTerm");
    if (savedSearchTerm) {
      setSearchTerm(savedSearchTerm);
    }
  }, []);

  useEffect(() => {
    const apiURL = "https://jsonplaceholder.typicode.com/posts";
    fetch(apiURL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        localStorage.setItem("Posts", JSON.stringify(data));
        let storage = localStorage.getItem("Posts") || [];
        let fetchPost = JSON.parse(storage);
        setData(fetchPost);
        setLoading(false);
      })
      .then((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const deleteArrayItem = (indexToDelete) => {
    const updatedArray = data.filter((_, index) => index !== indexToDelete);
    setData(updatedArray);
    setOpenSnack(true);
    localStorage.removeItem("Posts");
    localStorage.setItem("Posts", JSON.stringify(updatedArray));
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div className="App">
      <ToolbarComponent
        searchInput={searchTerm}
        onFilterChange={handleFilterChange}
      />

      {loading ? (
        <CircularProgress disableShrink />
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <Posts
          searchInput={searchTerm}
          postData={data}
          onDeleteItem={deleteArrayItem}
        />
      )}
      <Snackbar
        open={openSnack}
        autoHideDuration={1000}
        onClose={handleClose}
        message="Post Deleted"
        action={action}
      />
    </div>
  );
}
