import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PlansComponent } from './plans/plans.component';
import { HeaderComponent } from './header/header.component';

import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';

import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';

import { AuthModule } from './auth/auth.module';
import { CreateNewProjectModule } from './createnew/createnew.module';
import { FabricModule } from './fabrics/fabrics.module';

import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptorService } from './auth/auth.interceptor.service';
import { sharedModule } from './shared/shared.module';


@NgModule({
  declarations: [
    AppComponent,    
    HeaderComponent,
    PlansComponent,
  ],
  
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    sharedModule,
    AuthModule,
    CreateNewProjectModule,
    FabricModule,
    MdbCollapseModule,
  ],
  providers: [AuthGuard, 
              {provide: HTTP_INTERCEPTORS, useClass:AuthInterceptorService, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
