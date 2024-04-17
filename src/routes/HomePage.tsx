import React from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import { set } from "../state/navBarSlice";
import { Box, Typography } from "@mui/material";

const HomePage = () => {
  let dispatch = useDispatch();
  dispatch(set(0));
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography sx={{ fontSize: "30px" }}>Welcome to </Typography>
        <Typography
          sx={{
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundImage: "-webkit-linear-gradient(45deg, #5514B4, #FF80FF)",
            fontSize: "35px",
          }}
        >
          Generic Pokemon Website
        </Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", margin: "100px" }}>
        <img
          src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/31c8681d-d3ac-463b-8135-4cef53ae3a22/dflm3dg-65cf7312-8329-47ba-acbc-c423d1da2cee.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzMxYzg2ODFkLWQzYWMtNDYzYi04MTM1LTRjZWY1M2FlM2EyMlwvZGZsbTNkZy02NWNmNzMxMi04MzI5LTQ3YmEtYWNiYy1jNDIzZDFkYTJjZWUucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.-vyZSnt5El-FDMXJ8FPRUhMcyZcP4o7sGC7AQBbf9ng"
          alt="Welcome"
          width={800}
          className="Image"
        />
      </Box>
    </Box>
  );
};

export default HomePage;
