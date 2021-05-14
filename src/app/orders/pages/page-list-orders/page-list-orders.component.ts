import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Order } from 'src/app/core/models/order';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-page-list-orders',
  templateUrl: './page-list-orders.component.html',
  styleUrls: ['./page-list-orders.component.scss'],
})
export class PageListOrdersComponent implements OnInit {
  private test = new Observable((sub) => {
    sub.next('un joli string a get dans un subscribe');
  });
  private sub!: Subscription;
  // public collection!: Order[];
  public collection$!: Observable<Order[]>;
  public title = 'List Orders';
  public headers = [
    'Type',
    'Client',
    'NbJours',
    'Tjm HT',
    'Total HT',
    'Total TTC',
    'State',
  ];
  constructor(private ordersService: OrdersService) {
    this.collection$ = this.ordersService.collection;
    // this.ordersService.collection.subscribe((data) => {
    //   // console.log(data);
    //   this.collection = data;
    // });
  }

  ngOnInit(): void {
    this.sub = this.test.subscribe((data) => {
      console.log(data);
    });
  }

  public changeTitle(): void {
    this.title = 'New list orders';
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
