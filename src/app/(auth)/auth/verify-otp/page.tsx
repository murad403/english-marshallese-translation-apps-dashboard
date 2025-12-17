"use client"
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'

const VerifyOtp = () => {
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const router = useRouter();
    const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
    const [otpError, setOtpError] = useState<string>("");

    const [timeLeft, setTimeLeft] = useState<number>(30);

    useEffect(() => {
        if (timeLeft <= 0) return;
        const timer = setInterval(() => {
            setTimeLeft((t) => t - 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);
    // console.log(timeLeft)

    const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (!/^\d*$/.test(value)) return;

        setOtp((prev) => {
            const newOtp = [...prev];
            newOtp[index] = value.slice(-1);
            return newOtp;
        });
        setOtpError("");

        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !e.currentTarget.value && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const onsubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const originalOtp = otp.join("");
        const emptyIndex = otp.findIndex(digit => digit === "");
        if (emptyIndex !== -1) {
            setOtpError("Please fill all OTP fields");
            inputRefs.current[emptyIndex]?.focus();
            return;
        }
        console.log("Submitted OTP:", originalOtp);
        router.push('/auth/reset-password')
    };

    const handleResendCode = () => {
        console.log("Resend code clicked");
        setTimeLeft(30);
    }
    return (
        <div className='w-full md:w-[50%] bg-main md:p-20 p-5 rounded-lg'>
            <form className='w-full space-y-5' onSubmit={onsubmit}>
                <h2 className='text-header text-heading text-center'>Verify Email</h2>
                <div className='flex md:justify-center justify-between md:gap-3 mb-4'>
                    {otp.map((digit, i) => (
                        <input
                            key={i}
                            type="text"
                            maxLength={1}
                            value={digit}
                            className="md:size-17.5 size-14 text-center border-2 rounded-full text-2xl font-bold  text-main transition-all bg-[#9CB4E6]"
                            ref={(el) => { inputRefs.current[i] = el; }}
                            onChange={(e) => handleChange(i, e)}
                            onKeyDown={(e) => handleKeyDown(i, e)}
                        />
                    ))}
                </div>

                {otpError && (
                    <p className='text-sm text-red-500 mb-4'>{otpError}</p>
                )}

                <div className='flex justify-between items-center mb-8'>
                    <p className='font-medium text-small text-title'>{`Don't`} receive the code?</p>
                    {
                        timeLeft > 0 ?
                            <p className='text-small text-common'>Resend in {timeLeft}s</p> :
                            <button
                                type="button"
                                onClick={handleResendCode}
                                className='font-medium text-small text-common cursor-pointer'
                            >
                                Resend
                            </button>
                    }

                </div>

                <button type='submit' className='bg-common text-main py-2 rounded-lg w-full'>Verify</button>
            </form>
        </div>
    )
}

export default VerifyOtp
