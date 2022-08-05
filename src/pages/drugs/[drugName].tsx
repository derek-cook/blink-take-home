import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { getDrugsByName, getNDCs } from 'src/utils/fetchers';
import { extractFirstDetails } from 'src/utils/helpers';

const DrugDetail = () => {
  const [drugDetails, setDrugDetails] = useState({
    rxcui: '',
    name: '',
    synonym: '',
  });
  const {
    query: { drugName },
  } = useRouter();

  const getDrugs = useQuery(
    ['drugs', drugName],
    getDrugsByName(drugName as string),
    {
      enabled: !!drugName,
      onSuccess(data) {
        const details = extractFirstDetails(data);
        if (details) setDrugDetails(details);
      },
    }
  );

  const getNDCQuery = useQuery(
    ['ndcs', drugDetails.rxcui],
    getNDCs(drugDetails.rxcui),
    {
      enabled: !!drugDetails.rxcui,
    }
  );

  if (getNDCQuery.isLoading || getDrugs.isLoading) {
    return <p className="flex flex-col items-center">Loading...</p>;
  }

  if (getNDCQuery.isError || getDrugs.isError) {
    return <p className="text-red-700">Something went wrong.</p>;
  }

  return (
    <div id="DrugDetail" className="flex flex-col items-center">
      <button className="p-2 border hover:bg-gray-50">
        <Link href="/drugs/search">Back to Search</Link>
      </button>
      <div className="max-w-md">
        <h1 className="py-2 my-2 text-xl border-b">Drug Details</h1>
        {getDrugs.data && (
          <div className="flex flex-col ">
            <h2 className="flex flex-col justify-between space-x-4 font-bold">
              ID:
            </h2>
            <p className="ml-4">{drugDetails.rxcui}</p>
            <h2 className="flex flex-col justify-between space-x-4 font-bold">
              Name:
            </h2>
            <p className="ml-4">{drugDetails.name}</p>
            <h2 className="flex flex-col justify-between space-x-4 font-bold">
              Synonym:
            </h2>
            <p className="ml-4">{drugDetails.synonym}</p>
          </div>
        )}
        <h2 className="font-bold">Related NDCs:</h2>
        <ul className="ml-4">
          {getNDCQuery.data?.ndcGroup.ndcList.ndc?.map((ndc: string) => (
            <li key={ndc}>{ndc}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DrugDetail;
