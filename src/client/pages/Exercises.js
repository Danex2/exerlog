import React from "react";
import { useQuery } from "react-query";
import axios from "axios";

const fetchExercises = () => {
  return axios.get("http://localhost:3000/exercises");
};

const Exercises = () => {
  const { status, data, error } = useQuery("exercises", fetchExercises);
  if (status === "loading") {
    return <div>Loading!</div>;
  }
  if (status === "error") {
    return <div>There was an error loading the data! {error}</div>;
  }
  return (
    <>
      {data.data.map(({ createdAt, _id, exercise, duration }) => {
        return (
          <div key={_id}>
            <div>{exercise}</div>
            <div>{duration}</div>
            <div>{createdAt}</div>
          </div>
        );
      })}
    </>
  );
};

export default Exercises;
