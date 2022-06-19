import jsonwebtoken from "jsonwebtoken";

const secret = process.env.JWTSECRET || "hehehe";

const generate = (payload: { [key: string]: any }) => {
  return jsonwebtoken.sign(payload, secret, { expiresIn: "1y" });
};

const verify = (token: string) => {
  return jsonwebtoken.verify(token, secret) as { [key: string]: any };
};

export default { generate, verify };
