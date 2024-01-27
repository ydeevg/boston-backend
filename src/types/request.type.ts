import { Request } from "express";

type RequestType = Request & {
  query?: {
    accessToken?: string
  }
}

export default RequestType