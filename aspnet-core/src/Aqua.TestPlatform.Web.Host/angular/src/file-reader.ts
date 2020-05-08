export class FileReaderTs {
  onload: any;
  result: any;
  readAsText(blob?: any | Blob) {
    // tslint:disable-next-line:prefer-const
    let promise: Promise<string>;
    if (!blob.toString().startsWith('[')) {
      promise = Promise.resolve(JSON.stringify(JSON.parse(blob.toString()).result));
    } else {
      // promise = blob.text();
      promise = new Promise<string>(resolve => {
        const reader = new FileReader();
        reader.onload = function() {
          resolve(<string>reader.result);
        };
        reader.readAsText(blob);
      });
    }
    promise.then(text => {
      this.result = text;
      this.onload({
        result: this.result,
        target: {
          result: this.result,
        }
      });
    });
  }
}
