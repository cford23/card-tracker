'use client';

import { footballCards } from '@/lib/data';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Football Card Rainbow Completion Progress</h1>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 text-left"></th>
            <th className="p-2 text-left">Card</th>
            <th className="p-2 text-left">Progress</th>
          </tr>
        </thead>
        <tbody>
          {footballCards.map(card => {
            // Calculate progress for each card
            const ownedCount = card.parallels.filter(p => p.owned).length;
            const totalCount = card.parallels.length;
            const progress = `${ownedCount}/${totalCount} (${((ownedCount / totalCount) * 100).toFixed(1)}%)`;

            return (
              <tr key={card.id} className="border-b">
                <td className="p-2">
                  <Link href={`/card/${card.id}`}>
                    <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                      View Parallels
                    </button>
                  </Link>
                </td>
                <td className="p-2">
                  {card.set} - #{card.number} {card.player}
                </td>
                <td className="p-2">{progress}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}