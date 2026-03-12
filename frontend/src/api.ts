const API_BASE_URL = 'http://localhost:5000';

export async function uploadDocuments(formData: FormData) {
  // Extract fields if they are explicitly passed, otherwise assume they are already in formData
  const response = await fetch(`${API_BASE_URL}/upload-documents`, {
    method: 'POST',
    body: formData,
  });
  if (!response.ok) {
    throw new Error('Failed to upload documents');
  }
  return response.json();
}

export async function analyzeCredit(sessionId: string, loanAmount: number = 2.0) {
  const response = await fetch(`${API_BASE_URL}/analyze`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ 
      session_id: sessionId,
      loan_amount: loanAmount 
    }),
  });
  if (!response.ok) {
    throw new Error('Failed to analyze credit');
  }
  return response.json();
}

export async function queryAI(sessionId: string, query: string) {
  const response = await fetch(`${API_BASE_URL}/ai-query`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ session_id: sessionId, query }),
  });
  if (!response.ok) {
    throw new Error('Failed to query AI');
  }
  return response.json();
}
export async function getDashboardSummary() {
  const response = await fetch(`${API_BASE_URL}/dashboard-summary`);
  if (!response.ok) {
    throw new Error('Failed to fetch dashboard summary');
  }
  return response.json();
}

export async function getAnalysisHistory() {
  const response = await fetch(`${API_BASE_URL}/history`);
  if (!response.ok) {
    throw new Error('Failed to fetch analysis history');
  }
  return response.json();
}
