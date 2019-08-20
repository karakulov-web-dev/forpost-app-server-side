const { FastExpress } = require("@karakulov-web-dev/fast-express");
const Jimp = require("jimp");
const axios = require("axios");

class ForpostAppApi extends FastExpress {
  async image(req) {
    const { url } = req.query;
    if (!url) {
      return "url is undefined";
    }

    try {
      let result = await axios.get(url, { responseType: "arraybuffer" });
      let image = await Jimp.read(result.data);
      let newBuffer = await image.getBufferAsync(Jimp.MIME_PNG);
      return newBuffer;
    } catch (e) {
      return e;
    }
  }
}

new ForpostAppApi(8009);
