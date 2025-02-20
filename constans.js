
const API_URL = process.env.NEXT_PUBLIC_API_URL;
// const API_URL = "http://localhost:3000"  // local
// export const secretKey = process.env.NETX_PUBLIC_SECRET_KEY
export const secretKey = "ab_rahimArAcademy_BD17"

const userLogin = "/account/register"

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



//  user Start here ============================================================

export const userAccountRegister = "/api/user/account/register"
export const userAccountLogin = "/api/user/account/login"
export const userAllAccount = "/api/user/account/dash/all"
export const userAllAccountStatusDelete = "/api/user/account/dash/"

//  User End Here ===============================================================

export {
    API_URL, userLogin,
    categoriePostGet, categoriePutDelete,

    postGetSubCategories,
    getSubCategoryByIndentifier, subCategoriePutDelete,

    chapters, chapterWithContent, chapterEdit,
}