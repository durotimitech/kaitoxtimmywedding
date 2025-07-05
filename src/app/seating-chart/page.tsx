'use client';

import { useEffect, useState } from 'react';
import { getSeatingChart } from '@/lib/rsvp';
import { RSVP } from '@/lib/supabase';
import { Card, CardContent } from '@/components/ui/card';
import { Search } from 'lucide-react';

interface SeatingChartData {
  [tableNumber: number]: RSVP[];
}

export default function SeatingChartPage() {
  const [seatingChart, setSeatingChart] = useState<SeatingChartData>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchSeatingChart = async () => {
      try {
        setLoading(true);
        const data = await getSeatingChart();
        setSeatingChart(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to load seating chart'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSeatingChart();
  }, []);

  const tableNumbers = Object.keys(seatingChart)
    .map(Number)
    .sort((a, b) => a - b);

  // Filtered seating chart based on search
  const filteredChart: SeatingChartData = {};
  if (search.trim() !== '') {
    const q = search.trim().toLowerCase();
    for (const tableNum of tableNumbers) {
      const matches = seatingChart[tableNum].filter(
        rsvp =>
          (rsvp.first_name || '').toLowerCase().includes(q) ||
          (rsvp.last_name || '').toLowerCase().includes(q)
      );
      if (matches.length > 0) {
        filteredChart[tableNum] = matches;
      }
    }
  }

  // If no search results, show all RSVPs
  const displayChart =
    search.trim() === '' || Object.keys(filteredChart).length > 0
      ? search.trim() === ''
        ? seatingChart
        : filteredChart
      : seatingChart;
  const displayTableNumbers = Object.keys(displayChart)
    .map(Number)
    .sort((a, b) => a - b);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-50 to-pink-200 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-xl">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading seating chart...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-50 to-pink-200 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-xl">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors"
              >
                Try Again
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (displayTableNumbers.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-50 to-pink-200 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-xl">
          <CardContent className="pt-6">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                Seating Chart
              </h2>
              <p className="text-gray-600">
                {search.trim()
                  ? 'No results found.'
                  : 'No seating assignments have been made yet.'}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-50 to-pink-200 p-4 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1
            className="text-5xl font-extrabold text-gray-800 mb-2 tracking-tight"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Seating Chart
          </h1>
          <p className="text-lg text-gray-500 mb-6">
            Find your assigned table and seat
          </p>
          <div className="flex justify-center">
            <div className="relative w-full max-w-md">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Search size={20} />
              </span>
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search your name..."
                className="w-full pl-10 pr-4 py-2 border border-rose-200 rounded-full focus:outline-none focus:ring-2 focus:ring-rose-400 text-lg shadow-sm bg-white/80 transition"
                style={{ fontFamily: 'inherit' }}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {displayTableNumbers.map(tableNumber => (
            <div
              key={tableNumber}
              className="rounded-3xl shadow-xl bg-white/90 border border-rose-100 p-6 flex flex-col items-stretch transition hover:shadow-2xl"
            >
              <div className="mb-6">
                <h2
                  className="text-3xl font-bold text-rose-600 text-center tracking-tight mb-1"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  Table {tableNumber}
                </h2>
              </div>
              <div className="flex-1 space-y-4">
                {displayChart[tableNumber].map(rsvp => (
                  <div
                    key={rsvp.id}
                    className="flex justify-between items-center p-4 bg-rose-50 rounded-2xl border border-rose-100 shadow-sm hover:bg-rose-100 transition group"
                  >
                    <div className="flex-1">
                      <p
                        className="font-semibold text-gray-800 text-lg group-hover:text-rose-600 transition"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        {rsvp.first_name} {rsvp.last_name}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-br from-rose-500 to-pink-400 text-white text-lg font-bold rounded-full shadow-md border-2 border-white">
                        {rsvp.seat}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t border-rose-100">
                <p className="text-base text-gray-500 text-center">
                  {displayChart[tableNumber].length} guest
                  {displayChart[tableNumber].length !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-lg text-gray-600 font-medium">
            Total guests with seating assignments:{' '}
            {Object.values(displayChart).flat().length}
          </p>
        </div>
      </div>
    </div>
  );
}
