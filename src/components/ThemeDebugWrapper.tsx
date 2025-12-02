'use client';

import { useEffect, useState } from 'react';
import ThemeDebug from './ThemeDebug';

export default function ThemeDebugWrapper() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return <ThemeDebug />;
}
