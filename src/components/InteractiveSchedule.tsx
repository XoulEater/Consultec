import React from "react";
import { DndContext } from "@dnd-kit/core";
import DraggableEvent from "./DraggableEvent";
import NewEventModal from "./NewEventModal";
import { useWeeklyCalendarLogic } from "./useWeeklyCalendarLogic";

export default function WeeklyCalendar() {
    const {
        showNewEventModal,
        setShowNewEventModal,
        newEventData,
        form,
        setForm,
        events,
        tempEvent,
        sensors,
        handleDragStart,
        handleDragEnd,
        handleResize,
        handleGridClick,
        handleNewEventSubmit,
        handleDeleteEvent,
        handleDuplicateEvent,
        days,
        startHour,
        endHour,
        intervalHeight,
        intervals,
        columnRef,
        handleEditEvent,
    } = useWeeklyCalendarLogic();

    return (
        <DndContext
            sensors={sensors}
            onDragEnd={handleDragEnd}
            onDragStart={handleDragStart}
        >
            <div className="grid grid-cols-[80px_repeat(6,1fr)] max-h-screen">
                {/* Modal para nuevo evento */}
                <NewEventModal
                    show={showNewEventModal}
                    newEventData={newEventData}
                    form={form}
                    setForm={setForm}
                    onClose={() => setShowNewEventModal(false)}
                    onSubmit={handleNewEventSubmit}
                    intervals={intervals}
                    events={events}
                />
                {/* Days row */}
                <div className=" h-12 " />
                {days.map((day, dayIndex) => {
                    const totalHours = events
                        .filter((ev) => ev.day === dayIndex)
                        .reduce((acc, ev) => acc + ev.duration / 2, 0);
                    return (
                        <div
                            key={day}
                            className="border border-neutral-800 h-12 text-center flex flex-col items-center justify-center py-1"
                        >
                            {day}
                            <div
                                className={`text-xs  relative w-fit ${
                                    totalHours > 12
                                        ? "text-red-500"
                                        : "text-neutral-500"
                                }`}
                            >
                                {totalHours > 12 && <svg
                                    className="absolute -left-6 -top-0.5 translate-x-0.5"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    >
                                    <path d="M19.875 6.27c.7 .398 1.13 1.143 1.125 1.948v7.284c0 .809 -.443 1.555 -1.158 1.948l-6.75 4.27a2.269 2.269 0 0 1 -2.184 0l-6.75 -4.27a2.225 2.225 0 0 1 -1.158 -1.948v-7.285c0 -.809 .443 -1.554 1.158 -1.947l6.75 -3.98a2.33 2.33 0 0 1 2.25 0l6.75 3.98h-.033z" />
                                    <path d="M12 8v4" />
                                    <path d="M12 16h.01" />
                                </svg>}
                                ({totalHours}/12) horas
                            </div>

                        </div>
                    );
                })}

                {/* Time column and schedule grid */}
                <div>
                    {Array.from({ length: endHour - startHour }).map((_, i) => (
                        <div
                            key={i}
                            style={{ height: intervalHeight * 2 }}
                            className="border-b border-neutral-800 text-xs text-right pr-1 text-neutral-300 flex items-start"
                        >
                            {`${startHour + i}:00`}
                        </div>
                    ))}
                </div>
                {days.map((day, dayIndex) => (
                    <div
                        key={day}
                        className="relative border-l border-r border-neutral-800"
                        onClick={(e) => handleGridClick(dayIndex, e)}
                        ref={dayIndex === 0 ? columnRef : undefined}
                    >
                        {Array.from({ length: endHour - startHour }).map(
                            (_, i) => (
                                <div
                                    key={i}
                                    style={{ height: intervalHeight * 2 }}
                                    className="border-b border-neutral-600"
                                />
                            )
                        )}
                        {events
                            .filter((ev) => ev.day === dayIndex)
                            .map((ev) => (
                                <DraggableEvent
                                    key={ev.id}
                                    event={ev}
                                    onResize={handleResize}
                                    onDelete={handleDeleteEvent}
                                    onDuplicate={handleDuplicateEvent}
                                    onEdit={handleEditEvent}
                                />
                            ))}
                        {/* Evento temporal en edición */}
                        {tempEvent && tempEvent.day === dayIndex && (
                            <DraggableEvent
                                key={"temp"}
                                event={{
                                    ...tempEvent,
                                    disabled: true,
                                    temp: true,
                                }}
                                onResize={() => {}}
                                onDelete={() => {}}
                            />
                        )}
                    </div>
                ))}
            </div>
        </DndContext>
    );
}
