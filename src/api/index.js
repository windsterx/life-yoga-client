import axios from "axios";

const url = "https://life-yoga-session-x.herokuapp.com";

export const fetchEvents = () => {
  return axios
    .get(url + "/events")
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return { data: err, status: 400 };
    });
};
export const createEvent = (event) => {
  return axios
    .post(url + "/events", event)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return { data: err, status: 400 };
    });
};
export const createRecord = (event) => {
  return axios
    .post(url + "/register", event)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return { data: err, status: 400 };
    });
};
