type DrugDetails = {
  rxcui: string;
  name: string;
  synonym: string;
};

type DrugResults = {
  drugGroup: {
    conceptGroup: [
      {
        conceptProperties: [DrugDetails];
      }
    ];
  };
};

export const extractFirstDetails = (
  drug: DrugResults
): DrugDetails | undefined => {
  // Since this data is sometimes missing properties I'd use zod or something to validate the required fields if I had more time
  return drug.drugGroup.conceptGroup.find((group) => !!group.conceptProperties)
    ?.conceptProperties[0];
};

export const extractManyDrugs = (drug: DrugResults): DrugDetails[] => {
  return drug.drugGroup.conceptGroup
    .map((group) => group.conceptProperties)
    .flat();
};
