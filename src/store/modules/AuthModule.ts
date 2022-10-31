import ApiService from "@/core/services/ApiService";
import JwtService from "@/core/services/JwtService";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import { Module, Action, Mutation, VuexModule } from "vuex-module-decorators";

export interface User {
  name: string;
  ditta: object;
  image: string;
  api_token: string;
}

export interface UserAuthInfo {
  errors: unknown;
  user: User;
  isAuthenticated: boolean;
  tokenStart: number | null;
  tokenExpirationTime: number | null;
}

@Module
export default class AuthModule extends VuexModule implements UserAuthInfo {
  errors = {};
  user = JSON.parse(localStorage.getItem("user") ?? "{}") as User;
  isAuthenticated = !!JwtService.getToken();
  tokenStart = parseInt(localStorage.getItem("tokenStart") ?? "0");
  tokenExpirationTime = parseInt(
    localStorage.getItem("tokenExpirationTime") ?? "0"
  );

  /**
   * Get authentification errors
   * @returns array
   */
  get getErrors() {
    return this.errors;
  }

  /**
   * Get current user object
   * @returns User
   */
  get currentUser(): User {
    return this.user;
  }

  /**
   * Verify user authentication
   * @returns boolean
   */
  get isUserAuthenticated(): boolean {
    return this.isAuthenticated;
  }

  @Mutation
  [Mutations.SET_ERROR](error) {
    this.errors = { ...error };
  }

  @Mutation
  [Mutations.SET_AUTH](user) {
    this.isAuthenticated = true;
    this.errors = {};
    this.user = {
      name: user.Data[0].userDesc,
      ditta: user.Data[0].ditta,
      image: user.Data[0].img_data,
      api_token: user.Data[0].userDesc
    };
    this.tokenStart = Date.parse(user.Data[0].start_token);
    localStorage.setItem("tokenStart", this.tokenStart.toString());
    this.tokenExpirationTime = user.Data[0].expiresIn * 1000;
    localStorage.setItem(
      "tokenExpirationTime",
      this.tokenExpirationTime.toString()
    );
    localStorage.setItem("user", JSON.stringify(this.user));
    JwtService.saveToken(user.Data[0].token);
  }

  @Mutation
  [Mutations.SET_USER](user) {
    this.user = user;
  }

  /* @Mutation
  [Mutations.SET_PASSWORD](password) {
    this.user.password = password;
  } */

  @Mutation
  [Mutations.PURGE_AUTH]() {
    this.isAuthenticated = false;
    localStorage.removeItem("user");
    localStorage.removeItem("tokenExpirationTime");
    localStorage.removeItem("tokenStart");
    this.user = {} as User;
    this.tokenStart = 0;
    this.tokenExpirationTime = 0;
    this.errors = [];
    JwtService.destroyToken();
  }

  @Action
  [Actions.LOGIN](credentials) {
    return ApiService.post("user/login", credentials)
      .then(({ data }) => {
        this.context.commit(Mutations.SET_AUTH, data);
      })
      .catch(({ response }) => {
        this.context.commit(Mutations.SET_ERROR, response.data.errors);
      });
  }

  @Action
  [Actions.LOGOUT]() {
    this.context.commit(Mutations.PURGE_AUTH);
  }

  @Action
  [Actions.REGISTER](credentials) {
    return ApiService.post("register", credentials)
      .then(({ data }) => {
        this.context.commit(Mutations.SET_AUTH, data);
      })
      .catch(({ response }) => {
        this.context.commit(Mutations.SET_ERROR, response.data.errors);
      });
  }

  @Action
  [Actions.FORGOT_PASSWORD](payload) {
    return ApiService.post("forgot_password", payload)
      .then(() => {
        this.context.commit(Mutations.SET_ERROR, {});
      })
      .catch(({ response }) => {
        this.context.commit(Mutations.SET_ERROR, response.data.errors);
      });
  }

  @Action
  [Actions.VERIFY_AUTH]() {
    if (
      !JwtService.getToken() ||
      this.tokenStart + this.tokenExpirationTime < Date.now()
    ) {
      this.context.commit(Mutations.PURGE_AUTH);
    }
  }

  /*  @Action
  [Actions.VERIFY_AUTH](payload) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.post("verify_token", payload)
        .then(({ data }) => {
          this.context.commit(Mutations.SET_AUTH, data);
        })
        .catch(({ response }) => {
          this.context.commit(Mutations.SET_ERROR, response.data.errors);
          this.context.commit(Mutations.PURGE_AUTH);
        });
    } else {
      this.context.commit(Mutations.PURGE_AUTH);
    }
  } */
}
