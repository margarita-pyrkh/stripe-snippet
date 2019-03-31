import { Component } from '@angular/core';
import { STRIPE } from '../app.settings';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  openCheckout() {
    const handler = (<any>window).StripeCheckout.configure({
      key: STRIPE.PUBLIC_KEY,
      locale: 'auto',
      token: (token: any) => {
        // You can access the token ID with `token.id`.
        // Get the token ID to your server-side code for use.
      }
    });

    handler.open({
      name: 'Demo name',
      description: 'Demo description',
      amount: 2000
    });
  }
}
