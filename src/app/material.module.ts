import { NgModule } from '@angular/core';
import {
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatFormFieldModule,
  MatInputModule,
  MatCheckboxModule,
  MatTooltipModule,
  MatButtonModule,
  MatIconModule,
  MatDialogModule,
  MatBottomSheetModule,
  MatListModule,
  MatSidenavModule,
  MatToolbarModule
} from '@angular/material';

@NgModule({
    imports: [
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        MatTooltipModule,
        MatButtonModule,
        MatIconModule,
        MatDialogModule,
        MatBottomSheetModule,
        MatListModule,
        MatSidenavModule,
        MatToolbarModule
    ],
    exports: [
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        MatTooltipModule,
        MatButtonModule,
        MatIconModule,
        MatDialogModule,
        MatBottomSheetModule,
        MatListModule,
        MatSidenavModule,
        MatToolbarModule
    ]
})
export class MaterialModule {}
