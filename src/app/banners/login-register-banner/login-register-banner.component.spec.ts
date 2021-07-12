import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginRegisterBannerComponent } from './login-register-banner.component';

describe('LoginRegisterBannerComponent', () => {
  let component: LoginRegisterBannerComponent;
  let fixture: ComponentFixture<LoginRegisterBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginRegisterBannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginRegisterBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
