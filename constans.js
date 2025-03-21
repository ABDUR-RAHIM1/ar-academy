
// const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_URL = "http://localhost:3000"  // local
// export const secretKey = process.env.NETX_PUBLIC_SECRET_KEY
export const secretKey = "abrahimArAcademy"
export const adminSecretKey = "@Admin#2024!Secure/17"

const userLogin = "/account/register"

//  get token api 
export const getTokenApi = "/api/get-token/"

// 1 Categories Start
const categoriePostGet = process.env.NEXT_PUBLIC_CATEGORIE_GET;
const categoriePutDelete = process.env.NEXT_PUBLIC_CATEGORIE_PUT_DELETE
// 1 Categories End


// 2 Sub Categories start
const postGetSubCategories = process.env.NEXT_PUBLIC_POST_GET_SUB_CATEGORIES;
const getSubCategoryByIndentifier = process.env.NEXT_PUBLIC_POST_GET_SUB_CATEGORIES_BY_IDENTIFIER;
const subCategoriePutDelete = process.env.NEXT_PUBLIC_SUB_CATEGORIE_PUT_DELETE;
// 2 Sub Categories start

// 3 chapters start
const chapters = process.env.NEXT_PUBLIC_CHAPTERS;
const chapterWithContent = process.env.NEXT_PUBLIC_CHAPTERS_WITH_CONTENT;
const chapterEdit = process.env.NEXT_PUBLIC_CHAPTER_EDIT
// 3 chapters end

//  questions start
export const questionsPOST_GET = "/api/questions/"
export const questionSingleGET = "/api/questions/get-one/"
export const questionDelete = "/api/questions/delete/"
//  questions End

//  results Start here ==========================
export const submitQuestions_get_all_result = "/api/user/results"
export const getMyResult = "/api/user/results/get-me"
export const resultDetailsApi = "/api/user/results/details/"
//  results End here ============================

//  user Start here ============================================================

export const accountRegister = "/api/account/register"
export const accountLogin = "/api/account/login"
export const AllAccount = "/api/account/dash/all"
export const AllAccountStatusDelete = "/api/account/dash/"

export const commentPostGetAll = "/api/user/comment/" // post , get all
export const commentByChapterId = "/api/user/comment/byChapter/"
export const commentReply = "/api/user/comment/reply"

//  User End Here ===============================================================


export {
    API_URL, userLogin,
    categoriePostGet, categoriePutDelete,

    postGetSubCategories,
    getSubCategoryByIndentifier, subCategoriePutDelete,

    chapters, chapterWithContent, chapterEdit,
};