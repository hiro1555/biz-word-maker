import { useMutation } from '@tanstack/react-query';

function sendJson(data) {
    return fetch('${process.env.REACT_APP_API_URL}/generate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(res => {
        if (!res.ok) throw new Error('Server error');
        return res.json();
    });
}

export function useSendJson() {
    return useMutation({
        mutationFn: sendJson
    });
}

