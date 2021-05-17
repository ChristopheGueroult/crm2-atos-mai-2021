import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StateClient } from 'src/app/core/enums/state-client.enum';
import { Client } from 'src/app/core/models/client';
import { ClientsService } from '../../services/clients.service';

@Component({
  selector: 'app-page-list-clients',
  templateUrl: './page-list-clients.component.html',
  styleUrls: ['./page-list-clients.component.scss'],
})
export class PageListClientsComponent implements OnInit {
  public states = Object.values(StateClient);
  public collection$!: Observable<Client[]>;
  public title = 'List Clients';
  public headers = ['Name', 'Total HT', 'Tva', 'Total TTC', 'State'];
  constructor(private ordersService: ClientsService) {
    this.collection$ = this.ordersService.collection;
  }

  ngOnInit(): void {}

  public changeState(e: any, item: Client): void {
    const state = e.target.value;
    this.ordersService.changeState(item, state).subscribe((res) => {
      // codes erreur de l'api
      Object.assign(item, res);
    });
  }
}
