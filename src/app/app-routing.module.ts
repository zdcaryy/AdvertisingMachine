import { NgModule } from "@angular/core";
import { Routes,RouterModule } from "@angular/router";

import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from './register/register.component';

const routes:Routes=[
    {
        path:'',
        redirectTo:'admin',
        pathMatch:'full'
    },
    {
        path:'admin',
        loadChildren: './admin/admin.module#AdminModule'
    },
    {
        path:'login',
        component:LoginComponent
    },
    {
        path:'register',
        component:RegisterComponent
    }
]

@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})

export class AppRoutingModule {}