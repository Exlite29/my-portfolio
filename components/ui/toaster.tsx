'use client';

import { Toaster as HotToaster } from 'react-hot-toast';

export function Toaster() {
    return (
        <HotToaster
            position="bottom-right"
            reverseOrder={false}
            containerStyle={{ zIndex: 99999 }}
            toastOptions={{
                className: "",
                duration: 5000,
                style: {
                    background: 'var(--toast-bg)',
                    color: 'var(--toast-text)',
                },
            }}
        />
    );
}