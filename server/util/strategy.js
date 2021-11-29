/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable func-names */
/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable operator-linebreak */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable consistent-return */
import util from "util";
import { OAuth2Strategy, InternalOAuthError } from "passport-oauth";

/**
 * `Strategy` constructor.
 *
 * The Google authentication strategy authenticates requests by delegating to
 * Google using the OAuth 2.0 protocol.
 *
 * Applications must supply a `verify` callback which accepts an `idToken`,
 * `refreshToken` and service-specific `profile`, and then calls the `done`
 * callback supplying a `user`, which should be set to `false` if the
 * credentials are not valid.  If an exception occured, `err` should be set.
 *
 * Options:
 *   - `clientID`      your Google application's client id
 *   - `clientSecret`  your Google application's client secret
 *   - `callbackURL`   URL to which Google will redirect the user after granting authorization
 *
 * Examples:
 *
 *     passport.use(new GoogleStrategy({
 *         clientID: '123-456-789',
 *         clientSecret: 'shhh-its-a-secret'
 *         callbackURL: 'https://www.example.net/auth/google/callback'
 *       },
 *       function(idToken, refreshToken, profile, done) {
 *         User.findOrCreate(..., function (err, user) {
 *           done(err, user);
 *         });
 *       }
 *     ));
 *
 * @param {Object} options
 * @param {Function} verify
 * @api public
 */
function GoogleTokenStrategy(options, verify) {
  options = options || {};
  options.authorizationURL =
    options.authorizationURL || "https://accounts.google.com/o/oauth2/auth";
  options.tokenURL =
    options.tokenURL || "https://accounts.google.com/o/oauth2/token";

  OAuth2Strategy.call(this, options, verify);
  this.name = "google-token";
}

/**
 * Inherit from `OAuth2Strategy`.
 */
util.inherits(GoogleTokenStrategy, OAuth2Strategy);

/**
 * Authenticate request by delegating to a service provider using OAuth 2.0.
 *
 * @param {Object} req
 * @api protected
 */
GoogleTokenStrategy.prototype.authenticate = function (req, options) {
  options = options || {};
  const self = this;

  if (
    (req.query && req.query.error) ||
    (!req.headers.authorization && !req.body.id_token)
  ) {
    // TODO: Error information pertaining to OAuth 2.0 flows is encoded in the
    //       query parameters, and should be propagated to the application.
    return this.fail();
  }

  // const idToken = req.body
  //   ? req.body.id_token || req.query.id_token || req.headers.id_token
  //   : req.headers.id_token || req.query.id_token;
  const idToken =
    req?.body?.id_token || req.headers?.authorization.split(" ")[1];
  const refreshToken = req.body
    ? req.body.refresh_token ||
      req.query.refresh_token ||
      req.headers.refresh_token
    : req.headers.refresh_token || req.query.refresh_token;

  self._loadUserProfile(idToken, (err, profile) => {
    if (err) {
      return self.fail(err);
    }

    function verified(e, user, info) {
      if (e) {
        return self.error(e);
      }
      if (!user) {
        return self.fail(info);
      }
      self.success(user, info);
    }

    if (self._passReqToCallback) {
      self._verify(req, idToken, refreshToken, profile, verified);
    } else {
      self._verify(idToken, refreshToken, profile, verified);
    }
  });
};

/**
 * Retrieve user profile from Google.
 *
 * This function constructs a normalized profile, with the following properties:
 *
 *   - `provider`         always set to `google`
 *   - `id`
 *   - `username`
 *   - `displayName`
 *
 * @param {String} idToken
 * @param {Function} done
 * @api protected
 */
GoogleTokenStrategy.prototype.userProfile = function (idToken, done) {
  const profileUrl = `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${idToken}`;
  this._oauth2.get(profileUrl, null, (err, body, res) => {
    if (err) {
      return done(new InternalOAuthError("failed to fetch user profile", err));
    }

    try {
      const json = JSON.parse(body);

      const profile = { provider: "google" };
      profile.id = json.id || json.sub;
      profile.displayName = json.name;
      profile.name = {
        familyName: json.family_name,
        givenName: json.given_name,
      };
      profile.emails = [{ value: json.email }];

      profile._raw = body;
      profile._json = json;

      done(null, profile);
    } catch (e) {
      done(e);
    }
  });
};

/**
 * Load user profile, contingent upon options.
 *
 * @param {String} idToken
 * @param {Function} done
 * @api private
 */
GoogleTokenStrategy.prototype._loadUserProfile = function (idToken, done) {
  const self = this;

  function loadIt() {
    return self.userProfile(idToken, done);
  }
  function skipIt() {
    return done(null);
  }

  if (
    typeof this._skipUserProfile === "function" &&
    this._skipUserProfile.length > 1
  ) {
    // async
    this._skipUserProfile(idToken, (err, skip) => {
      if (err) {
        return done(err);
      }
      if (!skip) {
        return loadIt();
      }
      return skipIt();
    });
  } else {
    const skip =
      typeof this._skipUserProfile === "function"
        ? this._skipUserProfile()
        : this._skipUserProfile;
    if (!skip) {
      return loadIt();
    }
    return skipIt();
  }
};

/**
 * Expose `GoogleTokenStrategy`.
 */
export default GoogleTokenStrategy;
