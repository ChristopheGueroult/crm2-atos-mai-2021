import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { StateOrder } from 'src/app/core/enums/state-order.enum';
import { Order } from 'src/app/core/models/order';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private collection$ = new BehaviorSubject<Order[]>([]);
  private urlApi = environment.urlApi;
  constructor(private http: HttpClient) {
    this.refreshCollection();
  }

  private refreshCollection() {
    this.http
      .get<Order[]>(`${this.urlApi}/orders`)
      .pipe(
        map((tab) => {
          return tab.map((obj) => {
            return new Order(obj);
          });
        })
      )
      .subscribe((data) => {
        this.collection$.next(data);
      });
  }

  // set collection
  public get collection(): BehaviorSubject<Order[]> {
    return this.collection$;
  }

  public set collection(col: BehaviorSubject<Order[]>) {
    this.collection$ = col;
  }

  // add item in collecion
  public add(item: Order): Observable<Order> {
    return this.http.post<Order>(`${this.urlApi}/orders`, item).pipe(
      tap((flux) => {
        // console.log(flux);
        this.refreshCollection();
      })
    );
  }

  // update item in collection
  public changeState(item: Order, state: StateOrder): Observable<Order> {
    const obj = { ...item }; // spread operator js (es6) : destructuring
    obj.state = state;
    return this.update(obj);
  }

  public update(item: Order): Observable<Order> {
    return this.http.put<Order>(`${this.urlApi}/orders/${item.id}`, item).pipe(
      tap((flux) => {
        // console.log(flux);
        this.refreshCollection();
      })
    );
  }

  // delete item in collection
  public delete(id: number): Observable<Order> {
    return this.http.delete<Order>(`${this.urlApi}/orders/${id}`).pipe(
      tap((flux) => {
        // console.log(flux);
        this.refreshCollection();
      })
    );
  }

  // get item by id
  public getItemById(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.urlApi}/orders/${id}`);
  }
}
