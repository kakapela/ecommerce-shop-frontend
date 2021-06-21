import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscribtionFormComponent } from './subscribtion-form.component';

describe('SubscribtionFormComponent', () => {
  let component: SubscribtionFormComponent;
  let fixture: ComponentFixture<SubscribtionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscribtionFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscribtionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
