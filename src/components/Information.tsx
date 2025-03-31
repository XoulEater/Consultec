"use client";
import { useState } from "react";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

interface FormData {
    name: string;
    school: string;
    location: string;
    subject: string;
    role: string;
}

export function Information() {
    const [alignment, setAlignment] = useState('web');

    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string,
    ) => {
        setAlignment(newAlignment);
    };


    const [formData, setFormData] = useState<FormData>({
        name: "",
        school: "",
        location: "",
        subject: "",
        role: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleRoleChange = (role: string) => {
        setFormData((prev) => ({
            ...prev,
            role: role,
        }));
    };

    return (
        <div className="flex flex-col gap-6">

            {/* Main Content */}
            <div className="w-3/4 p-10">
                <h2 className="text-lg font-semibold">General</h2>

                <form className="mt-5 space-y-4">
                    <div>
                        <label className="block text-gray-700">Nombre*</label>
                        <input
                            type="text"
                            className="w-full border rounded p-2"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Escuela*</label>
                        <input
                            type="text"
                            className="w-full border rounded p-2"
                            name="school"
                            value={formData.school}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Sede*</label>
                        <input
                            type="text"
                            className="w-full border rounded p-2"
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Cátedra*</label>
                        <input
                            type="text"
                            className="w-full border rounded p-2"
                            name="subject"
                            value={formData.subject}
                            onChange={handleInputChange}
                        />
                    </div>
                </form>

                {/* Buttons */}
                <div className="mt-5 flex gap-2">
                    <ToggleButtonGroup
                        color="primary"
                        value={alignment}
                        exclusive
                        onChange={handleChange}
                        aria-label="Platform"
                    >
                        <ToggleButton value="profesor">Profesor</ToggleButton>
                        <ToggleButton value="tutor">Tutor</ToggleButton>
                    </ToggleButtonGroup>
                </div>

                {/* Action Buttons */}
                <div className="mt-10 flex justify-end gap-2">
                    <Button variant="contained">Eliminar</Button>
                    <Button variant="contained">Guardar</Button>
                    
                </div>
            </div>
        </div>
    );
}
