
// const API_URL = process.env.NEXT_PUBLIC_API_URL; 
const API_URL = "http://localhost:5000"  // local
// const API_URL = "https://onushilon-academy.onrender.com"  // deploy
// export const secretKey = process.env.NETX_PUBLIC_SECRET_KEY

export const secretKey = "abrahimArAcademy"
export const adminSecretKey = "@Admin#2024!Secure/17"

export const userRegister = "/account/register"
export const userLogin = "/account/login"

//  get token api // akhn use hocce na , delete korte hbe pore
export const getTokenApi = "/api/get-token/"

// 1 Categories Start
export const categorieGetAll = process.env.NEXT_PUBLIC_CATEGORIE_GET;
export const categoriePost = process.env.NEXT_PUBLIC_CATEGORIE_POST;
export const categorieUpdate = process.env.NEXT_PUBLIC_CATEGORIE_UPDATE
export const categorieDelete = process.env.NEXT_PUBLIC_CATEGORIE_DELETE
// 1 Categories End


// 2 Sub Categories start
export const createSubCategories = process.env.NEXT_PUBLIC_POST_SUB_CATEGORIES;
export const getSubCategories = process.env.NEXT_PUBLIC_GET_SUB_CATEGORIES;
const getSubCategoryByIndentifier = process.env.NEXT_PUBLIC_POST_GET_SUB_CATEGORIES_BY_IDENTIFIER;
export const subCategoriesUpdate = process.env.NEXT_PUBLIC_SUB_CATEGORIE_PUT
export const subCategoriesDelete = process.env.NEXT_PUBLIC_SUB_CATEGORIE_DELETE
// 2 Sub Categories start

// 3 chapters start
export const chaptersCreate = process.env.NEXT_PUBLIC_CHAPTERS;
export const chaptersGetAll = process.env.NEXT_PUBLIC_CHAPTERS_GET_ALL;
export const chapterWithoutContent = process.env.NEXT_PUBLIC_CHAPTERS_WITHOUT_CONTENT
export const chapterWithContent = process.env.NEXT_PUBLIC_CHAPTERS_WITH_CONTENT
export const chaptersUpdate = process.env.NEXT_PUBLIC_CHAPTERS_UPDATE;
export const chapterDelete = process.env.NEXT_PUBLIC_CHAPTERS_DELETE
// 3 chapters end

//  questions start
export const questionsCreate = process.env.NEXT_PUBLIC_QUESTIONS_CREATE
export const questionsGetAll = process.env.NEXT_PUBLIC_QUESTIONS_GET_ALL
export const questionGetSingel = process.env.NEXT_PUBLIC_QUESTIONS_GET_ONE
export const questionGetByChapter = process.env.NEXT_PUBLIC_QUESTIONS_GET_BY_CHAPTER
export const questionUpdate = process.env.NEXT_PUBLIC_QUESTIONS_UPDATE
export const questionDelete = process.env.NEXT_PUBLIC_QUESTIONS_DELETE
//  questions End


//  results Start here ==========================  
export const questionsSubmit = process.env.NEXT_PUBLIC_QUESTIONS_SUBMIT
export const resultGetAll = process.env.NEXT_PUBLIC_RESULT_ALL
export const resultDetails = process.env.NEXT_PUBLIC_RESULT_DETAILS
export const resultMy = process.env.NEXT_PUBLIC_RESULT_MY
//  results End here ============================


//  user Start here ============================================================

export const accountRegister = "/api/account/register"
export const accountLogin = "/api/account/login"
export const AllAccount = "/api/account/all"
export const loginUserAccount = "/api/account/user/"
export const accountDelete = "/api/account/delete/"
export const updateUserStatus = "/api/account/update/"


//  comment
export const commentCreate = process.env.NEXT_PUBLIC_COMMENT_CREATE
export const commentGetAll = process.env.NEXT_PUBLIC_COMMENT_GET_ALL
export const commentGetByChapter = process.env.NEXT_PUBLIC_COMMENT_GET_BY_CHAPTER
export const commentReply = process.env.NEXT_PUBLIC_COMMENT_REPLY
export const commentDelete = process.env.NEXT_PUBLIC_COMMENT_DELETE
//  comment ENd


//  User End Here ===============================================================


export {
    API_URL,

    getSubCategoryByIndentifier,
};