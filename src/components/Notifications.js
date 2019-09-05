import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useSocket } from "../api";

export default function Notifications() {
  const showNotification = ({ title, message, type = "info" }) => {
    const notificationType = toast.TYPE[type.toUpperCase()];

    toast(title, { type: notificationType });
  };
  useSocket("launched", () => {
    showNotification({ title: "Launched!", type: "success" });
  });
  useSocket("parachute-deployed", () => {
    showNotification({
      title: "Parachute Deployed!",
      type: "success"
    });
  });
  useSocket("parachute-armed", () => {
    showNotification({
      title: "Parachute Armed!",
      type: "info"
    });
  });
  useSocket("parachute-disarmed", () => {
    showNotification({
      title: "Parachute Disarmed!",
      type: "warning"
    });
  });
  useSocket("launch-recorded", () => {
    showNotification({
      title: "New Launch Recorded!",
      type: "info"
    });
  });
  return (
    <>
      <ToastContainer />
    </>
  );
}
