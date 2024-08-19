import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SmtpConfigurationFormComponent } from './smtp-configuration-form.component';

describe('SmtpConfigurationFormComponent', () => {
  let component: SmtpConfigurationFormComponent;
  let fixture: ComponentFixture<SmtpConfigurationFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SmtpConfigurationFormComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SmtpConfigurationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
