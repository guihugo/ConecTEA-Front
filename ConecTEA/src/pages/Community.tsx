import {
    Clock3,
    Heart,
    MessageCircle,
    Plus,
    Search,
    Stethoscope,
    UserRound,
} from "lucide-react";

import { Link } from "react-router-dom";

type UserRole = "therapist" | "guardian";

interface Discussion {
    title: string;
    author: string;
    role: UserRole;
    category: string;
    replies: number;
    likes: number;
    time: string;
    initials: string;
}

const categories = [
    "Todas",
    "Experiências",
    "Dúvidas e apoio",
    "Atividades",
    "Escola e aprendizagem",
];

const discussions: Discussion[] = [
    {
        title: "Como vocês trabalham a comunicação em casa?",
        author: "Ana Martins",
        role: "guardian",
        category: "Dúvidas e apoio",
        replies: 8,
        likes: 14,
        time: "há 2 horas",
        initials: "AM",
    },
    {
        title: "Uma atividade que funcionou muito bem aqui em casa",
        author: "Carlos Oliveira",
        role: "guardian",
        category: "Atividades",
        replies: 5,
        likes: 21,
        time: "há 4 horas",
        initials: "CO",
    },
    {
        title: "Como foi a adaptação escolar de vocês?",
        author: "Mariana Costa",
        role: "guardian",
        category: "Escola e aprendizagem",
        replies: 12,
        likes: 17,
        time: "ontem",
        initials: "MC",
    },
    {
        title: "Algumas estratégias que podem ajudar na comunicação",
        author: "Dra. Maria Souza",
        role: "therapist",
        category: "Experiências",
        replies: 16,
        likes: 31,
        time: "ontem",
        initials: "MS",
    },
];

export default function Community() {
    return (
        <div className="space-y-8">
            {/* Cabeçalho */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Comunidade
                    </h1>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Compartilhe experiências e converse com outras pessoas.
                    </p>
                </div>

                <button
                    className="
                        inline-flex w-fit items-center gap-2
                        rounded-lg
                        bg-[#3B6FD8]
                        px-4 py-2.5
                        text-sm font-medium text-white
                        transition-colors
                        hover:bg-[#315fbd]
                    "
                >
                    <Plus size={17} />
                    Nova discussão
                </button>
            </div>

            {/* Busca */}
            <div className="relative max-w-2xl">
                <Search
                    size={18}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                />

                <input
                    type="text"
                    placeholder="Buscar discussões..."
                    className="
                        h-11 w-full
                        rounded-lg
                        border border-border
                        bg-background
                        pl-10 pr-4
                        text-sm
                        outline-none
                        transition
                        placeholder:text-muted-foreground
                        focus:border-[#3B6FD8]
                        focus:ring-2
                        focus:ring-[#3B6FD8]/10
                    "
                />
            </div>

            {/* Categorias */}
            <div className="flex gap-2 overflow-x-auto pb-1">
                {categories.map((category, index) => (
                    <button
                        key={category}
                        className={`
                            whitespace-nowrap rounded-full
                            px-3.5 py-1.5
                            text-sm
                            transition-colors
                            ${
                                index === 0
                                    ? "bg-[#3B6FD8] text-white"
                                    : "border border-border bg-background text-muted-foreground hover:bg-muted"
                            }
                        `}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Discussões */}
            <section>
                <div className="mb-4 flex items-center justify-between">
                    <div>
                        <h2 className="text-base font-semibold">
                            Discussões recentes
                        </h2>

                        <p className="mt-0.5 text-sm text-muted-foreground">
                            As conversas mais recentes da comunidade.
                        </p>
                    </div>
                </div>

                <div className="divide-y rounded-xl border bg-background">
                    {discussions.map((discussion) => (
                        <Link
                            key={discussion.title}
                            to="#"
                            className="
                                group block
                                px-5 py-5
                                transition-colors
                                hover:bg-muted/30
                            "
                        >
                            <div className="flex gap-4">
                                {/* Avatar */}
                                <div
                                    className="
                                        hidden h-10 w-10 shrink-0
                                        items-center justify-center
                                        rounded-full
                                        bg-muted
                                        text-xs font-medium
                                        text-muted-foreground
                                        sm:flex
                                    "
                                >
                                    {discussion.initials}
                                </div>

                                <div className="min-w-0 flex-1">
                                    <h3
                                        className="
                                            text-sm font-medium
                                            text-foreground
                                            transition-colors
                                            group-hover:text-[#3B6FD8]
                                        "
                                    >
                                        {discussion.title}
                                    </h3>

                                    <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                                        <span>{discussion.author}</span>

                                        <span className="text-border">•</span>

                                        <span className="inline-flex items-center gap-1">
                                            {discussion.role === "therapist" ? (
                                                <>
                                                    <Stethoscope size={12} />
                                                    Terapeuta
                                                </>
                                            ) : (
                                                <>
                                                    <UserRound size={12} />
                                                    Responsável
                                                </>
                                            )}
                                        </span>

                                        <span className="text-border">•</span>

                                        <span>{discussion.category}</span>
                                    </div>

                                    <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                                        <span className="inline-flex items-center gap-1.5">
                                            <MessageCircle size={14} />
                                            {discussion.replies}
                                        </span>

                                        <span className="inline-flex items-center gap-1.5">
                                            <Heart size={14} />
                                            {discussion.likes}
                                        </span>

                                        <span className="inline-flex items-center gap-1.5">
                                            <Clock3 size={14} />
                                            {discussion.time}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
}