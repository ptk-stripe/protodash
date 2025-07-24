import CancelIcon from '@/components/icons/cancel';
import { useClickaway } from '@/utils/useClickaway';
import React, { useRef } from 'react';
import styles from './FadeableContent.module.css';

interface FadeableContentProps {
  open: boolean;
  onClose: () => void;
  title: React.ReactNode;
  children: React.ReactNode;
  disableClickaway?: boolean;
  className?: string;
  ref?: React.RefObject<HTMLDivElement | null>;
  width?: string;
}

export default function FadeableContent({
  open,
  onClose,
  title,
  children,
  disableClickaway = false,
  className,
  ref: refOverride,
}: FadeableContentProps) {
  const formRef = refOverride || useRef<HTMLDivElement>(null);

  useClickaway(
    formRef,
    () => {
      if (open) {
        onClose();
      }
    },
    !disableClickaway
  );

  return (
    <div
      className={`${styles.dialogContainer} ${
        open ? styles.dialogOpen : styles.dialogClosed
      }`}
    >
      <div
        ref={formRef}
        className={`${styles.dialog} ${open ? '' : styles.dialogClosed} ${className}`}
      >
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label='Close form'
        >
          <CancelIcon />
        </button>
        <div className={styles.formTitle}>{title}</div>
        {children}
      </div>
    </div>
  );
}
