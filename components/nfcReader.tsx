'use client'
import React, { useState, useEffect } from 'react';


const NFCReader: React.FC = () => {
    const [nfcSupported, setNfcSupported] = useState(false);
    const [tagData, setTagData] = useState('');

    useEffect(() => {
        console.log(window)
        if ('NDEFReader' in window) {
            setNfcSupported(true);
            startNFC();
        } else {
            // console.error('Web NFC not supported on this browser.');
        }

        return () => {
            // Clean up any NFC-related resources if needed
        };
    }, []);

    const startNFC = async () => {
        try {
            const ndef = new NDEFReader();

            ndef.addEventListener('reading', ({ message }:any) => {
                const textDecoder = new TextDecoder();
                setTagData(textDecoder.decode(message.records[0].data));
            });

            await ndef.scan();
        } catch (error) {
            console.error('Error starting NFC:', error);
        }
    };

    return (
        <div>
            {nfcSupported ? (
                <p>Place an NFC tag near the device to read data.</p>
            ) : (
                <p>NFC not supported on this browser.</p>
            )}
            {tagData && <p>Tag Data: {tagData}</p>}
        </div>
    );
};

export default NFCReader;