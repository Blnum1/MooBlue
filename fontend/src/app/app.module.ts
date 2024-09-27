import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient } from '@angular/common/http'; // Import provideHttpClient
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ProductComponent } from './product/product.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { PriceComponent } from './price/price.component';
import { ShipmentComponent } from './shipment/shipment.component';
import { LoginComponent } from './login/login.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from './partials/search/search.component';
import { TagsComponent } from './partials/tags/tags.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { TitleComponent } from './partials/title/title.component';
import { NotFoundComponent } from './partials/not-found/not-found.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from "./partials/header/header.component";
import { CheckoutPageComponent } from './checkout-page/checkout-page.component';
import { OderItemsListComponent } from './partials/oder-items-list/oder-items-list.component';
import { YourInterceptor } from './auth/auth.interceptor';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    AboutUsComponent,
    ProductComponent,
    ContactUsComponent,
    PriceComponent,
    ShipmentComponent,
    LoginComponent,
    RegisterPageComponent,
    SearchComponent,
    TagsComponent,
    CartPageComponent,
    TitleComponent,
    NotFoundComponent,
    CheckoutPageComponent,
    OderItemsListComponent

  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'your-app-id' }), // Add server transition
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
        timeOut: 3000,
        positionClass: 'toast-bottm-right',
        newestOnTop: false
    }),
],
providers: [
  {provide:HTTP_INTERCEPTORS, useClass:YourInterceptor, multi:true},
  provideHttpClient()
],
  bootstrap: [AppComponent]
})
export class AppModule { }