import React from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import { set } from "../state/navBarSlice";

const HomePage = () => {
  let dispatch = useDispatch();
  dispatch(set(0));
  return (
    <div>
      <div className="Title">Welcome to Generic Pokemon Website!</div>
      <div className="Title-image">
        <img
          src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/31c8681d-d3ac-463b-8135-4cef53ae3a22/dflm3dg-65cf7312-8329-47ba-acbc-c423d1da2cee.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzMxYzg2ODFkLWQzYWMtNDYzYi04MTM1LTRjZWY1M2FlM2EyMlwvZGZsbTNkZy02NWNmNzMxMi04MzI5LTQ3YmEtYWNiYy1jNDIzZDFkYTJjZWUucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.-vyZSnt5El-FDMXJ8FPRUhMcyZcP4o7sGC7AQBbf9ng"
          alt="Welcome"
          width={800}
          className="Image"
        />
      </div>
    </div>
  );
};

export default HomePage;
