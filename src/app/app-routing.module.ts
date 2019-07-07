import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShopGridComponent } from './shop/shop-grid/shop-grid.component';
import { CanDeactivateGuardShop } from './shop/shop-grid/shop-grid-can-deactivate.guard';
import { HomePageComponent } from './home/home-page/home-page.component';

const routes: Routes = [
    {
        path: 'home',
        component: HomePageComponent
    },
    {
        path: 'shop',
        component: ShopGridComponent,
        canDeactivate: [CanDeactivateGuardShop]
    },
    {
        path: '**',
        redirectTo: 'home'
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
