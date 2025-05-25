import React, { useState } from 'react';
import { SketchPicker } from 'react-color';
import { useController, useFormContext } from 'react-hook-form';

function ColorPicker({ name, label }) {
    const { control } = useFormContext();
    const {
        field: { value, onChange },
        fieldState: { error },
    } = useController({
        name,
        control,
        defaultValue: '#000000',
    });

    const [showPicker, setShowPicker] = useState(false);

    const togglePicker = () => setShowPicker(!showPicker);
    const closePicker = () => setShowPicker(false);

    return (
        <div className="form-group" style={{ position: 'relative' }}>
            <label style={{ display: 'block', marginBottom: 8 }}>{label || 'Selecione uma Cor: '}</label>

            <div
                onClick={togglePicker}
                style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    backgroundColor: value,
                    border: '2px solid #ccc',
                    cursor: 'pointer',
                    boxShadow: '0 0 4px rgba(0,0,0,0.2)',
                }}
            />

            {showPicker && (
                <div style={{ position: 'absolute', zIndex: 2, top: '50px' }}>
                    <div
                        style={{
                            position: 'fixed',
                            top: 0,
                            right: 0,
                            bottom: 0,
                            left: 0,
                        }}
                        onClick={closePicker}
                    />
                    <SketchPicker
                        color={value}
                        onChange={(color) => onChange(color.hex)}
                    />
                </div>
            )}

            {error && (
                <p className="error" style={{ color: 'red', marginTop: '6px' }}>
                    {error.message}
                </p>
            )}
        </div>
    );
}

export default ColorPicker;
