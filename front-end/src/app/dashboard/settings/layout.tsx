export default function Settings({ children }: { children?: React.ReactNode }) {
    return (
        <div className="flex flex-row w-full h-full">
            <h1 className="title-1">Settings</h1>
            {children}
        </div>
    );
}
