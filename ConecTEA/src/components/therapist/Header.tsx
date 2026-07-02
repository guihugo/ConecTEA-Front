export default function Header() {
    return (
        <header className="flex h-16 items-center justify-between border-b bg-white px-6">
            <h2 className="text-xl font-semibold">
                Dashboard
            </h2>

            <div className="flex items-center gap-3">

                <div className="text-right">
                    <p className="font-medium">
                        Guilherme
                    </p>

                    <p className="text-sm text-muted-foreground">
                        Terapeuta
                    </p>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white">
                    G
                </div>

            </div>
        </header>
    );
}