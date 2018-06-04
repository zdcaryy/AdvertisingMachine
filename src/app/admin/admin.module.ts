import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from "./admin-routing.module";
import { AdminComponent } from './admin.component';
import { AreaComponent } from './area/area.component';
import { EquipComponent } from './equip/equip.component';
import { CopyComponent } from './copy/copy.component';


@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule
  ],
  declarations: [AdminComponent, AreaComponent, EquipComponent, CopyComponent]
})
export class AdminModule { }
