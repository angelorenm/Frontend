import{ Routes, RouterModule } from "@angular/router";
import{ ModuleWithProviders } from "@angular/core";
import { RegistroComponent } from './components/registro/registro.component';
import { LoginComponent } from './components/login/login.component';
import { MessengerComponent } from './components/messenger/messenger.component';


const appRouter: Routes = [
    {path: 'registro',component:RegistroComponent},
    {path: '', component:LoginComponent},
    {path: 'messenger', component: MessengerComponent} 
]

export const appRoutingProviders : any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRouter);
