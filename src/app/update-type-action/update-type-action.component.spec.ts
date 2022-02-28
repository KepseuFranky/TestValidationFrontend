import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTypeActionComponent } from './update-type-action.component';

describe('UpdateTypeActionComponent', () => {
  let component: UpdateTypeActionComponent;
  let fixture: ComponentFixture<UpdateTypeActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateTypeActionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTypeActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
