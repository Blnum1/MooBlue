import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OderItemsListComponent } from './oder-items-list.component';

describe('OderItemsListComponent', () => {
  let component: OderItemsListComponent;
  let fixture: ComponentFixture<OderItemsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OderItemsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OderItemsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
