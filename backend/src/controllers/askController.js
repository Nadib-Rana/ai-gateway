import axios from "axios";
import QueryLog from "../models/QueryLog.js";
import { chooseAPI } from "../utils/routerEngine.js";

const apis = [
  { name: "HuggingFace", endpoint: "https://api-inference.huggingface.co/models/gpt2", key: process.env.HF_API_KEY },
  { name: "OpenRouter", endpoint: "https://openrouter.ai/api/v1/chat/completions", key: process.env.OPENROUTER_KEY }
];

export const handleQuery = async (req, res) => {
  const { query, mode } = req.body;
  let results = [];

  try {
    if (mode === "broadcast") {
      results = await Promise.all(
        apis.map(async (api) => {
          const response = await axios.post(api.endpoint, { inputs: query }, { headers: { Authorization: `Bearer ${api.key}` } });
          return { api: api.name, response: response.data };
        })
      );
    } else {
      const selectedAPI = chooseAPI(query);
      const api = apis.find(a => a.name === selectedAPI);
      const response = await axios.post(api.endpoint, { inputs: query }, { headers: { Authorization: `Bearer ${api.key}` } });
      results = [{ api: api.name, response: response.data }];
    }

    await QueryLog.create({ query, mode, responses: results });

    res.json({ query, mode, results });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
};
