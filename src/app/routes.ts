export const routes = {
  generic: {
    home: "/",
  },

  /**
   * Auth routes: used for authentication
   * These routes will redirect authenticated users to DEFAULT_LOGIN_REDIRECT
   * or DEFAULT_LOGOUT_REDIRECT
   */
  auth: {
    signUp: "/signUp",
    signIn: "/signIn",
    verifyEmail: "/verify-email",
    resetPassword: "/reset-password",
    authError: "/error",
  },

  /**
   * Public routes: do not need authentication.
   */
  get public() {
    return [
      this.generic.home,
      this.auth.resetPassword,
      this.auth.verifyEmail,
    ];
  },

  DEFAULT_LOGIN_REDIRECT: "/",
  DEFAULT_LOGOUT_REDIRECT: "/",
};

export type TRouteSuffix = "detail" | "update" | "delete" | string;
