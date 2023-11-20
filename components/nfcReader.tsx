'use client'
import React, { useState, useEffect } from 'react';


const NFCReader: React.FC = () => {
    const [nfcSupported, setNfcSupported] = useState(false);
    const [tagData, setTagData] = useState('');
    const [tagData2, setTagData2] = useState('');

    useEffect(() => {
        if ('NDEFReader' in window) {
            setNfcSupported(true);
            startNFC();
        } else {
            alert("NFC is not supported.");
        }

        return () => {
            // Clean up any NFC-related resources if needed
        };
    }, []);


    const startNFC = async () => {
        try {
            const ndef = new NDEFReader();

            ndef.onreadingerror = () => {
                console.log("Cannot read data from the NFC tag. Try another one?");
            };
            ndef.onreading = (event:any) => {
                console.log("NDEF message read.");
                console.log(event);
                const textDecoder = new TextDecoder();
                setTagData2(textDecoder.decode(event.records[0].data));
            };

            ndef.addEventListener('reading', ({ message }: any) => {
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
            {tagData2 && <p>Tag Data: {tagData2}</p>}
        </div>
    );
};

export default NFCReader;
