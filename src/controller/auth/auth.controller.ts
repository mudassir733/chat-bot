import { Request, Response, NextFunction } from 'express';
import authService from '../../services/auth/auth.service';
import { CustomError } from '../../utils/custom_errors/api.error';



export default {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, email, password, } = req.body;
      const user = await authService.register(username, email, password);
      console.log('RES', user);
      return res.json({
        data: {
          id: user.user.id,
          username: user.user.username,
          email: user.user.email,
          accessToken: user.accessToken,
          createdAt: user.user.createdAt
        },
        status: 201
      });
    } catch (error: unknown) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({ message: error.message });

      }
      const err = error as CustomError;
      next(err.message);
    }
  },

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const response = await authService.login(email, password);
      return res.json({
        data: {
          id: response?.user?.id,
          username: response?.user?.username,
          email: response?.user?.email,
          accessToken: response?.accessToken,
          createdAt: response?.user?.createdAt
        },

        status: 200
      });
    } catch (error: unknown) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({ message: error.message });

      }
      const err = error as CustomError;
      next(err.message);

    }
  },
  async isAuthenticated(res: Response, req: Request, next: NextFunction) {
    if (req.isAuthenticated()) return next();
    res.redirect('/');
  },


  async loginSuccess(req: Request, res: Response) {
    res.json({
      message: 'Login successful',
      user: req.user,
    });
  },

  async logoutUser(req: Request, res: Response) {
    req.logout(() => res.redirect('/'));
  }

};