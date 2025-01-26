
const API_URL = process.env.API_URL || "http://localhost:3000"
// const API_URL = "https://ar-academy.vercel.app"


const userLogin = "/account"

const categoriePostGet = "/api/categories"
const categoriePutDelete = "/api/categories/"

const subjectGetPost = "/api/subject" // get and post endpoint use hocce na
const subjectPutDelete = "/api/subject/" // get and post endpoint use hocce na

const getSubCategoryByIndentifier = "/api/sub-categories/sub/"


export {
    API_URL, userLogin,
    categoriePostGet, categoriePutDelete,
    subjectGetPost, subjectPutDelete,
    getSubCategoryByIndentifier
}