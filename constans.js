
const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const BASE_URL = process.env.NEXT_BASE_URL

// export const secretKey = process.env.NETX_PUBLIC_SECRET_KEY
export const COMMON_ALT_TEXT = "Onushilon Academy - Empowering Your Learning Journey";
export const roles = {
    admin: "superAdmin",
    subAdmin: "subAdmin",
    user: "student"
}

export const secretKey = "abrahimArAcademy"
export const adminSecretKey = "@Admin#2024!Secure/17"

export const studentAuth = "/account/student/register"
export const subAdminAuth = "/account/subAdmin/register"
export const subAdminLogin = "/account/subAdmin/login"

export const studentRegister = "/account/student/register"
export const studentLogin = "/account/student/login"
export const adminLogin = "/auth-admin"

//  get token api // akhn use hocce na , delete korte hbe pore
export const getTokenApi = "/api/get-token/"

//  Course Start Here
export const courseCreateByAdmin = process.env.NEXT_PUBLIC_COURSE_CREATE
export const courseCreateBySubAdmin = process.env.NEXT_PUBLIC_COURSE_CREATE_SUB_ADMIN
export const courseGetAll = process.env.NEXT_PUBLIC_COURSE_GET_ALL
export const courseGetSingle = process.env.NEXT_PUBLIC_COURSE_GET_SINGLE
export const courseGetByStudent = process.env.NEXT_PUBLIC_COURSE_GET_STUDENT
export const courseGetBySubAdmin = process.env.NEXT_PUBLIC_COURSE_GET_SUB_ADMIN

export const courseUpdateByAdmin = process.env.NEXT_PUBLIC_COURSE_UPDATE
export const courseDelete = process.env.NEXT_PUBLIC_COURSE_DELETE
//  Course End Here

//  Packages Start (only for sub Admin)
export const packageCreate = process.env.NEXT_PUBLIC_PACKAGES_CREATE
export const packageGetAll = process.env.NEXT_PUBLIC_PACKAGES_GET_ALL
export const packagePurchase = process.env.NEXT_PUBLIC_PACKAGES_PURCHASE
export const getMyPackage = process.env.NEXT_PUBLIC_PACKAGES_GET_MY_PACKAGE
//  Packages End


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
export const questionsCreateSubAdmin = process.env.NEXT_PUBLIC_QUESTIONS_CREATE_SUB_ADMIN

export const questionsGetAll = process.env.NEXT_PUBLIC_QUESTIONS_GET_ALL
export const questionsGetAllByPaidStudent = process.env.NEXT_PUBLIC_QUESTIONS_GET_ALL_PAID_COURSES

export const questionsGetAllBySubAdmin = process.env.NEXT_PUBLIC_QUESTIONS_GET_ALL_BY_SUBADMIN
export const questionGetSingel = process.env.NEXT_PUBLIC_QUESTIONS_GET_ONE
export const questionGetSingelByAdmin = process.env.NEXT_PUBLIC_QUESTIONS_GET_ONE_BY_ADMIN
export const questionReletedByCourseName = process.env.NEXT_PUBLIC_QUESTIONS_GET_RELATED_COURSENAME
export const questionGetByChapter = process.env.NEXT_PUBLIC_QUESTIONS_GET_BY_CHAPTER
export const questionUpdate = process.env.NEXT_PUBLIC_QUESTIONS_UPDATE
export const questionUpdateSubAdmin = process.env.NEXT_PUBLIC_QUESTIONS_UPDATE_SUB_ADMIN
export const questionDelete = process.env.NEXT_PUBLIC_QUESTIONS_DELETE
export const questionDeleteSubAdmin = process.env.NEXT_PUBLIC_QUESTIONS_DELETE_SUB_ADMIN
//  questions End


//  results Start here ==========================  
export const questionsSubmit = process.env.NEXT_PUBLIC_QUESTIONS_SUBMIT
export const resultGetAll = process.env.NEXT_PUBLIC_RESULT_ALL
export const resultGetAllSubAdmin = process.env.NEXT_PUBLIC_RESULT_ALL_BY_SUBADMIN
export const resultDetails = process.env.NEXT_PUBLIC_RESULT_DETAILS
export const resultMy = process.env.NEXT_PUBLIC_RESULT_MY
//  results End here ============================


//  Utils start here
export const getAllCourseSumary = "/api/utils/getSummary/"
export const getAllUsersSumary = "/api/utils/getUserSummary/"

export const getMergeAllQuestionsWithSearch = "/api/utils/get-margeQuestions?search="
//  Utils End here

//  leaderboard start
export const getLeaderboarByCourse = process.env.NEXT_PUBLIC_LEADERBOARD_GET
//  leaderboard end


//  user Start here ============================================================

export const adminAccountregister = "/api/account/admin/register"  // admin, moderator, subAdmin register
export const adminAccountLogin = "/api/account/admin/login/"

export const accountRegister = "/api/account/register"
export const resentVerificationEmail = "/api/account/resend-verification-email"
export const accountLogin = "/api/account/login"
export const AllAccount = "/api/account/all"
export const allAdminAccount = "/api/account/all-admin"

export const loginUserAccount = "/api/account/user/"
export const loginAdminAccount = "/api/account/admin/"
export const subAdminStudentsAccount = "/api/account/subStudent/"

export const accountDelete = "/api/account/delete/"
export const updateUserStatus = "/api/account/updateStatus/"
export const updateStudentStatusBySubAdmin = "/api/account/updateStatusBySubAdmin/"
export const updateAdminAllInformation = "/api/account/updateAdminAccount/"
export const studentDeleteOnlySubAdmin = "/api/account/subDelete/"
export const userAccountUpdate = "/api/account/userUpdate/" // :userId

//  comment
export const commentCreate = process.env.NEXT_PUBLIC_COMMENT_CREATE
export const commentGetAll = process.env.NEXT_PUBLIC_COMMENT_GET_ALL
export const commentGetByChapter = process.env.NEXT_PUBLIC_COMMENT_GET_BY_CHAPTER
export const commentReply = process.env.NEXT_PUBLIC_COMMENT_REPLY
export const commentDelete = process.env.NEXT_PUBLIC_COMMENT_DELETE
//  comment ENd


//  Purchase Plan Start
export const purchaseCourse = process.env.NEXT_PUBLIC_PLAN_PURCHASE;
export const assignPurchaseCourse = process.env.NEXT_PUBLIC_PLAN_PURCHASE_BY_ADMIN;
export const purchaseCourseGetMe = process.env.NEXT_PUBLIC_MY_PLAN_ME
export const purchaseCourseGetAll = process.env.NEXT_PUBLIC_MY_PLAN_ALL
export const purchaseMyCourseDelete = process.env.NEXT_PUBLIC_MY_PLAN_DELETE
//  Purchase Plan End



// questions sheet start here

export const classListCreate = process.env.NEXT_PUBLIC_CREATE_CLASSLIST
export const classListGetAll = process.env.NEXT_PUBLIC_GET_ALL_CLASSLIST
export const clasListupdate = process.env.NEXT_PUBLIC_UPDATE_CLASSLIST
export const classListeDelete = process.env.NEXT_PUBLIC_DELETE_CLASSLIST

export const subjectListCreate = process.env.NEXT_PUBLIC_CREATE_SUBJECT
export const subjectListGetAll = process.env.NEXT_PUBLIC_SUBJECT_GET_ALL
export const subjectListGetByQuery = process.env.NEXT_PUBLIC_SUBJECT_GET_BY_QUERY
export const subjectListupdate = process.env.NEXT_PUBLIC_UPDATE_SUBJECT
export const subjectListeDelete = process.env.NEXT_PUBLIC_DELETE_SUBJECT


export const chapterListCreate = process.env.NEXT_PUBLIC_CREATE_CHAPTER
export const chapterListGetAll = process.env.NEXT_PUBLIC_CHAPTER_GET_ALL
export const chapterListGetByQuery = process.env.NEXT_PUBLIC_CHAPTER_GET_BY_QUERY
export const chapterListupdate = process.env.NEXT_PUBLIC_UPDATE_CHAPTER
export const chapterListDelete = process.env.NEXT_PUBLIC_DELETE_CHAPTER


export const questionSheetCreate = process.env.NEXT_PUBLIC_CREATE_QUESTIONSHEET
export const questionSheetGetAll = process.env.NEXT_PUBLIC_QUESTIONSHEET_GET_ALL  // just overview
export const questionSheetGetById = process.env.NEXT_PUBLIC_QUESTIONSHEET_GET_BY_ID
export const questionSeetGetByQuery = process.env.NEXT_PUBLIC_QUESTIONSHEET_GET_BY_QUERY // single for details by _id
export const questionSheetupdate = process.env.NEXT_PUBLIC_UPDATE_QUESTIONSHEET
export const questionSheetListDelete = process.env.NEXT_PUBLIC_DELETE_QUESTIONSHEET




// questions sheet end here

//  User End Here ===============================================================


export {
    API_URL,

    getSubCategoryByIndentifier,
};