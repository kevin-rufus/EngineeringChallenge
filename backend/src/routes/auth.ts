import IRoute from '../types/IRoute';
import {Router} from 'express';
import {compareSync, hashSync} from 'bcrypt';
import {attachSession} from '../middleware/auth';
import {sequelize, Session, User} from '../services/db';
import {randomBytes} from 'crypto';

const AuthRouter: IRoute = {
  route: '/auth',
  router() {
    const router = Router();
    router.use(attachSession);

    // If we're authenticated, return basic user data.
    router.get('/', (req, res) => {
      if (req.session?.token?.id) {
        const {
          token: {token, ...session},
          user: {password, ...user},
        } = req.session;
        return res.json({
          success: true,
          message: 'Authenticated',
          data: {
            session,
            user,
          },
        });
      } else {
        return res.json({
          success: false,
          message: 'Not Authenticated',
        });
      }
    });

    // Attempt to log in
    router.post('/login', async (req, res) => {
      const {
        username,
        password,
      } = req.body;
      console.log("body ", req.body)
      if (!username || !password) {
        return res.status(400).json({
          success: false,
          message: 'Missing username/password.',
        });
      }

      const user = await User.findOne({
        where: sequelize.where(
          sequelize.fn('lower', sequelize.col('username')),
          sequelize.fn('lower', username),
        ),
      }).catch(err => console.error('User lookup failed.', err));

      // Ensure the user exists. If not, return an error.
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Invalid username/password.',
        });
      }

      // Ensure the password is correct. If not, return an error.
      if (!compareSync(password, user.dataValues.password)) {
        return res.status(401).json({
          success: false,
          message: 'Invalid username/password.',
        });
      }

      // We now know the user is valid so it's time to mint a new session token.
      const sessionToken = randomBytes(32).toString('hex');
      let session;
      try {
        // Persist the token to the database.
        session = await Session.create({
          token: sessionToken,
          user: user.dataValues.id,
        });
      } catch (e) {
        return passError('Failed to create session.', e, res);
      }

      if (!session) {
        // Something broke on the database side. Not much we can do.
        return passError('Returned session was nullish.', null, res);
      }

      // We set the cookie on the response so that browser sessions will
      // be able to use it.
      res.cookie('SESSION_TOKEN', sessionToken, {
        expires: new Date(Date.now() + (3600 * 24 * 7 * 1000)), // +7 days
        secure: false,
        httpOnly: true,
      });

      return res.json({
        success: true,
        message: 'Authenticated Successfully.',
        data: {
          token: sessionToken,
        },
      });
    });

    // Attempt to register
    router.post('/register', async (req, res) => {
      const {username, displayName, password} = req.body
      if(!username || !password) {
       return res.status(400).json({
          success: false,
          message: 'Request not valid. Username and Password must be present',
        })
      }
      try {
        const result = await User.findAndCountAll({where: {username: username}})
        if(result.count === 0 ) {
          await User.create({
            username,
            displayName,
            password: hashSync(password, 12)
          })
          return res.json({
            success: true,
            message: 'User created successfully.',
          })
        } else {
          return res.status(400).json({
            success: false,
            message: 'Username already exists.',
          })
        }
      } catch (e) {
        return passError('Failed to create user.', e, res);
      }
    });

    // Log out
    router.post('/logout', (req, res) => {
      if (req.session?.token) {
        Session.destroy({where: {
          id: req.session.token.id
        }})
        .then(() => {
          return res.json({
            success: true,
            message: 'Logout successfully.',
          })
        })
        .catch((e) => {
          return passError('Failed to logout.', e, res);
        })
      }
    });

    return router;
  },
};

export default AuthRouter;

function passError(message, error, response) {
  console.error(message, error);
  return response.status(500).json({
    success: false,
    message: (error?.errors[0]?.message) ||
    error.message || `Internal: ${message}`,
  });
}
