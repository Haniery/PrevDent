import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { PacienteDTO } from "../../models/paciente.dto";
import { API_CONFIG } from "../../config/api.config";
import { StorageService } from "../storage.service";

@Injectable()
export class PacienteService {

    constructor(public http: HttpClient, public storage: StorageService) {
    }

    findByEmail(email : string) : Observable<PacienteDTO> {

        let token = this.storage.getLocalUser().token;
        let authHeader = new HttpHeaders({'Authorization': 'Bearer ' + token});

        return this.http.get<PacienteDTO>(
            `${API_CONFIG.baseUrl}/pacientes/email?value=${email}`,
        {'headers': authHeader});
    }

    getImageFromBucket(id : string) : Observable<any> {
        let url = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`
        return this.http.get(url, {responseType : 'blob'});
    }

    insert(obj : PacienteDTO) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/pacientes`,
            obj,
            {
                observe: 'response',
                responseType: 'text'
            }
        )
    }

}