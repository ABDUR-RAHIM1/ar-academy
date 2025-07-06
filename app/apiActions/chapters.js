import { getsActions } from "@/actions/users/getActions";
import { chaptersGetAll, chapterWithContent, chapterWithoutContent } from "@/constans";

// get all chapter without Contents for User (home page)
export const getAllChapters = async (cacheTime = 5) => {
    const chapterList = await getsActions(chaptersGetAll, cacheTime);

    return chapterList;
}

// get chapter by identifier without content (/sub-categorie == /dashboard)
export const getChapterByIdentifier = async (identifier, cacheTime = 5) => {
    const api = chapterWithoutContent + identifier;
    const chapterBYIdentifier = await getsActions(api, cacheTime);

    return chapterBYIdentifier;
};


// get One Chapter with Contens by Identifier (_id , identifier ) -> ("/chapters/[chapterName]")
export const getChapterWithContent = async (chapterName, cacheTime = 5) => {
    const api = chapterWithContent + chapterName
    const chapters = await getsActions(api, cacheTime); 
    return chapters
}
