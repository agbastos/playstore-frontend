import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_CONFIG } from "../config/api.config";
import { CredenciaisDTO } from "../models/credenciais.dto";
import { StorageService } from "./storage.service";
import { LocalUser } from "../models/local_user";
import { JwtHelper } from "angular2-jwt";

@Injectable()
export class AuthService {

    jwtHelper: JwtHelper = new JwtHelper();

    constructor (public http: HttpClient, public storage: StorageService) {
    }

    authenticate(credenciais: CredenciaisDTO) {
        return this.http.post(`${API_CONFIG.baseUrl}/login`,
        credenciais,
        {
            observe: 'response',
            responseType: 'text'
        });
    }

    successfulLogin(authorizationValue: string) {
        let tokenSemBear = authorizationValue.substr(7);
        let user: LocalUser = {
            token: tokenSemBear,
            email: this.jwtHelper.decodeToken(tokenSemBear).sub
        };
        this.storage.setLocaluser(user);
    }

    logout() {
        this.storage.setLocaluser(null);
    }

    refreshToken() {
        return this.http.post(`${API_CONFIG.baseUrl}/auth/refreshToken`,
        {},
        {
            observe: 'response',
            responseType: 'text'
        });
    }
}
