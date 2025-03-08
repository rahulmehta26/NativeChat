import { useEffect } from "react";
import { ToastAndroid } from "react-native";

const Notification = ({ message }: { message: string }) => {
  useEffect(() => {
    if (message) {
      ToastAndroid.showWithGravity(
        message,
        ToastAndroid.LONG,
        ToastAndroid.CENTER
      );
    }
  }, [message]);

  return null;
};

export default Notification;
