import { databases } from "./appwriteConfig";
import { Query } from "appwrite";

const fetchMessage = async () => {
    const response = await databases.listDocuments(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
        process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_MESSAGES!,
        [Query.orderDesc("$createdAt")]
    );
    return response
    };

export default fetchMessage;