import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const API = process.env.RTO_API_URL;
const API_KEY = process.env.RTO_API_KEY;

export async function fetchFromExternalAPI(rtoNumber) {
  try {
    const response = await axios.post(
      API,
      { reg: rtoNumber },
      {
        headers: {
          Authorization: API_KEY,
          "Content-Type": "application/json",
        },
        maxBodyLength: Infinity,
      }
    );

    return {
      success: true,
      res: response.data,
    };
  } catch (error) {
    return {
      success: false,
      res: error.response?.data || error,
    };
  }
}
