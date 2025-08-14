



//  get subject by Query parameters (subjectID)
// ata akhn thakakuk , pore thik kora hobe 
export const getQuestionsSheetByQuery = async (subjectId) => {
    const api = chapterListGetByQuery + subjectId;

    const chapters = await getsActions(api)
    return chapters;
}