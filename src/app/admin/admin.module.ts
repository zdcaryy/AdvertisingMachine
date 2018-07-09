import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElModule } from 'element-angular';

import { AdminRoutingModule } from "./admin-routing.module";
import { AdminComponent } from './admin.component';
import { AreaComponent } from './area/area.component';
import { EquipComponent } from './equip/equip.component';
import { AdvertisementComponent } from './advertisement/advertisement.component';


import { TableComponent } from './shared/table/table.component';

import { AreaService } from "./server/area.service";
import { FormsModule } from '@angular/forms';
import { EquipService } from './server/equip.service';
import { UserComponent } from './user/user.component';
import { UserService } from './server/user.service';
import { AdverService } from './server/adver.service';
import { VillageComponent } from './village/village.component';
import { SelectVillageComponent } from './shared/select-village/select-village.component';
import { PropertyComponent} from './property/property.component';
import { PropertyService} from './server/property.service';
import { PersonComponent } from './person/person.component';
import { AdmachineService } from './server/admachine.service';


@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ElModule.forRoot(),
  ],
  declarations: [AdminComponent, AreaComponent, EquipComponent, TableComponent, AdvertisementComponent,UserComponent, VillageComponent, SelectVillageComponent,PropertyComponent, PersonComponent],
  providers: [
    AreaService,
    EquipService,
    UserService,
    AdverService,
    PropertyService,
    AdmachineService
  ]
})
export class AdminModule { }
