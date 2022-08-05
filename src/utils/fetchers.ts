const RX_API_DOMAIN = 'https://rxnav.nlm.nih.gov';

export const getDrugsByName = (name: string) => () => {
  const params = new URLSearchParams({ name });
  return fetch(`${RX_API_DOMAIN}/REST/drugs.json?${params}`).then((res) =>
    res.json()
  );
};

export const getNDCs = (name: string) => () =>
  fetch(`${RX_API_DOMAIN}/REST/rxcui/${name}/ndcs.json`).then((res) =>
    res.json()
  );

export const getSpellingSuggestions = (name: string) => () => {
  const params = new URLSearchParams({ name });

  return fetch(`${RX_API_DOMAIN}/REST/spellingsuggestions.json?${params}`).then(
    (res) => res.json()
  );
};
