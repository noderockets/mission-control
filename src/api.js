import { useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";
import { compareDesc, formatDistance, format } from "date-fns";
let base = localStorage.base || "192.168.0.83";
let baseUrl = `http://${base}`;
export const getBase = () => {
  return base;
};

if (window.location.protocol === "https:") {
  fetch(`https://${base}/ping`).catch(err => {
    if (window.confirm("Accept Cert?")) {
      window.location = `https://${base}/redirect?url=${window.location.href}`;
    }
  });
}

export const setBase = newBase => {
  localStorage.base = newBase;
  return (base = newBase);
};

export const socket = io(baseUrl);

export const emit = (...args) => {
  socket.emit(...args);
};
// export const socket = io("http://localhost:4000");

socket.on("connect", () => console.log("connected"));
socket.on("disconnect", () => console.log("disconnected"));
socket.on("strategy-log", console.log);

export function transform(d) {
  if (!d.altitude) return false;
  return {
    timestamp: new Date(d.timestamp),
    altitude: d.altitude * 3.28084
  };
}

export async function getLaunches() {
  const { data } = await axios.get(`${baseUrl}/launches`);
  return data
    .map(launch => {
      const now = new Date();
      let date = new Date(launch);

      if (now.getTime() - date.getTime() > 1000 * 60 * 60 * 24 * 2) {
        date = format(date, "MMM do yyyy h:mmb");
      } else {
        date = formatDistance(date, now);
      }
      return {
        filename: launch,
        display: date,
        date: new Date(launch)
      };
    })
    .sort((a, b) => compareDesc(a.date, b.date));
}

function getClosestAltitude(altitudeData, timestamp) {
  return altitudeData.reduce((prev, curr) =>
    Math.abs(curr.timestamp - timestamp) < Math.abs(prev.timestamp - timestamp)
      ? curr
      : prev
  );
}

export async function getLaunch(filename) {
  const {
    data: { altitudeData, events, strategyData }
  } = await axios.get(`${baseUrl}/launch/${filename}`);

  const eventData = events.map(evt => {
    const { altitude } = getClosestAltitude(altitudeData, evt.timestamp);
    return { ...evt, altitude };
  });
  const strategy = strategyData.map(evt => {
    const { altitude } = getClosestAltitude(altitudeData, evt.timestamp);
    return { ...evt, altitude };
  });

  return {
    altitude: altitudeData,
    events: eventData,
    strategyData: strategy
  };
}
export async function deleteLaunch(filename) {
  await axios.delete(`${baseUrl}/launch/${filename}`);
  return true;
}

export function useSocket(...args) {
  useEffect(() => {
    socket.on(...args);
    return () => socket.off(...args);
  }, []);
}
