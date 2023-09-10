import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import CustomizedDialogs from "../dialog/dialog";
import { CardActionArea } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";

export default function Posts({ searchInput, postData, onDeleteItem }) {
  console.log(postData);
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const handleClose = () => {
    setOpen(false);
  };

  const OnShowComments = (e, id) => {
    e.preventDefault();
    setSelectedId(id);
    setOpen(true);
    console.log(postData, "new ");
  };

  const deleteArrayItem = (e, indexToDelete) => {
    e.preventDefault();
    onDeleteItem(indexToDelete);
  };

  const handleRefreshPage = () => {
    localStorage.removeItem("searchTerm");
    window.location.reload();
  };

  return (
    <>
      {open && (
        <CustomizedDialogs
          open={open}
          handleClose={handleClose}
          selectedId={selectedId}
        />
      )}
      <div className="post_List">
        <h2>All Posts</h2>
        <div class="refresh_page">
          <Button
            size="small"
            variant="contained"
            startIcon={<RefreshIcon />}
            aria-label="delete"
            onClick={handleRefreshPage}
          >
            Refresh
          </Button>
        </div>
        <div className="post_count">
          <span style={{ textAlign: "left", color: "indigo" }}>
            {
              postData.filter((post) =>
                post.title.toLowerCase().includes(searchInput.toLowerCase())
              )?.length
            }
          </span>
          :Posts Found
        </div>
        {postData.filter((post) =>
          post.title.toLowerCase().includes(searchInput.toLowerCase())
        ).length > 0 ? (
          postData
            .filter((post) =>
              post.title.toLowerCase().includes(searchInput.toLowerCase())
            )
            .map((item, index) => (
              <CardActionArea>
                <Card
                  style={{ marginBottom: "15px" }}
                  sx={{ minWidth: 275 }}
                  className="FeedPost"
                  onClick={(e) => OnShowComments(e, item.id)}
                  key={index}
                >
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="div"
                      className="post_fonts"
                    >
                      {item.title.length >= 20
                        ? item.title + "..."
                        : item.title}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      className="post_fonts"
                    >
                      {item.body}
                      <br />
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      variant="contained"
                      startIcon={<DeleteIcon />}
                      aria-label="delete"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteArrayItem(e, index);
                      }}
                    >
                      Delete
                    </Button>
                  </CardActions>
                </Card>
              </CardActionArea>
            ))
        ) : (
          <div>
            <img
              src="/images/no-results.png"
              width="200px"
              alt="notFound"
              height="200px"
            />
            <h5
              style={{
                textAlign: "center",
                alignItems: "center",
                top: "50%"
              }}
            >
              Posts Not Found
            </h5>
          </div>
        )}
      </div>
    </>
  );
}
