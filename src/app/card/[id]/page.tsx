'use client';

import { useState } from 'react';
import { footballCards } from '@/lib/data';
import { Card as CardType } from '@/lib/types';
import { notFound } from 'next/navigation';
import { use } from 'react';
import Link from 'next/link';

export default function CardPage({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
  const params = use(paramsPromise); // Unwrap the params Promise
  const cardId = parseInt(params.id, 10);
  const card = footballCards.find(c => c.id === cardId);

  if (!card) {
    notFound(); // Handle invalid card ID
  }

  const [cards, setCards] = useState<CardType[]>(footballCards);

  // Toggle ownership status of a parallel
  const toggleParallelOwnership = (parallelId: number) => {
    setCards(cards.map(c => {
      if (c.id === cardId) {
        return {
          ...c,
          parallels: c.parallels.map(parallel =>
            parallel.id === parallelId ? { ...parallel, owned: !parallel.owned } : parallel
          ),
        };
      }
      return c;
    }));
  };

  // Use the updated card from state
  const updatedCard = cards.find(c => c.id === cardId)!;
  const ownedCount = updatedCard.parallels.filter(p => p.owned).length;
  const totalCount = updatedCard.parallels.length;
  const progress = `${ownedCount}/${totalCount} parallels collected (${((ownedCount / totalCount) * 100).toFixed(1)}%)`;

  // Calculate total cost of owned parallels
  const totalCost = updatedCard.parallels
    .filter(p => p.owned && p.purchasePrice !== undefined)
    .reduce((sum, p) => sum + (p.purchasePrice || 0), 0)
    .toFixed(2);

  return (
    <main className="max-w-4xl mx-auto p-4">
      <Link href="/">
        <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
          Back to Cards
        </button>
      </Link>
      <h1 className="text-3xl font-bold mb-4">{updatedCard.set} - #{updatedCard.number} {updatedCard.player}</h1>
      <div className="mb-4">
        <p className="text-lg">{progress}</p>
        <p className="text-lg">Total Cost of Owned Parallels: ${totalCost}</p>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 text-left">Parallel</th>
            <th className="p-2 text-left">Numbered</th>
            <th className="p-2 text-left">Owned</th>
            <th className="p-2 text-left">Purchase Price</th>
            <th className="p-2 text-left">Purchase Date</th>
            <th className="p-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {updatedCard.parallels.map(parallel => (
            <tr key={parallel.id} className="border-b">
              <td className="p-2">{parallel.name}</td>
              <td className="p-2">
                {parallel.numbered !== undefined && parallel.numbered !== null
                  ? `/${parallel.numbered}`
                  : '-'}
              </td>
              <td className="p-2">
                <span className={parallel.owned ? 'text-green-600' : 'text-red-600'}>
                  {parallel.owned ? 'Yes' : 'No'}
                </span>
              </td>
              <td className="p-2">
                {parallel.purchasePrice !== undefined
                  ? `$${parallel.purchasePrice.toFixed(2)}`
                  : '-'}
              </td>
              <td className="p-2">
                {parallel.purchaseDate
                  ? parallel.purchaseDate.toLocaleDateString()
                  : '-'}
              </td>
              <td className="p-2">
                <button
                  onClick={() => toggleParallelOwnership(parallel.id)}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  {parallel.owned ? 'Remove' : 'Add'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}