import { BrowserModule } from '@angular/platform-browser';
import { NgModule , CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormGroup, FormsModule } from '@angular/forms';

import {  HttpClientModule } from '@angular/common/http';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTooltipModule} from '@angular/material/tooltip';
import {      
  MatButtonModule,      
  MatMenuModule,      
  MatToolbarModule,      
  MatIconModule,      
  MatCardModule,      
  MatFormFieldModule,      
  MatInputModule,      
  MatDatepickerModule,      
  MatDatepicker,      
  MatNativeDateModule,      
  MatRadioModule,      
  MatSelectModule,      
  MatOptionModule,      
  MatSlideToggleModule,ErrorStateMatcher,ShowOnDirtyErrorStateMatcher  
} from '@angular/material'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { HomeComponent } from './home/home.component';
import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";
import { ProfileComponent } from './profile/profile.component';
import { FeedComponent } from './feed/feed.component';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

import {NgxImageCompressService} from 'ngx-image-compress';


@NgModule({
  declarations: [
    AppComponent,
    LoginRegisterComponent,
    HomeComponent,
    ProfileComponent,
    FeedComponent,
    AdminDashboardComponent
  ],
 
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatButtonModule,      
    MatMenuModule,      
    MatToolbarModule,
    MatBottomSheetModule,      
    MatIconModule,  
    MatProgressSpinnerModule,    
    MatCardModule,      
    BrowserAnimationsModule,      
    MatFormFieldModule,      
    MatInputModule,      
    MatDatepickerModule,      
    MatNativeDateModule,      
    MatRadioModule,      
    MatSelectModule,      
    MatOptionModule,      
    MatSlideToggleModule,
    MatSliderModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatProgressBarModule,
    NgxSpinnerModule,
    InfiniteScrollModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [ {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}, NgxSpinnerService, NgxImageCompressService],
  bootstrap: [AppComponent]
})
export class AppModule { }
