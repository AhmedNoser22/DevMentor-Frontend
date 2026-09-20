import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { ProfileDto } from '../../dashboard/data-access/dashboard.models';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private readonly http = inject(HttpClient);

  getProfile() {
    return this.http.get<ProfileDto>(`${environment.apiUrl}/profile`);
  }
}