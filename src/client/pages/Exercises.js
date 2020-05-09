import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { formatDistance, toDate, parseISO, parse } from "date-fns";

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
  console.log(data.data);
  return (
    <div className="grid grid-cols-1 gap-3 p-2 sm:grid-cols-2 lg:grid-cols-3 mt-5">
      {data.data.map(
        ({ createdAt, _id, exercise, duration, postedBy: { username } }) => {
          return (
            <div
              key={_id}
              className="bg-white rounded shadow-lg overflow-hidden"
            >
              <div className="p-3">
                <div className="flex">
                  <span className="text-gray-500 text-sm ml-auto">
                    {`${formatDistance(
                      toDate(parseISO(createdAt)),
                      new Date()
                    )} ago`}
                  </span>
                </div>
                <div className="text-2xl">{exercise}</div>
                <div className="text-lg">{duration}</div>
              </div>
              <div className="bg-red-300 p-2 bg-opacity-75 text-sm p-3 flex items-center">
                <svg
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  className="h-4 mr-1"
                >
                  <path d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>{" "}
                <p className="font-semibold">{username}</p>
              </div>
            </div>
          );
        }
      )}
    </div>
  );
};

export default Exercises;
