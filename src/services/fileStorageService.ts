import { UploadedFile } from "express-fileupload";
import crypto from "crypto";
import path from "path";
import fs from "fs";

export class FileStorageService {
  saveFile(file: UploadedFile) {
    const hash = this.generateHash(file.data);
    const imagePath =
      "public/images/" +
      hash[0] +
      hash[1] +
      "/" +
      hash[2] +
      hash[3] +
      "/" +
      hash +
      path.extname(file.name);

    file.mv(path.join(__dirname + "../../" + imagePath));

    return imagePath;
  }

  deleteFolder(pathToFile: string) {
    const pathOnDisk = path.join(__dirname + "/../" + pathToFile);
    if (fs.existsSync(pathOnDisk)) {
      fs.unlinkSync(pathOnDisk);
      const dirLevel2 = path.join(pathOnDisk + "/..");
      const dirLevel1 = path.join(pathOnDisk + "/.." + "/..");
      fs.rmdirSync(dirLevel2);
      fs.rmdirSync(dirLevel1);
    } else {
      return;
    }
  }

  private generateHash(data: Buffer) {
    const hash = crypto.createHash("sha256").update(data).digest("hex");

    return hash;
  }
}
