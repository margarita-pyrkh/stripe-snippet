import { Component } from '@angular/core';
import { STRIPE } from '../app.settings';
import { FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {

  readonly amountControl = new FormControl('', [
    Validators.required,
  ]);

  private readonly stripePublishableKey = STRIPE.PUBLIC_KEY;

  private readonly checkoutHandler = (window as any).StripeCheckout.configure({
    key: this.stripePublishableKey,
    locale: 'auto',
    token: (token: any) => {
      this.sendToken(token);
    }
  });

  constructor(
    private http: HttpClient,
  ) {
  }

  openCheckout() {
    this.checkoutHandler.open({
      name: 'Demo name',
      description: 'Demo description',
      image: '../assets/owl.jpg',
      amount: this.getFormattedCurrency(),
    });
  }

  private sendToken(token: string): void {
    console.log(token);
    const charge = { amount: this.getFormattedCurrency(), token };

    this.http.post('http://localhost:3020/charge', charge)
      .subscribe(data => {
        console.log(data);
      });
  }

  private getFormattedCurrency(): number {
    return this.amountControl.value * 100;
  }
}
