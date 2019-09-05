import { useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";

let base = localStorage.base || "192.168.0.83";
let baseUrl = `http://${base}`
export const getBase = () => {
  return base;
};

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

export function transform(d) {
  return {
    timestamp: new Date(d.timestamp),
    altitude: d.altitude * 3.28084
  };
}

export async function getLaunches() {
  const { data } = await axios.get(`${baseUrl}/launches`);
  return data;
}
export async function getLaunch(filename) {
  const { data } = await axios.get(`${baseUrl}/launch/${filename}`);
  return data.map(transform);
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
