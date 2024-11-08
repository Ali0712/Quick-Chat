const httpResponse = {
    
    successResponse: (res, data, status = 200) => {
        return res.status(status).json({ success: true, data });
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
    }
};

export default httpResponse;
