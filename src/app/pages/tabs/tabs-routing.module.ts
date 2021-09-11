import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path:'',
    redirectTo:'/tabs/bluetooth',
    pathMatch: 'full'
  },
  {
    path: '',
    component: TabsPage, 
    children: [
      {
        path: 'bluetooth',
        loadChildren: () => import('../bluetooth/bluetooth.module').then( m => m.BluetoothPageModule )
      },
      {
        path: 'vehiculo',
        loadChildren: () => import('../vehiculo/vehiculo.module').then( m => m.VehiculoPageModule)
      },
      {
        path: 'store',
        loadChildren: () => import('../store/store.module').then( m => m.StorePageModule)
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
