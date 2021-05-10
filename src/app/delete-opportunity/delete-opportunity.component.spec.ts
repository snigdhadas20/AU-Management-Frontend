import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteOpportunityComponent } from './delete-opportunity.component';

describe('DeleteOpportunityComponent', () => {
  let component: DeleteOpportunityComponent;
  let fixture: ComponentFixture<DeleteOpportunityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteOpportunityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteOpportunityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
