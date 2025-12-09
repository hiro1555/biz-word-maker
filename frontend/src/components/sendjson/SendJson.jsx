import { useMutation } from '@tanstack/react-query';

function sendJson(data) {
  const base = process.env.REACT_APP_API_URL || 'http://localhost:8000';
  return fetch(`${base}/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(res => {
    if (!res.ok) throw new Error(`Server error ${res.status}`);
    return res.json();
  });
}

export function useSendJson() {
    return useMutation({
        mutationFn: sendJson
    });
}

