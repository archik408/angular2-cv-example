import { FallbackDispatcher } from 'ng2-webcam';

class WebCameraProvider {

  opt: any;
  success: Function;
  error: Function;
  onAfterCapture: Function;
  flash: FallbackDispatcher;

  constructor(success: Function, error: Function, afterCapture: Function) {
    this.opt = {
      audio: false,
      video: true,
      cameraType: 'front',
      width: 320,
      height: 240,
      fallbackQuality: 200
    };
    this.success = (stream: FallbackDispatcher | MediaStream) => {
      if (stream instanceof FallbackDispatcher) {
        this.flash = <FallbackDispatcher>stream;
        this.onFallback();
      }
      success(stream);
    };
    this.onAfterCapture = afterCapture;
    this.error = error;
  }

  onFallback(): void {
    const self = this;
    const canvas = this.getCanvas();
    if (canvas) {
      const ctx = canvas.getContext('2d');
      const size = self.flash.getCameraSize();
      const w = size.width;
      const h = size.height;
      const externData = {
        imgData: ctx.getImageData(0, 0, w, h),
        pos: 0
      };

      canvas.width = w;
      canvas.height = h;
      ctx.clearRect(0, 0, w, h);

      FallbackDispatcher.implementExternal({
        onSave: (data) => {
          try {
            let col = data.split(';');
            let tmp = null;

            for (let i = 0; i < w; i++) {
              tmp = parseInt(col[i], 10);
              externData.imgData.data[externData.pos + 0] = (tmp >> 16) & 0xff;
              externData.imgData.data[externData.pos + 1] = (tmp >> 8) & 0xff;
              externData.imgData.data[externData.pos + 2] = tmp & 0xff;
              externData.imgData.data[externData.pos + 3] = 0xff;
              externData.pos += 4;
            }

            if (externData.pos >= 4 * w * h) {
              ctx.putImageData(externData.imgData, 0, 0);
              externData.pos = 0;
              self.onAfterCapture(canvas);
            }
          } catch (e) {
            console.error(e);
          }

        },
        debug: (tag, message) => {
          // console.log(tag, message);
        },
        onCapture: () => {
          self.flash.save();
        },
        onTick: (time) => {
          // do nothing
        }
      });
    }
  }

  capture(): void {
    const video = this.getVideo();
    const canvas = this.getCanvas();
    if (video) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d').drawImage(video, 0, 0);
      this.onAfterCapture(canvas);
    }
    else {
      this.flash.capture();
    }
  }

  getCanvas(): HTMLCanvasElement {
    return <HTMLCanvasElement>document.getElementsByTagName('canvas')[0];
  }

  getVideo(): HTMLVideoElement {
    return <HTMLVideoElement>document.getElementsByTagName('video')[0];
  }

  getFlashObject(): HTMLObjectElement {
    return <HTMLObjectElement>document.getElementById('XwebcamXobjectX');
  }
}

export default WebCameraProvider;

