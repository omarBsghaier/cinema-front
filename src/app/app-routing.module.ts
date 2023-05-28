import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CinemaComponent} from "./cinema/cinema.component";
import {PaymentSuccess} from "./paymentsuccess/paymentsuccess.component";
import {PaymentCanceled} from "./paymentcanceled/paymentcanceled.component";
const routes : Routes = [
  { path :"cinema", component : CinemaComponent }, 
  { path :"success", component : PaymentSuccess },
  { path :"canceled", component : PaymentCanceled }

] ;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
