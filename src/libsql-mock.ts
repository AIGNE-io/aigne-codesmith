// Mock for @libsql/client to avoid native dependency issues in GitHub Actions
export const createClient = () => {
  console.warn('LibSQL client is mocked in GitHub Actions environment');
  return {
    execute: () => Promise.resolve({ rows: [], columns: [] }),
    batch: () => Promise.resolve([]),
    close: () => Promise.resolve()
  };
};

export default { createClient };