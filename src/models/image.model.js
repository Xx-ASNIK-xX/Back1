import mongoose from 'mongoose';
const { GridFSBucket } = mongoose.mongo;

class ImageModel {
    constructor() {
        this.bucket = null;
    }

    async initialize() {
        if (!this.bucket) {
            this.bucket = new GridFSBucket(mongoose.connection.db, {
                bucketName: 'images'
            });
        }
    }

    async uploadImage(file) {
        await this.initialize();
        return new Promise((resolve, reject) => {
            const uploadStream = this.bucket.openUploadStream(file.originalname, {
                contentType: file.mimetype
            });

            const chunks = [];
            file.buffer.forEach(chunk => chunks.push(chunk));
            const buffer = Buffer.concat(chunks);

            uploadStream.end(buffer);
            uploadStream.on('finish', () => {
                resolve(uploadStream.id);
            });
            uploadStream.on('error', reject);
        });
    }

    async getImage(imageId) {
        await this.initialize();
        return this.bucket.openDownloadStream(new mongoose.Types.ObjectId(imageId));
    }

    async deleteImage(imageId) {
        await this.initialize();
        return this.bucket.delete(new mongoose.Types.ObjectId(imageId));
    }
}

export default new ImageModel(); 