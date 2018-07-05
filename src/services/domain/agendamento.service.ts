import { Injectable } from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { AgendamentoDTO } from "../../models/agendamento.dto";
import { Observable } from "rxjs/Rx";
import {StorageService} from "../storage.service";

@Injectable()
export class AgendamentoService {

    constructor(public http: HttpClient, public storage: StorageService) {
    }

    findByEmail(email : string) : Observable<AgendamentoDTO[]> {

        let token = this.storage.getLocalUser().token;
        let authHeader = new HttpHeaders({'Authorization': 'Bearer ' + token});

        return this.http.get<AgendamentoDTO[]>(
            `${API_CONFIG.baseUrl}/agendas/email?value=${email}`,
            {'headers': authHeader});
    }

    findAll() : Observable<AgendamentoDTO[]> {
        return this.http.get<AgendamentoDTO[]>(`${API_CONFIG.baseUrl}/agendas`);
    }
}
