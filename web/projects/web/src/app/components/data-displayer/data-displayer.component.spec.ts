import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataDisplayerComponent } from './data-displayer.component';

describe('DataDisplayerComponent', () => {
  let component: DataDisplayerComponent;
  let fixture: ComponentFixture<DataDisplayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataDisplayerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DataDisplayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
