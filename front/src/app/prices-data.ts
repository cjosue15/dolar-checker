const API = 'http://localhost:3000';

export type WEB = 'rextie' | 'sunat' | 'kambista' | 'tkambio';

export const fetchPrice = async (web: WEB) => {
  try {
    const response = await fetch(`${API}/${web}`);

    if (!response.ok) {
      throw new Error('Failed to fetch');
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
