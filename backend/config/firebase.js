import admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();

const serviceAccount = JSON.parse(process.env.GCLOUD_SECRET_KEY);

const firebase = async () => {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

  console.log("You successfully connected to Firebase");
};

export default firebase;