export function extractErrorMessage(error) {
    return error.response?.data?.message || error.message || error.toString();
}

export function createAuthConfig(token) {
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
}
