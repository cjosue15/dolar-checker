import { Component, resource, ViewEncapsulation } from '@angular/core';
import { fetchPrice, WEB } from './prices-data';
import { PriceCard } from './components/price-card';

export interface Exchange {
  buy: number;
  sell: number;
  success: boolean;
  error?: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [PriceCard],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  sunat = resource<Exchange, unknown>({
    loader: () => fetchPrice('sunat'),
  });

  kambista = resource<Exchange, unknown>({
    loader: () => fetchPrice('kambista'),
  });

  rextie = resource<Exchange, unknown>({
    loader: () => fetchPrice('rextie'),
  });

  tkambio = resource<Exchange, unknown>({
    loader: () => fetchPrice('tkambio'),
  });

  reload(web: WEB) {
    switch (web) {
      case 'rextie':
        this.rextie.reload();
        break;
      case 'kambista':
        this.kambista.reload();
        break;
      case 'tkambio':
        this.tkambio.reload();
        break;
      default:
        this.sunat.reload();
        break;
    }
  }
}
