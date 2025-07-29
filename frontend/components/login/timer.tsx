"use client";

import { useEffect, useState } from "react";

interface TimerProps {
  loading: boolean;
  otpTimeout: boolean;
  handleResend: () => void;
  setOtpTimeout: (otpTimeout: boolean) => void;
}

const Timer: React.FC<TimerProps> = ({
  loading,
  otpTimeout,
  setOtpTimeout,
  handleResend,
}) => {
  const [seconds, setSeconds] = useState(60);

  useEffect(() => {
    if (otpTimeout) {
      const interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else {
          setOtpTimeout(false);
          setSeconds(60);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [otpTimeout, seconds, setOtpTimeout]);

  return (
    <button
      type="button"
      className="btn btn-outline-secondary w-100 mt-2"
      onClick={handleResend}
      disabled={otpTimeout || loading}
    >
      {otpTimeout ? (
        <span>
          <i className="fa fa-clock me-2"></i>
          Resend OTP in {seconds}s
        </span>
      ) : (
        "Resend OTP"
      )}
    </button>
  );
};

export default Timer;
