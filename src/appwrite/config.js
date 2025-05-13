import { Client, Account, Databases, Storage, Query } from 'appwrite';

// Appwrite configuration
const client = new Client();

const config = {
    projectId: '68209798000cedff539c', // Replace with your Appwrite project ID
    endpoint: 'https://fra.cloud.appwrite.io/v1', // Default Appwrite endpoint (change if using self-hosted)
    databaseId: '68209849000b88ea385e', // Replace with your database ID
    wallpapersCollectionId: '682098d2002c06b08999', // Collection for wallpapers
    categoriesCollectionId: '6820990900093e53c158', // Collection for categories
    storageId: '6820988300220f701b9b', // Storage bucket ID for wallpaper files
    adminLabelKey: 'role', // The preference key used to identify admin users
    adminLabelValue: 'admin', // The preference value that designates a user as admin
};

// Initialize Appwrite services
client
    .setEndpoint(config.endpoint)
    .setProject(config.projectId);

// Export initialized services
export const appwriteClient = client;
export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

export default config;