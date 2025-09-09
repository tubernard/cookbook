import { v2 as cloudinary } from 'cloudinary';

const uploadController = {};

uploadController.signUpload = (req, res) => {
  const timestamp = Math.round(new Date().getTime() / 1000);

  const environment = process.env.NODE_ENV === 'production' ? 'prod' : 'dev';
  const userId = req.session.userId;
  const folder = `fromscratch/${environment}/${userId}`;

  const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET;

  try {
    const signature = cloudinary.utils.api_sign_request(
      {
        timestamp: timestamp,
        folder: folder,
        upload_preset: uploadPreset,
      },
      process.env.CLOUDINARY_API_SECRET,
    );

    res
      .status(200)
      .json({ timestamp, signature, folder, upload_preset: uploadPreset });
  } catch (error) {
    console.error('Error signing upload:', error);
    res.status(500).json({ message: 'Could not sign upload request.' });
  }
};

export default uploadController;
