export default {
    fail: { message: "Failed", code: 400 },
    credentials: { message: "Invalid Credentials", code: 401 },
    authentication: { message: "Unathenticated", code: 401 },
    authorization: { message: "Unauthorized, not allowed", code: 403 },
    notFound: (payload) => { return { message: `${payload} not found`, code: 404 } }
}