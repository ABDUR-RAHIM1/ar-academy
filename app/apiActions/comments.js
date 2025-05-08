import { getsActions } from "@/actions/users/getActions";
import { API_URL, commentDelete, commentGetByChapter } from "@/constans";

// get comment using chapterId for specefic Chapter
export const getCommentsByChapterId = async (chapterId) => {
    const api = commentGetByChapter + chapterId
    const comments = await getsActions(api);

    return comments
}

  