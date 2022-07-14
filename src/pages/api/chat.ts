import type { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";
const Pusher = require("pusher");

// Initializing the cors middleware
// You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
const cors = Cors({
  methods: ["POST", "GET", "HEAD", "PUT"],
});

const config = {
  pusher: {
    app_id: "1435319",
    key: "15ee77871e1ed5258044",
    secret: "4c2b97bec11d18dc8a13",
    cluster: "ap1",
  },
};

const pusher = new Pusher({
  appId: config.pusher.app_id,
  key: config.pusher.key,
  secret: config.pusher.secret,
  cluster: config.pusher.cluster,
  encrypted: true,
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Run the middleware
  await runMiddleware(req, res, cors);

  // Rest of the API logic
  const {
    query: { id, name },
    method,
  } = req;

  switch (method) {
    case "GET":
      // Get data from your database
      // res.status(200).json({ id, name: `User ${id}` })
      res.json({ message: "Hello Everyone!" });
      break;
    case "POST":
      // Update or create data in your database
      const payload = req.body;
      console.log("----------", payload);
      pusher.trigger("chat", "message", payload);
      // res.send(payload);
      res.json({ message: payload });
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
