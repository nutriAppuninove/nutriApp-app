import Constants from "expo-constants";

const extra =
  Constants.expoConfig?.extra ??
  Constants.manifest2?.extra ??
  Constants.manifest?.extra;

console.log("extra:", JSON.stringify(extra));

export const API_URL = extra?.apiUrl ?? "http://localhost:3001/api";
