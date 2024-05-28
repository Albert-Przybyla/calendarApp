import crypto from "crypto";

const SECRET = "ALA-MA-KOTA-KOT-MA-ALE";

export const random = () => crypto.randomBytes(128).toString("base64");
export const authenticaion = (salt: string, password: string) => {
  return crypto.createHmac("sha256", [salt, password].join("/")).update(SECRET).digest("hex");
};
