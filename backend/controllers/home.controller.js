import fs from 'fs'
import { google } from 'googleapis'
import KEYFILEPATH from '../../googleApi.json' assert { type: 'json' };
import { Readable } from 'stream';

const SCOPES = ['https://www.googleapis.com/auth/drive']

async function getGoogleAuth() {
    const jwtClient = new google.auth.JWT(
      KEYFILEPATH.client_email,
      null,
      KEYFILEPATH.private_key,
      SCOPES
    );
    await jwtClient.authorize();
    return jwtClient;
}

const HomeController = async (req, res) => {
    try {
        const file = req.file;

        if(!file){
            res.status(404).send("No file uploaded");
        }

        const auth = await getGoogleAuth();
        const drive = google.drive({ version: 'v3', auth});

        const fileMetaData = {
            'name': file.originalname,
            'parents': ['16kLcJZoITUVzBBKus5c7R3WZjwJwQPO2']
        };

        const media = {
            mimeType: file.mimeType,
            body:  Readable.from([file.buffer]) 
        };

        const response = await drive.files.create({
            resource: fileMetaData,
            media: media,
            fields: 'id'
        });

        console.log('File created successfully, ID: ', response.data.id);
        res.status(200).json({ message: 'File uploaded successfully' });
    } catch (err) {
        console.error('Error uploading file:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export default HomeController;

