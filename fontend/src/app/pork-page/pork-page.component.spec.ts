import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PorkPageComponent } from './pork-page.component';

describe('PorkPageComponent', () => {
  let component: PorkPageComponent;
  let fixture: ComponentFixture<PorkPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PorkPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PorkPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
