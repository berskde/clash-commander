import { useHttp } from '@inertiajs/react';
import { useCallback, useState } from 'react';
import { qrCode, recoveryCodes, secretKey } from '@/routes/two-factor';
import type { TwoFactorSetupData, TwoFactorSecretKey } from '@/types';

export type UseTwoFactorAuthReturn = {
  qrCodeSvg: string | null;
  manualSetupKey: string | null;
  recoveryCodesList: string[];
  hasSetupData: boolean;
  errors: string[];
  error: string | null;
  isLoading: boolean;
  clearErrors: () => void;
  clearSetupData: () => void;
  clearTwoFactorAuthData: () => void;
  fetchQrCode: () => Promise<void>;
  fetchSetupKey: () => Promise<void>;
  fetchSetupData: () => Promise<void>;
  fetchRecoveryCodes: () => Promise<void>;
};

export const OTP_MAX_LENGTH = 6;

export function useTwoFactorAuth(): UseTwoFactorAuthReturn {
  const { submit } = useHttp();
  const [qrCodeSvg, setQrCodeSvg] = useState<string | null>(null);
  const [manualSetupKey, setManualSetupKey] = useState<string | null>(null);
  const [recoveryCodesList, setRecoveryCodesList] = useState<string[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [pendingRequests, setPendingRequests] = useState(0);

  const clearErrors = useCallback(() => setErrors([]), []);
  const clearSetupData = useCallback(() => {
    setQrCodeSvg(null);
    setManualSetupKey(null);
    setErrors([]);
  }, []);
  const clearTwoFactorAuthData = useCallback(() => {
    clearSetupData();
    setRecoveryCodesList([]);
  }, [clearSetupData]);

  const fetchQrCode = useCallback(async () => {
    setPendingRequests((count) => count + 1);
    try {
      const { svg } = (await submit(qrCode())) as TwoFactorSetupData;
      setQrCodeSvg(svg);
    } catch {
      setQrCodeSvg(null);
      setErrors((previous) => [
        ...previous,
        'Failed to fetch QR code. Please try again.',
      ]);
    } finally {
      setPendingRequests((count) => count - 1);
    }
  }, [submit]);

  const fetchSetupKey = useCallback(async () => {
    setPendingRequests((count) => count + 1);
    try {
      const { secretKey: key } = (await submit(
        secretKey(),
      )) as TwoFactorSecretKey;
      setManualSetupKey(key);
    } catch {
      setManualSetupKey(null);
      setErrors((previous) => [
        ...previous,
        'Failed to fetch setup key. Please try again.',
      ]);
    } finally {
      setPendingRequests((count) => count - 1);
    }
  }, [submit]);

  const fetchSetupData = useCallback(async () => {
    clearSetupData();
    await Promise.all([fetchQrCode(), fetchSetupKey()]);
  }, [clearSetupData, fetchQrCode, fetchSetupKey]);

  const fetchRecoveryCodes = useCallback(async () => {
    setPendingRequests((count) => count + 1);
    setErrors([]);
    setRecoveryCodesList([]);
    try {
      setRecoveryCodesList((await submit(recoveryCodes())) as string[]);
    } catch {
      setErrors((previous) => [
        ...previous,
        'Failed to fetch recovery codes. Please try again.',
      ]);
    } finally {
      setPendingRequests((count) => count - 1);
    }
  }, [submit]);

  return {
    qrCodeSvg,
    manualSetupKey,
    recoveryCodesList,
    hasSetupData: qrCodeSvg !== null && manualSetupKey !== null,
    errors,
    error: errors[0] ?? null,
    isLoading: pendingRequests > 0,
    clearErrors,
    clearSetupData,
    clearTwoFactorAuthData,
    fetchQrCode,
    fetchSetupKey,
    fetchSetupData,
    fetchRecoveryCodes,
  };
}
