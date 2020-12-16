import React, { createContext, useState } from "react";
import * as api from "../api";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState();
  const getEvents = async () => {
    const { data } = await api.fetchEvents();
    return data;
  };
  const fetchEvents = (date) => {
    getEvents().then((items) => {
      if (items.length > 0) {
        items = items;
      } else {
        items = [];
      }
      setEvents(
        items.filter((item) => {
          return date.toDateString() === new Date(item.showTime).toDateString();
        })
      );
    });
  };
  const handleChange = (e, callback) => {};

  return (
    <AppContext.Provider
      value={{
        getEvents,
        date,
        setDate,
        fetchEvents,
        events,
        setEvents,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
