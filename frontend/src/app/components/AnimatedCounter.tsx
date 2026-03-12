import { useEffect, useState, useRef } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";

interface AnimatedCounterProps {
    value: number;
    duration?: number;
    suffix?: string;
    prefix?: string;
}

export function AnimatedCounter({ value, duration = 2, suffix = "", prefix = "" }: AnimatedCounterProps) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        if (inView) {
            let start = 0;
            const end = value;
            const totalSteps = 60 * duration;
            const increment = end / totalSteps;

            let currentStep = 0;
            const timer = setInterval(() => {
                currentStep++;
                start += increment;
                if (currentStep >= totalSteps) {
                    setDisplayValue(end);
                    clearInterval(timer);
                } else {
                    setDisplayValue(Math.floor(start));
                }
            }, 1000 / 60);

            return () => clearInterval(timer);
        }
    }, [inView, value, duration]);

    return (
        <span ref={ref} className="tabular-nums">
            {prefix}
            {displayValue.toLocaleString()}
            {suffix}
        </span>
    );
}
