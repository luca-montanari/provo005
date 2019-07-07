import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShopGridComponent } from './shop/shop-grid/shop-grid.component';
import { MaterialModule } from './material.module';
import { environment } from 'src/environments/environment';
import { ShopUpdateDialogComponent } from './shop/shop-update-dialog/shop-update-dialog.component';
import { ShopConfirmCancelUpdateComponent } from './shop/shop-confirm-cancel-update/shop-confirm-cancel-update.component';
import { HomeMainMenuComponent } from './home/home-main-menu/home-main-menu.component';
import { HomePageComponent } from './home/home-page/home-page.component';

@NgModule({
    declarations: [
        AppComponent,
        HomePageComponent,
        HomeMainMenuComponent,
        ShopGridComponent,
        ShopUpdateDialogComponent,
        ShopConfirmCancelUpdateComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MaterialModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        ReactiveFormsModule
    ],
    entryComponents: [
        ShopUpdateDialogComponent,
        ShopConfirmCancelUpdateComponent
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
