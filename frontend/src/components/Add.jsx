import { Box, Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const Add = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [inputs, setInputs] = useState({
    title: "",
    content: "",
    img_url: "",
  });
  useEffect(() => {
    if (location.state !== null && location.state.blog) {
      const {title, content, img_url} = location.state.blog;
      setInputs({ title, content, img_url });
    }
  }, [location]);
  const inputHandler = (e) => {
    console.log(e.target.value);
    setInputs({ ...inputs, [e.target.name]: e.target.value });
    console.log("in",inputs);
  };
  const addData = () => {
    if (location.state && location.state.blog) {
      const id = location.state.blog._id;
      axios
        .put(`http://localhost:3001/update/${id}`, inputs)
        .then(() => {
          alert("Blog updated!");
          navigate("/");
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .post("http://localhost:3001/add", inputs)
        .then(() => {
          alert("Blog added!");
          navigate("/");
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <div>
      <div>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "90vh",
          }}
        >
          <Box
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: "600px",
            }}
          >
            <TextField
              variant="outlined"
              placeholder="Title"
              onChange={inputHandler}
              name="title"
              value={inputs.title}
              fullWidth
            />
            <TextField
              variant="outlined"
              placeholder="content"
              onChange={inputHandler}
              name="content"
              value={inputs.content}
              multiline={4}
            />
            <TextField
              variant="outlined"
              placeholder="image url"
              onChange={inputHandler}
              name="img_url"
              value={inputs.img_url}
            />

            <Button variant="contained" color="secondary" onClick={addData}>
              Submit
            </Button>
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default Add;
