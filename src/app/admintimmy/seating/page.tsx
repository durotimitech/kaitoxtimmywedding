'use client';

import { useEffect, useState, useRef } from 'react';
import { RSVP } from '@/lib/supabase';
import { getRSVPs, updateRSVPSeating } from '@/lib/rsvp';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface EditState {
  table: string;
  seat: string;
  saving: boolean;
}

export default function AdminSeatingPage() {
  const [rsvps, setRsvps] = useState<RSVP[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [editStates, setEditStates] = useState<Record<number, EditState>>({});
  const isMounted = useRef(true);
  const editStatesRef = useRef(editStates);

  useEffect(() => {
    isMounted.current = true;
    const stored = localStorage.getItem('wedding_auth_user');
    setIsAuthenticated(!!stored);
    fetchRSVPs();
    editStatesRef.current = editStates;
    return () => {
      isMounted.current = false;
    };
    // eslint-disable-next-line
  }, []);

  async function fetchRSVPs() {
    try {
      setLoading(true);
      const data = await getRSVPs();
      setRsvps(data);
      // Initialize edit states
      const initialEditStates: Record<number, EditState> = {};
      data.forEach(rsvp => {
        initialEditStates[rsvp.id] = {
          table: rsvp.table?.toString() || '',
          seat: rsvp.seat?.toString() || '',
          saving: false,
        };
      });
      setEditStates(initialEditStates);
    } catch (err) {
      setError('Failed to load RSVPs');
      console.error('Error fetching RSVPs:', err);
    } finally {
      setLoading(false);
    }
  }

  function handleInputChange(
    rsvpId: number,
    field: 'table' | 'seat',
    value: string
  ) {
    setEditStates(prev => {
      const prevState = prev[rsvpId] || { table: '', seat: '', saving: false };
      return {
        ...prev,
        [rsvpId]: { ...prevState, [field]: value },
      };
    });
  }

  async function handleSave(rsvpId: number) {
    setEditStates(prev => ({
      ...prev,
      [rsvpId]: { ...prev[rsvpId], saving: true },
    }));
    const { table = '', seat = '' } = editStates[rsvpId] || {};
    const tableNum = parseInt(table);
    const seatNum = parseInt(seat);
    if (isNaN(tableNum) || isNaN(seatNum)) {
      setEditStates(prev => ({
        ...prev,
        [rsvpId]: { ...prev[rsvpId], saving: false },
      }));
      alert('Invalid table or seat number');
      return;
    }
    try {
      await updateRSVPSeating(rsvpId, tableNum, seatNum);
      if (isMounted.current) {
        setRsvps(prev =>
          prev.map(rsvp =>
            rsvp.id === rsvpId
              ? { ...rsvp, table: tableNum, seat: seatNum }
              : rsvp
          )
        );
      }
    } catch (err) {
      alert('Failed to update seating assignment');
      console.error('Error updating seating:', err);
    } finally {
      if (isMounted.current) {
        setEditStates(prev => ({
          ...prev,
          [rsvpId]: { ...prev[rsvpId], saving: false },
        }));
      }
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Access Denied
          </h1>
          <p className="text-gray-600">Please log in to access this page.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500 mb-4"></div>
          <p className="text-gray-600">Loading RSVPs...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Seating Management
        </h1>
        <p className="text-lg text-gray-600">
          Assign table and seat numbers to RSVPs
        </p>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>RSVP List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Name
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Email
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Table
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Seat
                  </th>
                </tr>
              </thead>
              <tbody>
                {rsvps.map(rsvp => (
                  <tr key={rsvp.id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2">
                      {rsvp.first_name} {rsvp.last_name}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {rsvp.email}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <Input
                        type="number"
                        value={editStates[rsvp.id]?.table || ''}
                        onChange={e =>
                          handleInputChange(rsvp.id, 'table', e.target.value)
                        }
                        placeholder="Table #"
                        className="w-20"
                        min={1}
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          value={editStates[rsvp.id]?.seat || ''}
                          onChange={e =>
                            handleInputChange(rsvp.id, 'seat', e.target.value)
                          }
                          placeholder="Seat #"
                          className="w-20"
                          min={1}
                        />
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => handleSave(rsvp.id)}
                          disabled={editStates[rsvp.id]?.saving}
                        >
                          {editStates[rsvp.id]?.saving ? 'Saving…' : 'Save'}
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500">
          Total RSVPs: {rsvps.length} | Assigned seating:{' '}
          {rsvps.filter(r => r.table && r.seat).length}
        </p>
      </div>
    </div>
  );
}
