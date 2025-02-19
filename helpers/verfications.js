export const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
};

 export const validatePhone = (phone) => {
    const phoneRegex = /^(?:\+?88)?01[3-9]\d{8}$/;
    return phoneRegex.test(phone);
};