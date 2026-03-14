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
    signUp: "/sign-up",
    signIn: "/sign-in",
    verifyEmail: "/verify-email",
    verifyEmailStatus: "/verify-email-status",
    resetPassword: "/reset-password",
    error: "/auth-error",
    profile: "/profile",
    deleteCookies: "/api/auth/delete-cookies",
  },

  org: {
    root: "/org",
    tasks: {
      root: "/org/tasks",
      settings: {
        root: "/org/tasks/settings",
      },
      workspace: {
        withId(id: string, suffix?: TRouteSuffix) {
          return `/org/tasks/workspace/${id}${suffix ? "/" + suffix : ""}`;
        },
      },
    },
    timer: {
      root: "/org/timer",
    },
    counter: {
      root: "/org/counter",
    },
  },

  /**
   * Public routes: do not need authentication.
   */
  get public() {
    return [this.generic.home, this.auth.resetPassword, this.auth.verifyEmail];
  },

  DEFAULT_SIGNIN_REDIRECT: "/",
  DEFAULT_SIGNOUT_REDIRECT: "/",

  test: {
    db: {
      reset: "/api/test/db/reset",
      seed: "/api/test/db/seed",
    },
  },
};

export type TRouteSuffix = "detail" | "update" | "delete" | string;
