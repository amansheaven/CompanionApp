import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BeaconsPage } from './beacons.page';

describe('BeaconsPage', () => {
  let component: BeaconsPage;
  let fixture: ComponentFixture<BeaconsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeaconsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BeaconsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
