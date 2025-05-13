import { ID, Query } from 'appwrite';
import { databases, storage } from './config';
import config from './config';

class AdminService {
    // Get dashboard stats
    async getDashboardStats() {
        try {
            // Get wallpaper stats
            const wallpapers = await databases.listDocuments(
                config.databaseId,
                config.wallpapersCollectionId,
                [Query.limit(1000)]
            );
            
            const totalWallpapers = wallpapers.documents.length;
            const phoneWallpapers = wallpapers.documents.filter(wp => wp.category === 'phone').length;
            const desktopWallpapers = wallpapers.documents.filter(wp => wp.category === 'desktop').length;
            
            // Calculate total downloads
            const totalDownloads = wallpapers.documents.reduce((total, wp) => total + (wp.downloads || 0), 0);
            
            // Calculate recent wallpapers (last 30 days)
            const thirtyDaysAgo = new Date();
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
            
            const recentWallpapers = wallpapers.documents.filter(wp => {
                const createdAt = new Date(wp.$createdAt);
                return createdAt >= thirtyDaysAgo;
            }).length;
            
            return {
                totalWallpapers,
                phoneWallpapers,
                desktopWallpapers,
                totalDownloads,
                recentWallpapers
            };
        } catch (error) {
            console.error("AdminService :: getDashboardStats :: error", error);
            throw error;
        }
    }
    
    // Get all wallpapers for admin management
    async getAllWallpapers() {
        try {
            const wallpapers = await databases.listDocuments(
                config.databaseId,
                config.wallpapersCollectionId,
                [Query.orderDesc('$createdAt'), Query.limit(100)]
            );
            
            return wallpapers.documents;
        } catch (error) {
            console.error("AdminService :: getAllWallpapers :: error", error);
            throw error;
        }
    }    // Upload a new wallpaper
    async uploadWallpaper(file, title, deviceType, categoryId = null) {
        try {
            // Upload file to storage with progress callback
            const fileUpload = await storage.createFile(
                config.storageId,
                ID.unique(),
                file
            );
            
            // Get file URL - ensure we get a valid URL for the image
            const fileUrl = storage.getFilePreview(
                config.storageId,
                fileUpload.$id
            );
            
            // Create wallpaper document data
            const wallpaperData = {
                title,
                category: deviceType, // "phone" or "desktop"
                imageId: fileUpload.$id,
                imageUrl: fileUrl.toString(), // Use toString to get the full URL as string
                downloads: 0,
                featured: false
            };
            
            // Add categoryId if provided
            if (categoryId) {
                wallpaperData.categoryId = categoryId;
            }
            
            // Create wallpaper document
            const wallpaper = await databases.createDocument(
                config.databaseId,
                config.wallpapersCollectionId,
                ID.unique(),
                wallpaperData
            );
            
            return wallpaper;
        } catch (error) {
            console.error("AdminService :: uploadWallpaper :: error", error);
            throw error;
        }
    }
    
    // Delete a wallpaper
    async deleteWallpaper(id, imageId) {
        try {
            // Delete from database
            await databases.deleteDocument(
                config.databaseId,
                config.wallpapersCollectionId,
                id
            );
            
            // Delete from storage
            await storage.deleteFile(
                config.storageId,
                imageId
            );
            
            return true;
        } catch (error) {
            console.error("AdminService :: deleteWallpaper :: error", error);
            throw error;
        }
    }
    
    // Feature a wallpaper
    async featureWallpaper(id, featured = true) {
        try {
            return await databases.updateDocument(
                config.databaseId,
                config.wallpapersCollectionId,
                id,
                { featured }
            );
        } catch (error) {
            console.error("AdminService :: featureWallpaper :: error", error);
            throw error;
        }
    }

    // CATEGORY MANAGEMENT

    // Get all categories
    async getAllCategories() {
        try {
            const categories = await databases.listDocuments(
                config.databaseId,
                config.categoriesCollectionId,
                [Query.orderAsc('name'), Query.limit(100)]
            );
            
            // Count wallpapers in each category
            const wallpapers = await this.getAllWallpapers();
            
            // Map categories with wallpaper counts
            const categoriesWithCounts = categories.documents.map(category => {
                const wallpaperCount = wallpapers.filter(wp => wp.categoryId === category.$id).length;
                return { ...category, wallpaperCount };
            });
            
            return categoriesWithCounts;
        } catch (error) {
            console.error("AdminService :: getAllCategories :: error", error);
            throw error;
        }
    }
    
    // Create a new category
    async createCategory(name, description = '', icon = '') {
        try {
            const category = await databases.createDocument(
                config.databaseId,
                config.categoriesCollectionId,
                ID.unique(),
                {
                    name,
                    description,
                    icon
                }
            );
            
            return category;
        } catch (error) {
            console.error("AdminService :: createCategory :: error", error);
            throw error;
        }
    }
    
    // Update a category
    async updateCategory(id, name, description = '', icon = '') {
        try {
            const category = await databases.updateDocument(
                config.databaseId,
                config.categoriesCollectionId,
                id,
                {
                    name,
                    description,
                    icon
                }
            );
            
            return category;
        } catch (error) {
            console.error("AdminService :: updateCategory :: error", error);
            throw error;
        }
    }
      // Delete a category
    async deleteCategory(id) {
        try {
            await databases.deleteDocument(
                config.databaseId,
                config.categoriesCollectionId,
                id
            );
            
            return true;
        } catch (error) {
            console.error("AdminService :: deleteCategory :: error", error);
            throw error;
        }
    }
}

const adminService = new AdminService();
export default adminService;
