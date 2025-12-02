'use client';

import { useEffect, useState } from 'react';
import SettingsToggles from './SettingsToggles';

export default function SettingsTogglesWrapper() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return <SettingsToggles />;
}
