import { Directive, HostBinding, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[appState]',
})
export class StateDirective implements OnChanges {
  @Input() appState!: string;
  @HostBinding('class') tdClassName!: string;
  constructor() {}
  ngOnChanges(): void {
    this.tdClassName = `state-${this.appState.toLowerCase()}`;
  }
}

// récupérer un state
// si state vaut CANCELED => générer le string state-canceled
// si state vaut OPTION => générer le string state-option
// si state vaut CONFIRMED => générer le string state-confirmed
// si ....
// Binder le string state-canceled, ..... avec la propriété class du Host Element TD dans le composant parent
