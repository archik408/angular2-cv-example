import { Component } from '@angular/core';
import WebCameraProvider from './webcamera.provider';

@Component({
  selector: 'ng2-face-detector',
  templateUrl: 'face.detection.component.html'
})

class FaceDetectorComponent extends WebCameraProvider {

  tracker: any;
  task: any;

  constructor() {
    super(() => {
      this.capture();
    }, (err) => {
      console.error(err);
    }, () => {
      if (this.flash) {
        console.error(new Error('tracking.js not support flash player'))
      } else {
        this.initTracker();
      }
    });
  }

  /**
   * Init face video tracker
   *
   * @link https://trackingjs.com
   * @link https://trackingjs.com/examples/face_camera.html
   *
   */
  initTracker(): void {
    try {
      const global = <any>window;
      this.tracker = new global.tracking.ObjectTracker('face');
      this.task = global.tracking.track('#video', this.tracker, { camera: true });

      this.tracker.on('track', (event) => {
        const { data } = event;
        this.tryToDetectFace(data);
      });
      this.tracker.setInitialScale(4);
      this.tracker.setStepSize(2);
      this.tracker.setEdgesDensity(0.1);

    } catch (e) {
      console.error(e);
    }
  }

  tryToDetectFace(trackedData: any): void {
    if (trackedData.length > 0) {
      const video = this.getVideo();
      const canvas = this.getCanvas();
      const ctx = canvas.getContext('2d');
      if (video && canvas) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.setAttribute('style', 'width: 320px; height: 240px');
        ctx.drawImage(video, 0, 0);
        trackedData.forEach((rect) => {
          const gradient = ctx.createLinearGradient(0, 0, 170, 0);
          gradient.addColorStop(0, 'magenta');
          gradient.addColorStop(0.5, 'blue');
          gradient.addColorStop(1.0, 'red');
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 5;
          ctx.strokeRect(rect.x * 2, rect.y * 2, rect.width * 2, rect.height * 2);
          ctx.font = '24px Helvetica';
          ctx.fillStyle = '#fff';
          ctx.fillText('x: ' + rect.x * 1.5 + 'px', rect.x * 1.5 + rect.width * 1.5 + 15, rect.y + 11);
          ctx.fillText('y: ' + rect.y * 1.5 + 'px', rect.x * 1.5 + rect.width * 1.5 + 15, rect.y + 52);
        });
      }
    }
  }
}

export default FaceDetectorComponent;

