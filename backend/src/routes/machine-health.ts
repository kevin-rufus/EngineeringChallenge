import IRoute from '../types/IRoute';
import {Router} from 'express';
import {compareSync, hashSync} from 'bcrypt';
import {attachSession} from '../middleware/auth';
import {getMachineHealth} from '../utils/machineHealth';

const MachineHealthRouter: IRoute = {
  route: '/machine-health',
  router() {
    const router = Router();
    router.use(attachSession);

    // If we're authenticated, return basic user data.
    router.post('/', (req, res) => {
      if (req.session?.token?.id) {
        console.log("I am called ", req.session?.user)
        const result = getMachineHealth(req);
        console.log("result ", result)
        if (result.error) {
          res.status(400).json(result);
        } else {
          res.json(result);
        }
      } else {
        return res.json({
          success: false,
          message: 'Not Authenticated',
        });
      }
    });
    return router;
  }
};

export default MachineHealthRouter;