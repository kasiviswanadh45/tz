import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectionService {
  private stateIdSource = new BehaviorSubject<number | null>(null);
  private districtIdSource = new BehaviorSubject<number | null>(null);
  private areaIdSource = new BehaviorSubject<number | null>(null);

  stateId$ = this.stateIdSource.asObservable();
  districtId$ = this.districtIdSource.asObservable();
  areaId$ = this.areaIdSource.asObservable();

  setStateId(id: number) {
    this.stateIdSource.next(id);
  }

  setDistrictId(id: number) {
    this.districtIdSource.next(id);
  }

  setAreaId(id: number) {
    this.areaIdSource.next(id);
  }
}
