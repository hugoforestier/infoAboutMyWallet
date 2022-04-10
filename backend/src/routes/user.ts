import { Router } from "express";
import {v4 as uuidv4} from 'uuid';
import { RequestError } from "../models/error.model";
import { query, body, validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";
import passport from 'passport';

const router = Router();

/**
 * @swagger
 * /user/register:
 *   post:
 *     summary: Register a new user
 *     responses:
 *       200:
 *         description: Added user successfully
 *       400:
 *         description: Error(s) in body request
 *       409:
 *         description: User already exist.
 *       500:
 *         description: Internal Server Error
 */
router.post(
  "/register",
  body("email").isEmail().trim().escape(),
  body("username").isString().trim().escape(),
  body("password").isString().trim().escape(),
  body("type").isString(),
  body("gender").isString(),
  async (req, res, next) => {
    const u_uuid = uuidv4();
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(StatusCodes.BAD_REQUEST).json({errors: errors.array()});
    }
/*    await UserService.registerUser(
      req.body.email,
      req.body.username,
      req.body.password,
      req.body.type,
      req.body.gender,
      u_uuid
    )
      .then(() => {
        return res.sendStatus(StatusCodes.OK);
      })
      .catch((error: RequestError) => {
        return next(error);
      });*/
});

/**
 * @swagger
 * /user/info/:id:
 *   get:
 *     summary: Get informations about a user
 *     responses:
 *       200:
 *         description: User retrieved.
 *       500:
 *         description: Internal Server Error
 */
router.get(
  '/info',
  query("id").isString(),
  function (req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(StatusCodes.BAD_REQUEST).json({errors: errors.array()});
    }
    if (req.query === undefined) {
        return res.sendStatus(StatusCodes.BAD_REQUEST);
    }
    /*UserService.findUserByUuid(req.query.id)
      .then(user => {
        return res.status(200).json(user);
      })
      .catch((error: Error) => {
        return next(new RequestError(500, error.message));
     });*/
  },
);

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Login a user
 *     responses:
 *       200:
 *         description: User connected.
 *       400:
 *         description: Error(s) in body request
 *       401:
 *         description: Unauthorized
 */
router.post(
  '/login',
  body('email').isEmail().trim().escape(),
  body('password').isString().trim().escape(),
  passport.authenticate('local', {session: false}),
  function (req, res, next) {
    const u_uuid = JSON.parse(JSON.stringify(req.user)).u_uuid;
    //const token = UserService.createAuthToken(u_uuid);
    //return res.status(200).json({jwt: token});
  },
);

/**
 * @swagger
 * /user:
 *   get:
 *     security:
 *      - bearerAuth: []
 *     summary: Get a user and informations
 *     description: Get all informations about user connected.
 *     responses:
 *       200:
 *         description: User retrieved.
 *       500:
 *         description: Internal Server Error
 */
router.get(
  '/',
  passport.authenticate('jwt', {session: false}),
  function (req, res, next) {
    const u_uuid = JSON.parse(JSON.stringify(req.user)).u_uuid;
    /*UserService.findUserByUuid(u_uuid)
      .then(user => {
        return res.status(200).json(user);
      })
      .catch((error: Error) => {
        return next(new RequestError(500, error.message));
      });*/
  },
);

/**
 * @swagger
 * /user/delete:
 *   post:
 *     summary: Delete a user
 *     responses:
 *       200:
 *         description: Deleted user successfully
 *       400:
 *         description: Error(s) in body request
 *       500:
 *         description: Internal Server Error
 */
router.post(
  "/delete",
  body("u_uuid").isString(),
  passport.authenticate('jwt', {session: false}),
  async (req, res, next) => {
    const errors = validationResult(req);
    const type = JSON.parse(JSON.stringify(req.user)).type;

    if (type != "admin")
        return res.sendStatus(StatusCodes.FORBIDDEN);

    if (!errors.isEmpty()) {
      return res.status(StatusCodes.BAD_REQUEST).json({errors: errors.array()});
    }
    /*await UserService.deleteUser(
      req.body.u_uuid,
    )
      .then(() => {
        return res.sendStatus(StatusCodes.OK);
      })
      .catch((error: RequestError) => {
        return next(error);
      });*/
});


export default router;
