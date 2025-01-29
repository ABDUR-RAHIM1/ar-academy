
// const API_URL = process.env.API_URL || "http://localhost:3000"
const API_URL = "https://ar-academy.vercel.app"


const userLogin = "/account"

//  Categories Start
const categoriePostGet = "/api/categories"
const categoriePutDelete = "/api/categories/"
//  Categories End

// const subjectGetPost = "/api/subject" // get and post endpoint use hocce na
// const subjectPutDelete = "/api/subject/" // get and post endpoint use hocce na


//  Sub Categories start
const postGetSubCategories = "/api/sub-categories/"
const getSubCategoryByIndentifier = "/api/sub-categories/sub/"
const subCategoriePutDelete = "/api/sub-categories/"
//  Sub Categories start

//  chapters start
const chapters = "/api/chapters/"
const chapterWithContent = "/api/chapters/contents/"
const chapterEdit = "/api/chapters/contents/"
//  chapters end

export {
    API_URL, userLogin,
    categoriePostGet, categoriePutDelete,
    // subjectGetPost, subjectPutDelete,

    postGetSubCategories,
    getSubCategoryByIndentifier, subCategoriePutDelete,

    chapters, chapterWithContent, chapterEdit,
}