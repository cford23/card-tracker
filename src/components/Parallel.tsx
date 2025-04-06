'use client';

import { Parallel as ParallelType } from "@/lib/types";

type ParallelProps = {
  parallel: ParallelType;
  onToggleOwnership: () => void;
};

export default function Parallel({ parallel, onToggleOwnership }: ParallelProps) {
  return (
    <li
      className={`p-2 rounded flex justify-between items-center ${parallel.owned ? 'bg-green-100' : 'bg-gray-100'}`}
    >
      <span className="text-blue-900">
        {parallel.name}
        {parallel.numbered !== undefined && parallel.numbered !== null
          ? ` (#/${parallel.numbered})`
          : ''}
      </span>
      <button
        onClick={onToggleOwnership}
        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        {parallel.owned ? 'Remove' : 'Add'}
      </button>
    </li>
  );
}