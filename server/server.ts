import express, { Request, Response } from "express";
import { Storage } from "@google-cloud/storage";
import path from "path";


const app = express();


const storage = new Storage({
    keyFilename: path.join("./credentials/intricate-pad-455413-f7-970197da1d79.json"),
});

const bucketName = "locaccm-bucket";
const bucket = storage.bucket(bucketName);

app.get("/images/:filename", (req: Request, res: Response): void => {
    const filename = req.params.filename;
    const file = bucket.file(`images/${filename}`); // ajoute "images/" ici


    file.exists().then(([exists]) => {
        if (!exists) {
            res.status(404).json({ error: "Image non trouvée" });
            return;
        }

        res.setHeader("Content-Type", "image/jpeg");
        file.createReadStream().pipe(res);
    }).catch((err) => {
        console.error("Erreur lors de la lecture du fichier :", err);
        res.status(500).json({ error: "Erreur serveur" });
    });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Proxy GCS lancé sur le port ${PORT}`);
});
