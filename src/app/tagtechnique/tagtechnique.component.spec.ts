import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagtechniqueComponent } from './tagtechnique.component';

describe('TagtechniqueComponent', () => {
  let component: TagtechniqueComponent;
  let fixture: ComponentFixture<TagtechniqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TagtechniqueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TagtechniqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
