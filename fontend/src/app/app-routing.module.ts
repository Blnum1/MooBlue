import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ProductComponent } from './product/product.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { PriceComponent } from './price/price.component';
import { ShipmentComponent } from './shipment/shipment.component';
import { LoginComponent } from './login/login.component';
import { PorkPageComponent } from './pork-page/pork-page.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { CheckoutPageComponent } from './checkout-page/checkout-page.component';
import { PaymentPageComponent } from './payment-page/payment-page.component';
import { PaypalButtonComponent } from './partial/paypal-button/paypal-button.component';
import { OrderTrackPageComponent } from './order-track-page/order-track-page.component';
import { ProductManagementComponent } from './admin/product-management/product-management.component';
import { UserManagementComponent } from './admin/user-management/user-management.component';
import { OrderManagementComponent } from './admin/order-management/order-management.component';
import { RevenueComponent } from './admin/revenue/revenue.component';
import { DashboardPageComponent } from './admin/dashboard-page/dashboard-page.component';
import { ProfileComponent } from './profile/profile.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'search/:searchTerm', component: ProductComponent },
  { path: 'tag/:tag', component: ProductComponent },
  { path: 'pork/:id', component: PorkPageComponent },
  { path: 'cart-page', component: CartPageComponent},
  { path: 'home', component: HomeComponent },
  { path: 'product', component: ProductComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'price', component: PriceComponent },
  { path: 'shipment', component: ShipmentComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterPageComponent},
  { path: 'checkout', component: CheckoutPageComponent},
  { path: 'payment', component: PaymentPageComponent},
  { path: 'paypal', component: PaypalButtonComponent},
  { path: 'track/:orderId', component: OrderTrackPageComponent},
  { path: 'admin/products', component: ProductManagementComponent },
  { path: 'admin/users', component: UserManagementComponent },
  { path: 'admin/orders', component: OrderManagementComponent },
  { path: 'admin/revenue', component: RevenueComponent },
  { path: 'admin/dashboard', component: DashboardPageComponent},
  { path: 'profile', component: ProfileComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
