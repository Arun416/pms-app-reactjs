import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Avatar from "@mui/material/Avatar";
import CircularProgress from "@mui/material/CircularProgress";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2)
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1)
  }
}));

export default function CustomizedDialogs({ open, handleClose, selectedId }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data or perform actions based on the selectedId
    if (selectedId) {
      fetch(`https://jsonplaceholder.typicode.com/posts/${selectedId}/comments`)
        .then((response) => response.json())
        .then((data) => {
          localStorage.setItem("comments", JSON.stringify(data));
          let comment = localStorage.getItem("comments");
          let fetchComments = JSON.parse(comment);
          setData(fetchComments);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setLoading(false);
        });
    }
  }, [selectedId]);

  return (
    <div>
      <BootstrapDialog
        class="comments_dialog"
        open={open}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Comments
        </DialogTitle>
        <IconButton
          aria-label="close"
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500]
          }}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>

        <DialogContent
          style={{
            maxWidth: "600px",
            justifyContent: "center"
          }}
          dividers
        >
          {loading ? (
            <CircularProgress />
          ) : (
            data?.map((item, index) => (
              <div key={index}>
                <List
                  sx={{
                    width: "100%",
                    maxWidth: 360,
                    bgcolor: "background.paper"
                  }}
                >
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar
                        alt="Remy Sharp"
                        src="/static/images/avatar/1.jpg"
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={item.email}
                      secondary={<React.Fragment>{item.body}</React.Fragment>}
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </List>
                <hr />
              </div>
            ))
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
