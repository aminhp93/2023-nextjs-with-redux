import type { NextApiHandler } from "next";
import Pusher from "pusher";

const config = {
  apiUrl: "http://localhost:5000",
  // apiUrl: 'https://2023-reactjs-with-redux.vercel.app',
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

const chatHandler: NextApiHandler = async (request, response) => {
  const { amount = 1 } = request.body;

  // simulate IO latency
  const payload = request.body;
  pusher.trigger("chat", "message", payload);
  response.send(payload);

  response.json({ data: amount });
};

export default chatHandler;
