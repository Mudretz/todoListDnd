export const isValidString = (text: string) => {
    if (text.trim() === "") {
        return false;
    }
    return true;
};
