chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'sendAPIRequest') {
        fetch(request.url, {
            method: request.method,
            headers: request.headers,
            body: JSON.stringify(request.body)
        })
        .then(response => response.json())
        .then(data => sendResponse(data))
        .catch(error => sendResponse({ error: error.message }));

        return true; // Ensure that the response is sent asynchronously
    } else if (request.action === 'sendResponse') {
        const response = request.response;
        // Xử lý kết quả từ trang web
        console.log(response);
        // Gửi kết quả trả về cho trang web (nếu cần)
        sendResponse('Received response successfully!');
    }
});