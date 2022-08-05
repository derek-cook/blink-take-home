import Link from 'next/link';

type Props = {
  name: string;
};

const DrugItem: React.FC<Props> = ({ name }) => {
  return (
    <Link className="" href={`/drugs/${name}`}>
      <a className="hover:opacity-30">
        <p className="w-full p-2">{name}</p>
      </a>
    </Link>
  );
};

export default DrugItem;
