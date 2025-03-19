 
//   headers a set kora userInfo gulo encoded kore rakha hoyeche , jeta ai fucntion er moddhe convert kore return kora hocce  //
export const decodeUserInfo = (encodedUserInfo) => {
    try {
        // Decode the encoded string and parse it as JSON
        const decodedString = decodeURIComponent(encodedUserInfo);
        const decodedObject = JSON.parse(decodedString);

        return decodedObject;
    } catch (error) {
        console.error("❌ Error decoding user info:", error);
        return null;  
    }
};
