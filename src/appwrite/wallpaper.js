import { ID, Query } from 'appwrite';
import { databases, storage } from './config';
import config from './config';

class WallpaperService {
    // Get all wallpapers
    async getAllWallpapers(queries = []) {
        try {
            const defaultQueries = [Query.orderDesc('$createdAt')];
            const response = await databases.listDocuments(
                config.databaseId,
                config.wallpapersCollectionId,
                [...defaultQueries, ...queries]
            );
            return response.documents;
        } catch (error) {
            console.error("WallpaperService :: getAllWallpapers :: error", error);
            throw error;
        }
    }

    // Get wallpapers by category
    async getWallpapersByCategory(category, queries = []) {
        try {
            const categoryQuery = Query.equal('category', category);
            const defaultQueries = [Query.orderDesc('$createdAt')];
            const response = await databases.listDocuments(
                config.databaseId,
                config.wallpapersCollectionId,
                [categoryQuery, ...defaultQueries, ...queries]
            );
            return response.documents;
        } catch (error) {
            console.error("WallpaperService :: getWallpapersByCategory :: error", error);
            throw error;
        }
    }

    // Get wallpaper by ID
    async getWallpaper(id) {
        try {
            return await databases.getDocument(
                config.databaseId,
                config.wallpapersCollectionId,
                id
            );
        } catch (error) {
            console.error("WallpaperService :: getWallpaper :: error", error);
            throw error;
        }
    }

    // Create a new wallpaper
    async createWallpaper(title, category, file, userId, userName, onProgress) {
        try {
            // Upload file to storage
            const fileUpload = await storage.createFile(
                config.storageId,
                ID.unique(),
                file,
                undefined,
                onProgress
            );
            
            // Get file URL
            const fileUrl = storage.getFileView(
                config.storageId,
                fileUpload.$id
            );
            
            // Create document in database
            const wallpaper = await databases.createDocument(
                config.databaseId,
                config.wallpapersCollectionId,
                ID.unique(),
                {
                    title,
                    category,
                    imageId: fileUpload.$id,
                    imageUrl: fileUrl.href,
                    userId,
                    userName,
                    downloads: 0
                }
            );
            
            return wallpaper;
        } catch (error) {
            console.error("WallpaperService :: createWallpaper :: error", error);
            throw error;
        }
    }

    // Update wallpaper information
    async updateWallpaper(id, data) {
        try {
            return await databases.updateDocument(
                config.databaseId,
                config.wallpapersCollectionId,
                id,
                data
            );
        } catch (error) {
            console.error("WallpaperService :: updateWallpaper :: error", error);
            throw error;
        }
    }

    // Delete wallpaper
    async deleteWallpaper(id, imageId) {
        try {
            // Delete document from database
            await databases.deleteDocument(
                config.databaseId,
                config.wallpapersCollectionId,
                id
            );
            
            // Delete file from storage
            await storage.deleteFile(
                config.storageId,
                imageId
            );
            
            return true;
        } catch (error) {
            console.error("WallpaperService :: deleteWallpaper :: error", error);
            throw error;
        }
    }

    // Increment download count
    async incrementDownloads(id) {
        try {
            // Get current wallpaper
            const wallpaper = await this.getWallpaper(id);
            
            // Increment downloads
            const updatedDownloads = (wallpaper.downloads || 0) + 1;
            
            // Update document
            return await this.updateWallpaper(id, {
                downloads: updatedDownloads
            });
        } catch (error) {
            console.error("WallpaperService :: incrementDownloads :: error", error);
            throw error;
        }
    }

    // Get stats
    async getStats() {
        try {
            const wallpapers = await this.getAllWallpapers();
            
            const totalWallpapers = wallpapers.length;
            const phoneWallpapers = wallpapers.filter(wp => wp.category === 'phone').length;
            const desktopWallpapers = wallpapers.filter(wp => wp.category === 'desktop').length;
            const totalDownloads = wallpapers.reduce((total, wp) => total + (wp.downloads || 0), 0);
            
            return {
                totalWallpapers,
                phoneWallpapers,
                desktopWallpapers,
                totalDownloads
            };
        } catch (error) {
            console.error("WallpaperService :: getStats :: error", error);
            throw error;
        }
    }
}

const wallpaperService = new WallpaperService();
export default wallpaperService;
