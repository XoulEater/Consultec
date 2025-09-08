"use client";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { hideAlert } from "../store/alertSlice";

export default function AlertModal() {
    const {
        open,
        message,
        type,
        confirmText,
        cancelText,
        onConfirm,
        onCancel,
    } = useAppSelector((state) => state.alert);
    const dispatch = useAppDispatch();

    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-bgmain rounded shadow-lg p-6 flex flex-col gap-8 max-w-[500px] min-w-[300px] border border-hr">
                <span className="text-lg font-semibold text-white">
                    {message}
                </span>
                <div className="flex gap-2 justify-end">
                    {cancelText && (
                        <button
                            className="px-3 py-1 rounded bg-bghover text-white hover:bg-gray-700 border border-hr"
                            onClick={() => {
                                if (onCancel) onCancel();
                                dispatch(hideAlert());
                            }}
                        >
                            {cancelText}
                        </button>
                    )}
                    {confirmText && (
                        <button
                            className="px-3 py-1 rounded bg-primary text-white hover:bg-blue-600 transition-colors duration-300"
                            onClick={() => {
                                if (onConfirm) onConfirm();
                                dispatch(hideAlert());
                            }}
                        >
                            {confirmText}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
