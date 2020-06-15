import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsService } from '../services/settings/settings.service';
import { SharedService } from '../services/shared/shared.service';
import { SidebarService } from '../services/shared/sidebar.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers:[
    SettingsService,
    SharedService,
    SidebarService
  ]
})
export class ServiceModule { }
