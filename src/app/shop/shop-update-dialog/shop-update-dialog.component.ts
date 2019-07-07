import { Component, OnInit, Inject, Renderer2, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';

import { Shop } from '../shop';
import { isEqual } from 'src/app/shared/objects-utils';
import { ShopConfirmCancelUpdateComponent } from '../shop-confirm-cancel-update/shop-confirm-cancel-update.component';

@Component({
    selector: 'app-shop-update-dialog',
    templateUrl: './shop-update-dialog.component.html',
    styleUrls: ['./shop-update-dialog.component.scss']
})
export class ShopUpdateDialogComponent implements OnInit, OnDestroy {

    formGroup: FormGroup;
    shop: Shop;
    listenerEscape: () => void;
    listenerWindowBeforeUnload: () => void;
    listenerBackdropClick: Subscription;

    constructor(private formBuilder: FormBuilder,
                private dialogRef: MatDialogRef<ShopUpdateDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: Shop,
                private renderer2: Renderer2,
                private dialog: MatDialog) {
        this.startListener();
        this.shop = this.data;
        this.formGroup = this.formBuilder.group({
            name: [this.shop.name, Validators.required],
            description: [this.shop.description, Validators.required]
        });
    }

    ngOnInit() {}

    ngOnDestroy() {
        this.releaseListener();
    }

    startListener() {
        this.listenerWindowBeforeUnload = this.renderer2.listen(window, 'beforeunload', (event: any) => {
            console.log('ShopUpdateDialogComponent', event);
            // event.preventDefault();
            // event.returnValue = '';
        });
        this.listenerEscape = this.renderer2.listen(document, 'keydown', (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                this.closeDialog();
            }
        });
        this.listenerBackdropClick = this.dialogRef.backdropClick().subscribe((mouseEvent: MouseEvent) => {
            this.closeDialog();
        });
    }

    releaseListener() {
        this.listenerEscape();
        this.listenerBackdropClick.unsubscribe();
    }

    cancel() {
        this.closeDialog();
    }

    canUpdate(): boolean {
        return this.formGroup.valid && this.formGroup.dirty && !isEqual(this.shop, this.formGroup.value);
    }

    closeDialog(): void {
        if (!this.canUpdate()) {
            console.log('closeDialog !this.canUpdate()');
            this.dialogRef.close();
        } else {
            console.log('closeDialog this.canUpdate()');
            this.releaseListener();
            const matDialogConfig: MatDialogConfig = {
                disableClose: true,
                width: '220px',
                hasBackdrop: false,
                data: null
            };
            const dialogRefConfirmClose = this.dialog.open(ShopConfirmCancelUpdateComponent, matDialogConfig);
            dialogRefConfirmClose.afterClosed().subscribe(result => {
                if (result) {
                    this.dialogRef.close();
                } else {
                    this.startListener();
                }
            });
        }
    }

}
