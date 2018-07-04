import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { AgendamentoDTO } from "../../models/agendamento.dto";
import { Observable } from "rxjs/Rx";

@Injectable()
export class AgendamentoService {

    constructor(public http: HttpClient) {
    }

    findAll() : Observable<AgendamentoDTO[]> {
        return this.http.get<AgendamentoDTO[]>(`${API_CONFIG.baseUrl}/agendas`);
    }
}
