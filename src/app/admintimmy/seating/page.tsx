'use client';

import { useEffect, useState } from 'react';
import { RSVP } from '@/lib/supabase';
import { getSeatingChart, getRSVPs, updateRSVPSeating } from '@/lib/rsvp';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DroppableProvided,
  DraggableProvided,
  DroppableStateSnapshot,
  DraggableStateSnapshot,
  DropResult,
} from '@hello-pangea/dnd';

interface SeatingColumns {
  [tableNumber: string]: RSVP[];
}

const TABLE_COUNT = 10;
const UNASSIGNED = 'unassigned';

export default function AdminSeatingPage() {
  const [columns, setColumns] = useState<SeatingColumns>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [syncing, setSyncing] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('wedding_auth_user');
    setIsAuthenticated(!!stored);
    fetchSeatingColumns();
  }, []);

  async function fetchSeatingColumns() {
    try {
      setLoading(true);
      const [allRSVPs, seatingChart] = await Promise.all([
        getRSVPs(),
        getSeatingChart(),
      ]);
      // Fill in assigned tables
      const newColumns: SeatingColumns = {};
      for (let i = 1; i <= TABLE_COUNT; ++i)
        newColumns[i] = seatingChart[i] || [];
      // Find unassigned RSVPs (no table or seat)
      const assignedIds = Object.values(seatingChart)
        .flat()
        .map(r => r.id);
      newColumns[UNASSIGNED] = allRSVPs.filter(
        rsvp => !assignedIds.includes(rsvp.id)
      );
      setColumns(newColumns);
    } catch (err) {
      setError('Failed to load RSVPs');
      console.error('Error fetching RSVPs:', err);
    } finally {
      setLoading(false);
    }
  }

  const onDragEnd = async (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }
    setSyncing(true);
    // Find the RSVP being moved
    const rsvp = columns[source.droppableId][source.index];
    // Remove from source
    const newSource = Array.from(columns[source.droppableId]);
    newSource.splice(source.index, 1);
    // Insert into destination
    const newDest = Array.from(columns[destination.droppableId]);
    newDest.splice(destination.index, 0, rsvp);
    // Build new columns
    const newColumns = { ...columns };
    newColumns[source.droppableId] = newSource;
    newColumns[destination.droppableId] = newDest;
    setColumns(newColumns);
    // Update backend for all guests in destination column
    if (destination.droppableId === UNASSIGNED) {
      await updateRSVPSeating(rsvp.id, null, null);
    } else {
      for (let i = 0; i < newDest.length; ++i) {
        const guest = newDest[i];
        const newTable = parseInt(destination.droppableId);
        const newSeat = i + 1;
        if (guest.table !== newTable || guest.seat !== newSeat) {
          await updateRSVPSeating(guest.id, newTable, newSeat);
        }
      }
    }
    if (
      source.droppableId !== destination.droppableId &&
      source.droppableId !== UNASSIGNED
    ) {
      const srcArr = newColumns[source.droppableId];
      for (let i = 0; i < srcArr.length; ++i) {
        const guest = srcArr[i];
        const newTable = parseInt(source.droppableId);
        const newSeat = i + 1;
        if (guest.table !== newTable || guest.seat !== newSeat) {
          await updateRSVPSeating(guest.id, newTable, newSeat);
        }
      }
    }
    // Re-fetch from backend to sync
    await fetchSeatingColumns();
    setSyncing(false);
  };

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
          Drag and drop guests to assign tables and seats
        </p>
      </div>
      <DragDropContext
        onDragEnd={
          syncing
            ? () => {
                /* Disabled during sync */
              }
            : onDragEnd
        }
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
          {/* Table columns */}
          {Array.from({ length: TABLE_COUNT }, (_, i) => i + 1).map(
            tableNum => (
              <Droppable droppableId={tableNum.toString()} key={tableNum}>
                {(
                  provided: DroppableProvided,
                  snapshot: DroppableStateSnapshot
                ) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`min-h-[300px] bg-white/80 border-rose-200 border rounded-xl shadow p-4 flex flex-col ${snapshot.isDraggingOver ? 'ring-2 ring-rose-400' : ''}`}
                  >
                    <div className="text-lg font-bold text-rose-600 text-center mb-2">
                      Table {tableNum}
                    </div>
                    {columns[tableNum]?.map((rsvp, idx) => (
                      <Draggable
                        key={rsvp.id}
                        draggableId={rsvp.id.toString()}
                        index={idx}
                      >
                        {(
                          provided: DraggableProvided,
                          snapshot: DraggableStateSnapshot
                        ) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`mb-3 p-3 bg-rose-50 rounded-lg border border-rose-100 flex flex-col shadow-sm ${snapshot.isDragging ? 'ring-2 ring-rose-400' : ''}`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-medium text-gray-800">
                                {rsvp.first_name} {rsvp.last_name}
                              </span>
                              <span className="inline-flex items-center justify-center w-8 h-8 bg-rose-500 text-white text-sm font-bold rounded-full ml-2">
                                {idx + 1}
                              </span>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            )
          )}
          {/* Unassigned column */}
          <Droppable droppableId={UNASSIGNED}>
            {(
              provided: DroppableProvided,
              snapshot: DroppableStateSnapshot
            ) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`min-h-[300px] bg-white/80 border-rose-200 border rounded-xl shadow p-4 flex flex-col ${snapshot.isDraggingOver ? 'ring-2 ring-rose-400' : ''}`}
              >
                <div className="text-lg font-bold text-gray-700 text-center mb-2">
                  Unassigned
                </div>
                {columns[UNASSIGNED]?.map((rsvp, idx) => (
                  <Draggable
                    key={rsvp.id}
                    draggableId={rsvp.id.toString()}
                    index={idx}
                  >
                    {(
                      provided: DraggableProvided,
                      snapshot: DraggableStateSnapshot
                    ) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`mb-3 p-3 bg-rose-50 rounded-lg border border-rose-100 flex flex-col shadow-sm ${snapshot.isDragging ? 'ring-2 ring-rose-400' : ''}`}
                      >
                        <span className="font-medium text-gray-800">
                          {rsvp.first_name} {rsvp.last_name}
                        </span>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500">
          Total RSVPs: {Object.values(columns).flat().length}
        </p>
      </div>
      {syncing && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 shadow-lg flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500 mb-4"></div>
            <p className="text-gray-700 font-medium">
              Syncing seating assignments...
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
