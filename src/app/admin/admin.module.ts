import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from "./admin-routing.module";
import { AdminComponent } from './admin.component';
import { AreaComponent } from './area/area.component';
import { EquipComponent } from './equip/equip.component';
import { AdvertisementComponent } from './advertisement/advertisement.component';
import { CopyComponent } from './copy/copy.component';
import { OperationsComponent } from './operations/operations.component';

import { TableComponent } from './shared/table/table.component';

import { AreaService } from "./server/area.service";
import{FormsModule} from '@angular/forms';
import { EquipService } from './server/equip.service';
import { CopyService } from './server/copy.service';


@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule
  ],
  declarations: [AdminComponent, AreaComponent, EquipComponent, TableComponent, AdvertisementComponent, CopyComponent,OperationsComponent],
  providers: [
    AreaService,
    EquipService,
    CopyService
  ]
})
export class AdminModule { }
