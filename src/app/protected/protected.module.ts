import { NgModule } from '@angular/core';

import { ProtectedRoutingModule } from './protected-routing.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { ParametersModule } from './parameters/parameters.module';
import { PlanningModule } from './planning/planning.module';
import { ProfilModule } from './profil/profil.module';
import { WorkdayModule } from './workday/workday.module';
import { SharedModule } from '../shared/shared.module';
import { ProtectedComponent } from './protected.component';


@NgModule({
  declarations: [ProtectedComponent],
  imports: [
    SharedModule,
    ProtectedRoutingModule,
  ]
})
export class ProtectedModule { }
