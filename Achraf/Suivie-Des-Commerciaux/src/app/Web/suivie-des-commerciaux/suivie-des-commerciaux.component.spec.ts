import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuivieDesCommerciauxComponent } from './suivie-des-commerciaux.component';

describe('SuiviDesCommerciauxComponent', () => {
  let component: SuivieDesCommerciauxComponent;
  let fixture: ComponentFixture<SuivieDesCommerciauxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuivieDesCommerciauxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuivieDesCommerciauxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
