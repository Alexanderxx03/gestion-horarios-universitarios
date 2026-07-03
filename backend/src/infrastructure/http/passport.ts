import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { UsuarioModel } from '../database/mongoose/UserModel';

// Dummy credentials if none provided in .env
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || 'dummy_google_client_id_para_que_compile';
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || 'dummy_google_client_secret_para_que_compile';
const CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL || 'http://localhost:5000/api/auth/google/callback';

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0].value;
        if (!email) {
          return done(new Error('No email found from Google'), false);
        }

        let user = await UsuarioModel.findOne({ correo: email });

        if (!user) {
          // Crear usuario nuevo si no existe
          user = new UsuarioModel({
            correo: email,
            nombreCompleto: profile.displayName || 'Usuario de Google',
            authProvider: 'google',
            rol: 'STUDENT',
            activo: true,
          });
          await user.save();
        }

        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
    },
  ),
);

// Estas funciones son requeridas por Passport incluso si usamos session: false
passport.serializeUser((user: any, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await UsuarioModel.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

export default passport;
