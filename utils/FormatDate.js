
export const formatDate = (dateString) => {
    if (!dateString) return "";

    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
};



//  eta suhdu form er date update er somoy kaj korbe
export const formatDateForForm = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toISOString().split("T")[0];
};