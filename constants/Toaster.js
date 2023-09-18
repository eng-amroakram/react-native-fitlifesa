import Toast from "react-native-root-toast";
import translate from "../lang/localizer";
import { Dimensions } from "react-native";

const colors = {
  error: "#FF6347", //red #FF6B6B #FF0000 #FF6347 #FF4500 #FF7F50 #FFA07A #FFDAB9
  success: "#4CAF50", //green #00FF00 #7CFC00 #00FA9A #98FB98 #90EE90 #00FF7F #3CB371 #2E8B57 #228B22 #008000 #006400
  warning: "#FFA500", //orange #FFA500 #FF8C00 #FF7F50 #FF6347 #FF4500 #FFD700
  info: "#1E90FF", //blue #00BFFF #1E90FF #87CEFA #4682B4 #4169E1 #0000FF #0000CD #00008B #000080 #191970 #7B68EE #6A5ACD #483D8B #4B0082 #8A2BE2 #9400D3 #9932CC #8B008B #800080 #9370DB #D8BFD8 #DDA0DD #EE82EE #DA70D6 #FF00FF #FF00FF #BA55D3 #9370DB #663399 #8B008B #800080 #4B0082 #6A5ACD #483D8B #7B68EE #4169E1 #0000FF #0000CD #00008B #000080 #191970 #00BFFF #1E90FF #87CEFA #4682B4 #323E48
  default: "#2B2C2B", //blue #00BFFF #1E90FF #87CEFA #4682B4 #4169E1 #0000FF #0000CD #00008B #000080 #191970 #7B68EE #6A5ACD #483D8B #4B0082 #8A2BE2 #9400D3 #9932CC #8B008B #800080 #9370DB #D8BFD8 #DDA0DD #EE82EE #DA70D6 #FF00FF #FF00FF #BA55D3 #9370DB #663399 #8B008B #800080 #4B0082 #6A5ACD #483D8B #7B68EE #4169E1 #0000FF #0000CD #00008B #000080 #191970 #00BFFF #1E90FF #87CEFA #4682B4 #323E48
};

const { height, width } = Dimensions.get("screen");

const ToastMessage = (message, type, lang = "en", position = "bottom") => {
  const top = Toast.positions.TOP;
  const bottom = Toast.positions.BOTTOM;

  Toast.show(translate(message, lang), {
    duration: Toast.durations.LONG,
    position: Toast.positions.BOTTOM,
    shadow: true,
    animation: true,
    backgroundColor: colors[type],
    textColor: "#ffffff",
    textStyle: { fontSize: 14, textAlign: "center", fontWeight: "bold" },
    containerStyle: { borderRadius: 15, padding: 8, width: width * 0.7 },
    opacity: 0.9,
  });
};

export default ToastMessage;
