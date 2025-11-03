'use client'

export interface SettingRowProps {
    sectionName: string;
    sectionData: string;
    auxiliaryText?: string;
    buttonAction?: () => void;
}

export default function SettingRow({
    sectionName,
    sectionData,
    auxiliaryText,
    buttonAction,
}: SettingRowProps) {
    return (
        <div className="flex flex-col gap-16 justify-center h-fit border-b-2 w-300 pt-8 pb-32 mb-8">
            <h4 className="title-4">{sectionName}</h4>
            <p className="font-body">{sectionData}</p>
            {buttonAction ? (
                <button
                    className="tooltip bold text-primary hover:text-hover  flex dark:text-red-500 dark:hover:text-red-300 cursor-pointer"
                    onClick={() => {
                        buttonAction();
                    }}>
                    {auxiliaryText}
                </button>
            ) : (
                <p className="tooltip bold text-primary dark:text-red-500 ">
                    {auxiliaryText}
                </p>
            )}
        </div>
    );
}
