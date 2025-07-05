'use client';

import { useEffect, useState } from 'react';
import { getSeatingChart } from '@/lib/rsvp';
import { RSVP } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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

  const displayChart = search.trim() === '' ? seatingChart : filteredChart;
  const displayTableNumbers = Object.keys(displayChart)
    .map(Number)
    .sort((a, b) => a - b);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
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
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
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
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
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
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Seating Chart
          </h1>
          <p className="text-gray-600 mb-4">
            Find your assigned table and seat
          </p>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search your name..."
            className="w-full max-w-md px-4 py-2 border border-rose-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400 text-lg shadow-sm"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayTableNumbers.map(tableNumber => (
            <Card
              key={tableNumber}
              className="bg-white/80 backdrop-blur-sm border-rose-200"
            >
              <CardHeader className="pb-3">
                <CardTitle className="text-2xl font-bold text-rose-600 text-center">
                  Table {tableNumber}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {displayChart[tableNumber].map(rsvp => (
                    <div
                      key={rsvp.id}
                      className="flex justify-between items-center p-3 bg-rose-50 rounded-lg border border-rose-100"
                    >
                      <div className="flex-1">
                        <p className="font-medium text-gray-800">
                          {rsvp.first_name} {rsvp.last_name}
                        </p>
                        {rsvp.email && (
                          <p className="text-sm text-gray-600">{rsvp.email}</p>
                        )}
                      </div>
                      <div className="text-right">
                        <span className="inline-flex items-center justify-center w-8 h-8 bg-rose-500 text-white text-sm font-bold rounded-full">
                          {rsvp.seat}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-3 border-t border-rose-200">
                  <p className="text-sm text-gray-600 text-center">
                    {displayChart[tableNumber].length} guest
                    {displayChart[tableNumber].length !== 1 ? 's' : ''}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Total guests with seating assignments:{' '}
            {Object.values(displayChart).flat().length}
          </p>
        </div>
      </div>
    </div>
  );
}
