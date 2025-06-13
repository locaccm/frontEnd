import express, { Request, Response } from "express";
import { Storage } from "@google-cloud/storage";
import path from "path";
import mime from "mime";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import cors from "cors";

const app = express();

app.use(
    cors({
        origin: process.env.NODE_ENV === "production"
            ? "https://frontend-service-782869810736.europe-west1.run.app"
            : "http://localhost:5173",
    }),
);

const storage =
    process.env.NODE_ENV === "production"
        ? new Storage() // In production, no credentials file is needed
        : new Storage({
          keyFilename: path.join(
              "./credentials/intricate-pad-455413-f7-970197da1d79.json",
          ),
        });

const bucketName = "locaccm-bucket";
const bucket = storage.bucket(bucketName);

app.get(
  "/files/:folder/:filename",
  async (
    req: Request<{ folder: string; filename: string }>,
    res: Response,
  ): Promise<void> => {
    const { folder, filename } = req.params;
    const file = bucket.file(`${folder}/${filename}`);

    try {
      const [exists] = await file.exists();
      if (!exists) {
        res.status(404).json({ error: "Fichier non trouvé" });
        return;
      }

      const mimeType = mime.getType(filename) || "application/octet-stream";
      res.setHeader("Content-Type", mimeType);

      file.createReadStream().pipe(res);
    } catch (err) {
      console.error("Erreur lors de la lecture du fichier :", err);
      res.status(500).json({ error: "Erreur serveur" });
    }
  },
);

const upload = multer({ storage: multer.memoryStorage() });

app.post(
  "/upload/:folder",
  upload.single("file"),
  async (req: Request<{ folder: string }>, res: Response): Promise<void> => {
    const folder = req.params.folder;
    const file = req.file;

    if (!file) {
      res.status(400).json({ error: "Aucun fichier reçu" });
      return;
    }

    try {
      const extension = path.extname(file.originalname);
      const uniqueFilename = `${uuidv4()}${extension}`;
      const filePath = `${folder}/${uniqueFilename}`;
      const blob = bucket.file(filePath);
      const blobStream = blob.createWriteStream({
        resumable: false,
        contentType: file.mimetype,
      });

      blobStream.end(file.buffer);

      blobStream.on("finish", () => {
        res.status(201).json({ path: filePath });
      });

      blobStream.on("error", (err) => {
        console.error("Erreur upload :", err);
        res.status(500).json({ error: "Erreur lors de l'upload" });
      });
    } catch (err) {
      console.error("Erreur serveur :", err);
      res.status(500).json({ error: "Erreur serveur" });
    }
  },
);
app.use(express.static(path.join(__dirname, "../dist")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../dist/index.html"));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
});
