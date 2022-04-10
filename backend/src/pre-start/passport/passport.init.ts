import KEYS from "../../config/keys";
import {RequestError} from '../../models/error.model';
import {User} from '../../models/user.model';
//import UserService from '../../services/user.service';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import passportJWT from 'passport-jwt';
import LocalStrategy from 'passport-local';

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

export default function passportInit(app: any): void {
  app.use(cookieParser());

  passport.use(
    new LocalStrategy.Strategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        session: false,
     },
      (email, password, done) => {
/*        UserService.findUserByEmail(email).then(user => {
          if (!user) {
            console.log("user pas lo");
            return done(null, false);
          }

          if (!user.password) {
            console.log("pass pas lo");
            return done(null, false);
          }

          const isValid = UserService.validatePassword(
            user.password,
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            user.salt!,
            password,
          );

          if (isValid) {
            return done(null, user);
          }
          console.log("user autho");
          return done(null, false);
        });*/
      },
    ),
  );

  passport.use(
  new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromExtractors([
          ExtractJWT.fromAuthHeaderAsBearerToken(),
          ExtractJWT.fromUrlQueryParameter('bearer'),
        ]),
        secretOrKey: KEYS.JWT_TOKEN_SECRET,
      },
      function (jwtPayload, cb) {
        /*return UserService.findUserByUuid(jwtPayload.uuid)
          .then((user: User | null) => {
            return cb(null, user);
          })
          .catch(err => {
            return cb(err);
          });*/
      },
    ),
  );

  app.use(passport.initialize());
  app.use(passport.session());
}
