import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularPlaceholder } from './angular-placeholder';

describe('AngularPlaceholder', () => {
  let component: AngularPlaceholder;
  let fixture: ComponentFixture<AngularPlaceholder>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AngularPlaceholder],
    }).compileComponents();

    fixture = TestBed.createComponent(AngularPlaceholder);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
