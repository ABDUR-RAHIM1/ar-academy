import { getsActions } from "@/actions/admins/getsAction";
import { chapterWithContent } from "@/constans";

//  for  chapter edit
export const getChapterWithContentbyAdmin = async (chapterName, cacheTime = 5) => {
    const api = chapterWithContent + chapterName
    const chapters = await getsActions(api, cacheTime); 
    return chapters
}
