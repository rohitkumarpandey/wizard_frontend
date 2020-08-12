import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { FeedComponent } from './feed/feed.component';



const routes: Routes = [
   {path : ``, component :LoginRegisterComponent },
   {path : 'home', component : HomeComponent, children:[
    {path :'', redirectTo : 'feed', pathMatch : 'full'},
    {path : 'feed', component : FeedComponent},
    {path : 'profile', component : ProfileComponent}    
  ]
  }
//   {path : 'login', component : LoginComponent},
//   {path : 'register', component : RegisterComponent},
//   {path : 'home', component : HomeComponent,
// children:[
//   {path :'', redirectTo : 'goals', pathMatch : 'full'},
//   {path : 'goals', component : GoalsComponent},
//   {path : 'credentials', component : CredentialsComponent},
//   {path : 'notes', component : NotesComponent}    
// ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
