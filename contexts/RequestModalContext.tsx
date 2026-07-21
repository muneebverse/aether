'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import RequestModal from '@/components/RequestModal';

type RequestModalContextType = {
  openModal: (prefillService?: string, prefillNote?: string) => void;
  closeModal: () => void;
};

const RequestModalContext = createContext<RequestModalContextType | undefined>(undefined);

export function RequestModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [prefillService, setPrefillService] = useState<string | undefined>(undefined);
  const [prefillNote, setPrefillNote] = useState<string | undefined>(undefined);

  const openModal = (service?: string, note?: string) => {
    setPrefillService(service);
    setPrefillNote(note);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setPrefillService(undefined);
    setPrefillNote(undefined);
  };

  return (
    <RequestModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {isOpen && (
        <RequestModal
          prefillService={prefillService}
          prefillNote={prefillNote}
          onClose={closeModal}
        />
      )}
    </RequestModalContext.Provider>
  );
}

export function useRequestModal() {
  const context = useContext(RequestModalContext);
  if (!context) {
    throw new Error('useRequestModal must be used within a RequestModalProvider');
  }
  return context;
}
