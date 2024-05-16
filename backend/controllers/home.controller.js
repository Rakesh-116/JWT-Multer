import fs from 'fs'
import { google } from 'googleapis'
import { upload } from '../middleware/multer.middleware.js';

const KEYFILEPATH = '../../googleApi.json';
const SCOPES = ['https://www.googleapis.com/auth/drive']

const getGoogleAuth = async () => {
    const auth = new google.auth.GoogleAuth({
        keyFile: KEYFILEPATH,
        scopes: SCOPES
    });
    return auth.getClient();
};

const HomeController = async (req, res) => {
    try {
        const auth = await getGoogleAuth();
        const drive = google.drive({ version: 'v3', auth});

        const file = req.file;

        const fileMetaData = {
            'name': file.originalname,
            'parents': ['16kLcJZoITUVzBBKus5c7R3WZjwJwQPO2']
        };

        const media = {
            mimeType: file.mimeType,
            body: fs.createReadStream(file.path)
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

