import { ObjectId } from "mongoose";

export interface UserData {
  id: string;
  username: string;
  email: string;
}

export interface UserKeyData {
  id: string;
  key: string;
}
