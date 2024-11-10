const httpResponse = {

    successResponse: (res, data, message, status = 200) => {
        return res.status(status).json({ success: true, data, message });
    },
    
    errorResponse: (res, message, status = 500) => {
        return res.status(status).json({ success: false, message });
    },
    
    notFoundResponse: (res, message = 'Not Found') => {
        return res.status(404).json({ success: false, message });
    },
    
    unauthorizedResponse: (res, message = 'Unauthorized') => {
        return res.status(401).json({ success: false, message });
    },
    
    badRequestResponse: (res, message = 'Bad Request') => {
        return res.status(400).json({ success: false, message });
    },
    
    forbiddenResponse: (res, message = 'Forbidden') => {
        return res.status(403).json({ success: false, message });
    },
    
    conflictResponse: (res, message = 'Conflict') => {
        return res.status(409).json({ success: false, message });
    },

    loginResponse: (res, cookie, data, message, status = 200) => {
        return res.status(status).cookie("token", cookie, {
            httpOnly: true,
            secure: true,
        }).json({ success: true, data, message });
    },

    logoutResponse: (res, message, status = 200) => {
        return res.status(status).clearCookie("token").json({ success: true, message });
    }
};

export default httpResponse;
