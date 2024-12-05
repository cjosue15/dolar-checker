import { Component, computed, input, ResourceRef } from '@angular/core';
import { Exchange } from '../app.component';

@Component({
  selector: 'price-card',
  template: `
    <div class="wrapper" [class]="titleClass()">
      <div class="info">
        <h2>
          <a [href]="url()" target="_blank">{{ title() }}</a>
        </h2>
        @if (!exchange().isLoading() && !exchange().error()) {
          <div class="exchange-prices">
            <span>Compra {{ exchange().value()?.buy }}</span>
            <span>Venta {{ exchange().value()?.sell }}</span>
          </div>
        }

        @if (exchange().isLoading()) {
          <p>Estamos obteniendo la información...</p>
        }
      </div>
      <div class="reload">
        <button
          (click)="exchange().reload()"
          [disabled]="exchange().isLoading()"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            [class.loading]="exchange().isLoading()"
            class="loading"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4" />
            <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4" />
          </svg>
        </button>
      </div>
    </div>

    @if (exchange().error()) {
      <small class="error">
        Ocurrio un error al tratar de obtener los datos, intentalo nuevamente
        🙏.
      </small>
    }
  `,
  host: {
    class: 'price-card',
  },
})
export class PriceCard {
  title = input.required<string>();

  url = input.required<string>();

  titleClass = computed(() => this.title().toLocaleLowerCase());

  exchange = input.required<ResourceRef<Exchange>>();
}
