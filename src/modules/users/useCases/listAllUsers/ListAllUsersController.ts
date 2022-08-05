import { Request, Response } from "express";
import { IncomingHttpHeaders } from "http";

import { ListAllUsersUseCase } from "./ListAllUsersUseCase";

interface ICustomHeaders {
  user_id?: string;
}

interface IReqCustom<THeader> extends Request {
  headers: IncomingHttpHeaders & THeader;
}

class ListAllUsersController {
  constructor(private listAllUsersUseCase: ListAllUsersUseCase) {}

  handle(request: IReqCustom<ICustomHeaders>, response: Response): Response {
    const { user_id } = request.headers;

    if (!user_id) {
      throw new Error("Must send a user ID");
    }

    try {
      const users = this.listAllUsersUseCase.execute({ user_id });
      return response.json(users);
    } catch (err) {
      return response.status(400).send({ error: "Error" });
    }
  }
}

export { ListAllUsersController };
