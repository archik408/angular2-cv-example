import { TestBed, async } from '@angular/core/testing';
import AppComponent from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { WebCamComponent } from 'ng2-webcam';
import { FaceDetectorComponent } from '../../index';

describe('App Component', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        WebCamComponent,
        FaceDetectorComponent
      ],
      imports: [ RouterTestingModule ]
    })
      .compileComponents();
  }));

  it('should create the root component', async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
