import { getsActions } from "@/actions/users/getActions";
import { chaptersGetAll, chapterWithContent, chapterWithoutContent } from "@/constans";

// get all chapter without Contents for User (home page)
export const getAllChapters = async () => {
    const chapterList = await getsActions(chaptersGetAll);

    return chapterList;
}

// get chapter by identifier without content (/sub-categorie == /dashboard)
export const getChapterByIdentifier = async (identifier) => {
    const api = chapterWithoutContent + identifier;
    const chapterBYIdentifier = await getsActions(api);

    return chapterBYIdentifier;
};


// get One Chapter with Contens by Identifier (_id , identifier ) -> ("/chapters/[chapterName]")
export const getChapterWithContent = async (chapterName) => {
    const api = chapterWithContent + chapterName
    const chapters = await getsActions(api);
    return chapters
}
