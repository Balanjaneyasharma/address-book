import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressRowComponent } from './address-row.component';

describe('AddressRowComponent', () => {
  let component: AddressRowComponent;
  let fixture: ComponentFixture<AddressRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddressRowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddressRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
