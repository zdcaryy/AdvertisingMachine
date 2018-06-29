import { NgModule } from "@angular/core";
import { Routes,RouterModule } from "@angular/router";
import { AuthGuard } from "../login/auth.guard";

import { AdminComponent } from "./admin.component";
import { AreaComponent } from "./area/area.component";
import { EquipComponent } from './equip/equip.component';
import { AdvertisementComponent } from './advertisement/advertisement.component';
import { UserComponent } from './user/user.component';
import { OperationsComponent } from './operations/operations.component';
import{PropertyComponent} from './property/property.component';

const routes:Routes=[
    {
        path:'',
        component:AdminComponent,
        children:[
            {
                path:'',
                redirectTo:'equip',
                pathMatch:'full'
            },
            {
                path:'equip',
                component:EquipComponent,
                
            },
            {
                path:'area',
                component:AreaComponent,
                canActivate: [AuthGuard]
            },
            {
                path:'adver',
                component:AdvertisementComponent,
                canActivate: [AuthGuard]
            },
            {
                path:'user',
                component:UserComponent,
            },
            {
                path:'ops',
                component:OperationsComponent,
                canActivate: [AuthGuard]
            },
            {
              path:'property',
              component:PropertyComponent
            }
        ]
    }
]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})

export class AdminRoutingModule {}
