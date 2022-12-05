import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickedColorComponent } from './picked-color.component';

describe('PickedColorComponent', () => {
  let component: PickedColorComponent;
  let fixture: ComponentFixture<PickedColorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PickedColorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PickedColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
