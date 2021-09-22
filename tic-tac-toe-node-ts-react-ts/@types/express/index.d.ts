import { User } from 'models/tictactoeModel';

interface MyWebAppContext {
  user?: User;
}

declare module 'express-serve-static-core' {
  interface Request {
    myWebApp: MyWebAppContext;
  }
}
