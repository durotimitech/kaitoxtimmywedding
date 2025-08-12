'use client';

import { useAuth } from '@/contexts/auth-context';
import { AttendanceUpdateModal } from '@/components/ui/attendance-update-modal';

export function AttendanceModalHandler() {
  const { showAttendanceModal, closeAttendanceModal } = useAuth();

  return (
    <AttendanceUpdateModal
      isOpen={showAttendanceModal}
      onClose={closeAttendanceModal}
    />
  );
}
