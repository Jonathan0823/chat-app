import { Client, Databases } from "appwrite";

export const PROJECT_ID = '66fd38030033260b0fb0';
export const DATABASE_ID = '66fd3aad0013ca246677';
export const COLLECTION_ID_MESSAGES = '66fd3ab8002bb98b7b97';

const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('66fd38030033260b0fb0');

export const databases = new Databases(client);

export default client;