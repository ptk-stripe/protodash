'use client';

import React, { useEffect, useRef } from 'react';
import { useSailUI } from '@/contexts/SailUIContext';

// Main Dialog component
interface SailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  maxWidth?: string | number; // NEW: allow overriding maxWidth
  width?: string | number;    // NEW: allow overriding width
}

export function SailDialog({
  open,
  onOpenChange,
  title,
  children,
  footer,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  maxWidth = '500px', // default value
  width = '90%',      // default value
}: SailDialogProps) {
  const { sailComponents } = useSailUI();
  const dialogRef = useRef<HTMLDivElement>(null);

  // Create styled components using Sail UI context
  const { createView } = sailComponents || {};

  // Handle escape key
  useEffect(() => {
    if (!open || !closeOnEscape) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onOpenChange(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [open, closeOnEscape, onOpenChange]);

  // Handle focus management
  useEffect(() => {
    if (open && dialogRef.current) {
      // Focus the dialog content
      const focusableElement = dialogRef.current.querySelector(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      ) as HTMLElement;
      if (focusableElement) {
        focusableElement.focus();
      }
    }
  }, [open]);

  if (!open || !createView) return null;

  // Create styled components
  const DialogOverlay = createView('div', {
    css: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
    },
  });

  const DialogContent = createView('div', {
    css: {
      backgroundColor: 'background',
      borderRadius: 'large',
      maxWidth: maxWidth,
      width: width,
      maxHeight: '80vh',
      overflow: 'hidden',
      stack: 'y',
      boxShadow: 'large',
    },
  });

  const DialogHeader = createView('div', {
    css: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '16px',
    },
  });

  const DialogTitle = createView('h2', {
    css: {
      fontSize: 'large',
      fontWeight: 'semibold',
      color: 'default',
      margin: 0,
    },
  });

  const DialogCloseButton = createView('button', {
    css: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: '0',
      borderRadius: '4px',
      color: '#6b7280',
      fontSize: '20px',
      fontWeight: 'normal',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '32px',
      height: '32px',
      transition: 'all 0.2s ease',
      ':hover': {
        backgroundColor: '#f3f4f6',
        color: '#374151',
      },
      ':focus': {
        outline: '2px solid',
        outlineColor: '#3b82f6',
        outlineOffset: '2px',
      },
    },
  });

  const DialogBody = createView('div', {
    css: {
      padding: 'large',
      flex: 1,
      overflow: 'auto',
    },
  });

  const DialogFooter = createView('div', {
    css: {
      stack: 'x',
      alignX: 'end',
      gap: 'medium',
      padding: 'large',
      paddingTop: 'medium',
    },
  });

  const handleOverlayClick = (event: React.MouseEvent) => {
    if (closeOnOverlayClick && event.target === event.currentTarget) {
      onOpenChange(false);
    }
  };

  const handleClose = () => {
    onOpenChange(false);
  };

  // Create DialogBody with conditional padding
  const DialogBodyWithPadding = createView('div', {
    css: {
      padding: '16px',
      paddingTop: title ? '8px' : '16px',
      flex: 1,
      overflow: 'auto',
    },
  });

  return (
    <DialogOverlay onClick={handleOverlayClick}>
      <DialogContent ref={dialogRef} onClick={(e: React.MouseEvent) => e.stopPropagation()}>
        {title && (
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogCloseButton onClick={handleClose} aria-label="Close dialog">
              ×
            </DialogCloseButton>
          </DialogHeader>
        )}
        <DialogBodyWithPadding>{children}</DialogBodyWithPadding>
        {footer && <DialogFooter>{footer}</DialogFooter>}
      </DialogContent>
    </DialogOverlay>
  );
}

// Convenience components for common patterns
export function SailDialogTrigger({
  children,
  title,
  footer,
  closeOnOverlayClick = true,
  closeOnEscape = true,
}: {
  children: React.ReactNode;
  title?: string;
  footer?: React.ReactNode;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <div onClick={() => setOpen(true)}>{children}</div>
      <SailDialog 
        open={open} 
        onOpenChange={setOpen}
        title={title}
        footer={footer}
        closeOnOverlayClick={closeOnOverlayClick}
        closeOnEscape={closeOnEscape}
      />
    </>
  );
} 