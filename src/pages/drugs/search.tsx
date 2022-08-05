import { ChangeEventHandler, MouseEventHandler, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import DrugItem from 'src/components/DrugItem';
import { getDrugsByName, getSpellingSuggestions } from 'src/utils/fetchers';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

  const getDrugs = useQuery(['drugs', searchTerm], getDrugsByName(searchTerm), {
    enabled: false,
    onSuccess(data) {
      if (data.drugGroup.conceptGroup) {
        // match found
        setSearchResults([searchTerm]);
      } else {
        // successful, but no exact match.
        getSpellingSuggestion.refetch();
      }
    },
    onError(err: Error) {
      setErrorMessage(err.message);
    },
  });

  const getSpellingSuggestion = useQuery(
    ['spelling', searchTerm],
    getSpellingSuggestions(searchTerm),
    {
      enabled: false,
      onSuccess(data) {
        if (data.suggestionGroup.suggestionList.suggestion) {
          // found possible matches
          setSearchResults(data.suggestionGroup.suggestionList.suggestion);
        } else {
          // no matches
          setErrorMessage('No matches found.');
          setSearchResults([]);
        }
      },
      onError(err: Error) {
        setErrorMessage(err.message);
      },
    }
  );

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch: MouseEventHandler = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSearchResults([]);
    getDrugs.refetch();
  };

  const isLoading = getDrugs.isFetching || getSpellingSuggestion.isFetching;
  let status = null;
  if (isLoading) {
    status = <p>Searching...</p>;
  } else if (errorMessage) {
    status = <p className="text-red-700">{errorMessage}</p>;
  }

  return (
    <div id="Search" className="flex flex-col items-center">
      <div className="max-w-md">
        <h1>Search Drugs by Name</h1>
        <form className="flex space-x-2">
          <input
            name="drug"
            className="p-2 border"
            placeholder="drug name"
            onChange={handleChange}
            value={searchTerm}
          />
          <button
            type="submit"
            className="p-2 border"
            title="search"
            onClick={handleSearch}
          >
            Search
          </button>
        </form>
        {status}
        <ul className="divide-y">
          {searchResults.map((drugName: string) => (
            <li key={drugName} className="bg-gray-100 dark:bg-gray-900">
              <DrugItem name={drugName} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Search;
