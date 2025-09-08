import React, { useState, useRef, useEffect } from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Schedule } from "@/lib/types";

interface DraggableEventProps {
    event: Schedule;
    onResize: (e: React.MouseEvent, delta: number) => void;
    onDelete: (id: string) => void;
    onDuplicate?: (id: string) => void;
    onEdit?: (id: string) => void;
}

const intervalHeight = 26;

const DraggableEvent: React.FC<DraggableEventProps> = ({
    event,
    onResize,
    onDelete,
    onDuplicate,
    onEdit,
}) => {
    const { attributes, listeners, setNodeRef, transform, isDragging } =
        useDraggable({
            id: event.id,
        });
    const [isResizing, setIsResizing] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!transform) {
            if (isResizing) {
                const timer = setTimeout(() => {
                    setIsResizing(false);
                }, 200);
                return () => clearTimeout(timer);
            }
        } else {
            if (!isResizing) {
                setIsResizing(true);
            }
        }
    }, [transform, isResizing]);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsDropdownOpen(false);
            }
        }

        if (isDropdownOpen) {
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }
    }, [isDropdownOpen]);

    const style: React.CSSProperties = {
        top: event.start * intervalHeight,
        height: event.duration * intervalHeight,
        transition: isResizing ? "none" : "top 0.2s ease, height 0.2s ease",
        transform: transform ? CSS.Translate.toString(transform) : undefined,
        zIndex: isDragging || event.temp ? 51 : 50 - event.start,
    };

    return (
        <div
            ref={setNodeRef}
            data-event-id={event.id}
            style={style}
            {...listeners}
            {...attributes}
            className={`absolute left-[1%] w-[98%] ${
                event.type === "consultation"
                    ? "bg-primary/80 border-blue-400/90"
                    : event.type === "class"
                    ? "bg-green-400/80 border-green-300/90"
                    : event.type === "telecommuting"
                    ? "bg-yellow-500/80 border-yellow-400/90"
                    : "bg-gray-400/80 border-gray-300/90"
            } ${event.disabled && " pointer-events-none"} 
                border-l-8 rounded-l-x
             rounded-sm shadow-md cursor-grab flex flex-col justify-between`}
        >
            <div className="relative h-full flex flex-col">
                <div className="justify-between flex pr-1">
                    <div className="text-xs font-bold flex items-center p-2 overflow-hidden">
                        <p className="line-clamp-1">{event.name}</p>
                    </div>
                    {!event.disabled && (
                        <div
                            className="relative min-w-fit flex justify-center items-center "
                            ref={dropdownRef}
                        >
                            <button
                                onMouseDown={(e) => {
                                    let intervalId: NodeJS.Timeout;
                                    const resize = () => onResize(e, -1);
                                    resize();
                                    intervalId = setInterval(resize, 150);
                                    const stop = () => {
                                        clearInterval(intervalId);
                                        document.removeEventListener(
                                            "mouseup",
                                            stop
                                        );
                                    };
                                    document.addEventListener("mouseup", stop);
                                }}
                                className=" text-white flex justify-center items-center  border-0 rounded font-bold text-sm w-6 h-6 cursor-pointer"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="18px"
                                    viewBox="0 -960 960 960"
                                    width="18px"
                                    fill="#ffffffff"
                                >
                                    <path d="M232-444v-72h496v72H232Z" />
                                </svg>
                            </button>
                            <button
                                onMouseDown={(e) => {
                                    let intervalId: NodeJS.Timeout;
                                    const resize = () => onResize(e, 1);
                                    resize();
                                    intervalId = setInterval(resize, 150);
                                    const stop = () => {
                                        clearInterval(intervalId);
                                        document.removeEventListener(
                                            "mouseup",
                                            stop
                                        );
                                    };
                                    document.addEventListener("mouseup", stop);
                                }}
                                className=" text-white border-0 flex justify-center items-center rounded font-bold text-sm w-6 h-6 cursor-pointer"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="18px"
                                    viewBox="0 -960 960 960"
                                    width="18px"
                                    fill="#ffffffff"
                                >
                                    <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
                                </svg>
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsDropdownOpen(!isDropdownOpen);
                                }}
                                className="text-white w-6 h-6 cursor-pointer flex justify-center items-center"
                                tabIndex={0}
                                aria-haspopup="menu"
                                aria-expanded={isDropdownOpen}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="18px"
                                    viewBox="0 -960 960 960"
                                    width="18px"
                                    fill="#ffffffff"
                                >
                                    <path d="M479.79-192Q450-192 429-213.21t-21-51Q408-294 429.21-315t51-21Q510-336 531-314.79t21 51Q552-234 530.79-213t-51 21Zm0-216Q450-408 429-429.21t-21-51Q408-510 429.21-531t51-21Q510-552 531-530.79t21 51Q552-450 530.79-429t-51 21Zm0-216Q450-624 429-645.21t-21-51Q408-726 429.21-747t51-21Q510-768 531-746.79t21 51Q552-666 530.79-645t-51 21Z" />
                                </svg>
                            </button>
                            <div
                                className={`absolute right-0 top-6 z-40 bg-neutral-800 border-0 rounded shadow-md min-w-[100px] transition-all duration-500 ease-in-out overflow-hidden ${
                                    isDropdownOpen
                                        ? "h-[110px] opacity-100"
                                        : "h-0 opacity-0 "
                                }`}
                            >
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onDelete(event.id);
                                        setIsDropdownOpen(false);
                                    }}
                                    className="block w-full text-left px-4 py-2 text-sm hover:bg-neutral-700"
                                >
                                    Eliminar
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        if (onEdit) onEdit(event.id);
                                        setIsDropdownOpen(false);
                                    }}
                                    className="block w-full text-left px-4 py-2 text-sm hover:bg-neutral-700"
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        if (onDuplicate) onDuplicate(event.id);
                                        setIsDropdownOpen(false);
                                    }}
                                    className="block w-full text-left px-4 py-2 text-sm hover:bg-neutral-700"
                                >
                                    Duplicar
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {event.duration > 1 && (
                    <div className="p-2 pt-0 text-xs font-medium overflow-hidden">
                        <p className="line-clamp-2">{event.subject}</p>
                        <span className="opacity-80 ">
                            {`${Math.floor(event.start / 2) + 7}:${
                                event.start % 2 === 0 ? "00" : "30"
                            }`}
                            <span className="mx-1 hidden md:inline">-</span>
                            <br className="md:hidden inline" />
                            {`${
                                Math.floor(event.start / 2) +
                                Math.floor(event.duration / 2) +
                                7
                            }:${
                                Math.floor(event.start + event.duration) % 2 ===
                                0
                                    ? "00"
                                    : "30"
                            }`}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DraggableEvent;
