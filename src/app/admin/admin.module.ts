import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElModule } from 'element-angular';
import { FormsModule } from '@angular/forms';

import { AdminRoutingModule } from "./admin-routing.module";
import { AdminComponent } from './admin.component';
import { AreaComponent } from './area/area.component';
import { EquipComponent } from './equip/equip.component';
import { AdvertisementComponent } from './advertisement/advertisement.component';


import { TableComponent } from './shared/table/table.component';

import { AdminService } from "./server/admin.service";
import { AreaService } from "./server/area.service";
import { UserComponent } from './user/user.component';
import { AdverService } from './server/adver.service';
import { VillageComponent } from './village/village.component';
import { SelectVillageComponent } from './shared/select-village/select-village.component';
import { PropertyComponent} from './property/property.component';
import { PersonComponent } from './person/person.component';
import { AdmachineService } from './server/admachine.service';
import { AreaselectComponent } from './shared/areaselect/areaselect.component';
import { AccountComponent } from './account/account.component';

import { UserLevelPipe } from './pipe/user-level.pipe';


@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ElModule.forRoot(),
  ],
  declarations: [
    AdminComponent, 
    AreaComponent, 
    EquipComponent, 
    TableComponent, 
    AdvertisementComponent,
    UserComponent, 
    VillageComponent, 
    SelectVillageComponent,
    PropertyComponent, 
    PersonComponent, 
    AreaselectComponent,
    AccountComponent,
    UserLevelPipe
  ],
  providers: [
    AdminService,
    AreaService,
    AdverService,
    AdmachineService
  ]
})
export class AdminModule { }
