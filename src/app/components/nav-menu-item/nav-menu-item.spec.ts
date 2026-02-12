import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavMenuItem } from './nav-menu-item';

describe('NavMenuItem', () => {
  let component: NavMenuItem;
  let fixture: ComponentFixture<NavMenuItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavMenuItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavMenuItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
