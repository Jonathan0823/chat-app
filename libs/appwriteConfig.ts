import { Client, Databases } from "appwrite";

const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('66fd38030033260b0fb0');

export const databases = new Databases(client);

export default client;