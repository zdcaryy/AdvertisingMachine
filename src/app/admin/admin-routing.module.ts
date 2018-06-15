import { NgModule } from "@angular/core";
import { Routes,RouterModule } from "@angular/router";

import { AdminComponent } from "./admin.component";
import { AreaComponent } from "./area/area.component";
import { EquipComponent } from './equip/equip.component';
import { AdvertisementComponent } from './advertisement/advertisement.component';
import { UserComponent } from './user/user.component';
import { OperationsComponent } from './operations/operations.component';

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
                component:EquipComponent
            },
            {
                path:'area',
                component:AreaComponent
            },
            {
                path:'adver',
                component:AdvertisementComponent
            },
            {
                path:'user',
                component:UserComponent
            },
            {
                path:'ops',
                component:OperationsComponent
            }
        ]
    }
]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})

export class AdminRoutingModule {}
