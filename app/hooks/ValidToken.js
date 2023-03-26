/* eslint-disable react-hooks/rules-of-hooks */
import client from "../clients/client";
import { useState } from "react";

const [error, setError] = useState("");
const [response, setResponse] = useState();

async function ValidToken() {
  try {
    const res = await client.post("/checkToken", {
      token: localStorage.getItem("token"),
    })
    setResponse(res.data);
  } catch(e) {
    setError(e.message);
  }
}

export { error, ValidToken, response };