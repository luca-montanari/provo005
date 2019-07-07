import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopConfirmCancelUpdateComponent } from './shop-confirm-cancel-update.component';

describe('ShopConfirmCancelUpdateComponent', () => {
  let component: ShopConfirmCancelUpdateComponent;
  let fixture: ComponentFixture<ShopConfirmCancelUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopConfirmCancelUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopConfirmCancelUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
