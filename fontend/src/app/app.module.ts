import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ProductComponent } from './product/product.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { PriceComponent } from './price/price.component';
import { ShipmentComponent } from './shipment/shipment.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from './partials/search/search.component';
import { TagsComponent } from './partials/tags/tags.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { TitleComponent } from './partials/title/title.component';
import { NotFoundComponent } from './partials/not-found/not-found.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutUsComponent,
    ProductComponent,
    ContactUsComponent,
    PriceComponent,
    ShipmentComponent,
    RegisterComponent,
    LoginComponent,
    SearchComponent,
    TagsComponent,
    CartPageComponent,
    TitleComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
