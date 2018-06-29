import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElModule } from 'element-angular';

import { AdminRoutingModule } from "./admin-routing.module";
import { AdminComponent } from './admin.component';
import { AreaComponent } from './area/area.component';
import { EquipComponent } from './equip/equip.component';
import { AdvertisementComponent } from './advertisement/advertisement.component';
import { OperationsComponent } from './operations/operations.component';

import { TableComponent } from './shared/table/table.component';

import { AreaService } from "./server/area.service";
import { FormsModule } from '@angular/forms';
import { EquipService } from './server/equip.service';
import { UserComponent } from './user/user.component';
import { UserService } from './server/user.service';
import { PropertyComponent } from './property/property.component';
import {PropertyService} from './server/property.service';


@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ElModule.forRoot()
  ],
  declarations: [AdminComponent, AreaComponent, EquipComponent, TableComponent, AdvertisementComponent, OperationsComponent, UserComponent, PropertyComponent],
  providers: [
    AreaService,
    EquipService,
    UserService,
    PropertyService
  ]
})
export class AdminModule { }
