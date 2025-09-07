const errs = {
    "Error: Identity with email already exists": "Account already exists. Please switch to Login mode or use a different mobile number.",
    "Error: Invalid email or password": "Invalid mobile number or password.",
}

export const errorHandling = (error: string) => {
    if (errs[error]) {
        return errs[error];
    }
    return error;
};