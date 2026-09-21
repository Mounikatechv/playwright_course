function validateLoginData(user) {
    if (user.email && user.password) {
        return true;
    } else {
        return false;
    }
}

module.exports = { validateLoginData };