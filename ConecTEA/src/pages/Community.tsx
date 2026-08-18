import { useEffect, useMemo, useState } from "react";
import {
    Clock3,
    ExternalLink,
    Heart,
    Link2,
    MessageCircle,
    Plus,
    Search,
    Send,
    Stethoscope,
    UserRound,
    X,
} from "lucide-react";

type UserRole = "therapist" | "guardian";
type PostType = "text" | "article";

interface CommentItem {
    id: string;
    author: string;
    content: string;
    time: string;
}

interface Post {
    id: string;
    title: string;
    author: string;
    role: UserRole;
    category: string;
    type: PostType;
    content: string;
    articleUrl?: string;
    articleDomain?: string;
    likes: number;
    liked: boolean;
    comments: CommentItem[];
    time: string;
}

const STORAGE_KEY = "conectea:community:posts";

const categories = [
    "Todas",
    "Experiências",
    "Dúvidas e apoio",
    "Atividades",
    "Escola e aprendizagem",
];

const postCategories = categories.slice(1);

function initials(name: string) {
    return name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase() ?? "")
        .join("");
}

function domainFromUrl(url: string) {
    try {
        const { hostname } = new URL(url.startsWith("http") ? url : `https://${url}`);
        return hostname.replace(/^www\./, "");
    } catch {
        return url;
    }
}

const seedPosts: Post[] = [
    {
        id: "seed-1",
        title: "Como vocês trabalham a comunicação em casa?",
        author: "Ana Martins",
        role: "guardian",
        category: "Dúvidas e apoio",
        type: "text",
        content:
            "Estamos tentando introduzir cartões de comunicação em casa, mas meu filho perde o interesse rápido. Alguma estratégia que funcionou para vocês?",
        likes: 14,
        liked: false,
        comments: [
            {
                id: "c1",
                author: "Carlos Oliveira",
                content: "Aqui funcionou intercalar os cartões com um brinquedo favorito dele nos primeiros minutos.",
                time: "há 1 hora",
            },
        ],
        time: "há 2 horas",
    },
    {
        id: "seed-2",
        title: "Uma atividade que funcionou muito bem aqui em casa",
        author: "Carlos Oliveira",
        role: "guardian",
        category: "Atividades",
        type: "text",
        content:
            "Criamos uma rotina visual com fotos das próprias tarefas do dia. Reduziu bastante a ansiedade na hora de trocar de atividade.",
        likes: 21,
        liked: false,
        comments: [],
        time: "há 4 horas",
    },
    {
        id: "seed-3",
        title: "Estratégias baseadas em evidência para comunicação funcional",
        author: "Dra. Maria Souza",
        role: "therapist",
        category: "Experiências",
        type: "article",
        content:
            "Reuni aqui um artigo com boas referências sobre comunicação funcional alternativa. Pode ajudar quem está começando agora.",
        articleUrl: "https://www.scielo.br/j/acr/a/ZpKbgfnP8wH6k73HHHXSKxd/?lang=pt",
        articleDomain: domainFromUrl(
            "https://www.scielo.br/j/acr/a/ZpKbgfnP8wH6k73HHHXSKxd/?lang=pt"
        ),
        likes: 31,
        liked: false,
        comments: [
            {
                id: "c2",
                author: "Mariana Costa",
                content: "Muito obrigada por compartilhar, Dra. Maria!",
                time: "há 20 min",
            },
        ],
        time: "ontem",
    },
    {
        id: "seed-4",
        title: "Como foi a adaptação escolar de vocês?",
        author: "Mariana Costa",
        role: "guardian",
        category: "Escola e aprendizagem",
        type: "text",
        content:
            "Estamos na terceira semana de aula e ainda tem dias difíceis na hora de entrar na sala. A professora tem sido super parceira, mas queria trocar ideia com quem já passou por isso.",
        likes: 17,
        liked: false,
        comments: [
            {
                id: "c3",
                author: "Ana Martins",
                content: "Passamos por isso ano passado. Ajudou muito criar uma despedida com o mesmo ritual todo dia.",
                time: "há 3 horas",
            },
        ],
        time: "há 6 horas",
    },
    {
        id: "seed-5",
        title: "Guia sobre rotinas visuais para o dia a dia",
        author: "Dr. Felipe Ramos",
        role: "therapist",
        category: "Atividades",
        type: "article",
        content:
            "Separei um material bem prático sobre como montar rotinas visuais em casa, com exemplos de quadros e ícones. Vale a leitura para quem está começando.",
        articleUrl: "https://www.autismo.org.br",
        articleDomain: domainFromUrl("https://www.autismo.org.br"),
        likes: 9,
        liked: false,
        comments: [],
        time: "há 8 horas",
    },
    {
        id: "seed-6",
        title: "Dicas para lidar com a sensibilidade a sons",
        author: "Juliana Prado",
        role: "guardian",
        category: "Dúvidas e apoio",
        type: "text",
        content:
            "Meu filho tem ficado bem incomodado com barulhos altos ultimamente, principalmente em ambientes públicos. Vocês usam algum tipo de protetor auricular ou têm outra estratégia que funcione?",
        likes: 6,
        liked: false,
        comments: [],
        time: "há 1 dia",
    },
];

function loadPosts(): Post[] {
    if (typeof window === "undefined") return seedPosts;
    try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (!raw) return seedPosts;
        const parsed = JSON.parse(raw) as Post[];
        return Array.isArray(parsed) && parsed.length > 0 ? parsed : seedPosts;
    } catch {
        return seedPosts;
    }
}

export default function Community() {
    const [posts, setPosts] = useState<Post[]>(loadPosts);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("Todas");
    const [openComments, setOpenComments] = useState<Set<string>>(new Set());
    const [commentDrafts, setCommentDrafts] = useState<Record<string, string>>({});
    const [showComposer, setShowComposer] = useState(false);

    useEffect(() => {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
    }, [posts]);

    const filteredPosts = useMemo(() => {
        return posts.filter((post) => {
            const matchesCategory =
                activeCategory === "Todas" || post.category === activeCategory;
            const query = searchQuery.trim().toLowerCase();
            const matchesQuery =
                query === "" ||
                post.title.toLowerCase().includes(query) ||
                post.content.toLowerCase().includes(query) ||
                post.author.toLowerCase().includes(query);
            return matchesCategory && matchesQuery;
        });
    }, [posts, activeCategory, searchQuery]);

    function toggleLike(postId: string) {
        setPosts((prev) =>
            prev.map((post) =>
                post.id === postId
                    ? {
                          ...post,
                          liked: !post.liked,
                          likes: post.liked ? post.likes - 1 : post.likes + 1,
                      }
                    : post
            )
        );
    }

    function toggleComments(postId: string) {
        setOpenComments((prev) => {
            const next = new Set(prev);
            if (next.has(postId)) {
                next.delete(postId);
            } else {
                next.add(postId);
            }
            return next;
        });
    }

    function submitComment(postId: string) {
        const draft = (commentDrafts[postId] ?? "").trim();
        if (draft === "") return;

        const comment: CommentItem = {
            id: `${postId}-${Date.now()}`,
            author: "Você",
            content: draft,
            time: "agora",
        };

        setPosts((prev) =>
            prev.map((post) =>
                post.id === postId
                    ? { ...post, comments: [...post.comments, comment] }
                    : post
            )
        );
        setCommentDrafts((prev) => ({ ...prev, [postId]: "" }));
    }

    function handleCreatePost(newPost: Omit<Post, "id" | "likes" | "liked" | "comments" | "time">) {
        const post: Post = {
            ...newPost,
            id: `post-${Date.now()}`,
            likes: 0,
            liked: false,
            comments: [],
            time: "agora",
        };
        setPosts((prev) => [post, ...prev]);
        setShowComposer(false);
    }

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
                    onClick={() => setShowComposer(true)}
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
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
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
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className={`
                            whitespace-nowrap rounded-full
                            px-3.5 py-1.5
                            text-sm
                            transition-colors
                            ${
                                activeCategory === category
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

                {filteredPosts.length === 0 ? (
                    <div className="rounded-xl border bg-background px-5 py-10 text-center text-sm text-muted-foreground">
                        Nenhuma discussão encontrada. Que tal começar uma?
                    </div>
                ) : (
                    <div className="divide-y rounded-xl border bg-background">
                        {filteredPosts.map((post) => (
                            <article key={post.id} className="px-5 py-5">
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
                                        {initials(post.author)}
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <h3 className="text-sm font-medium text-foreground">
                                            {post.title}
                                        </h3>

                                        <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                                            <span>{post.author}</span>

                                            <span className="text-border">•</span>

                                            <span className="inline-flex items-center gap-1">
                                                {post.role === "therapist" ? (
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

                                            <span>{post.category}</span>
                                        </div>

                                        <p className="mt-3 text-sm text-foreground/90">
                                            {post.content}
                                        </p>

                                        {post.type === "article" && post.articleUrl && (
                                            <a
                                                href={post.articleUrl}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="
                                                    mt-3 flex items-center gap-3
                                                    rounded-lg border border-border
                                                    bg-muted/40 px-3.5 py-3
                                                    transition-colors
                                                    hover:bg-muted/70
                                                "
                                            >
                                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[#3B6FD8]/10 text-[#3B6FD8]">
                                                    <Link2 size={16} />
                                                </div>

                                                <div className="min-w-0 flex-1">
                                                    <p className="truncate text-xs font-medium text-foreground">
                                                        {post.articleDomain}
                                                    </p>
                                                    <p className="text-xs text-muted-foreground">
                                                        Ler artigo
                                                    </p>
                                                </div>

                                                <ExternalLink
                                                    size={14}
                                                    className="shrink-0 text-muted-foreground"
                                                />
                                            </a>
                                        )}

                                        <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                                            <button
                                                onClick={() => toggleLike(post.id)}
                                                className={`
                                                    inline-flex items-center gap-1.5
                                                    transition-colors
                                                    hover:text-[#3B6FD8]
                                                    ${post.liked ? "text-[#3B6FD8]" : ""}
                                                `}
                                            >
                                                <Heart
                                                    size={14}
                                                    fill={post.liked ? "currentColor" : "none"}
                                                />
                                                {post.likes}
                                            </button>

                                            <button
                                                onClick={() => toggleComments(post.id)}
                                                className="inline-flex items-center gap-1.5 transition-colors hover:text-[#3B6FD8]"
                                            >
                                                <MessageCircle size={14} />
                                                {post.comments.length}
                                            </button>

                                            <span className="inline-flex items-center gap-1.5">
                                                <Clock3 size={14} />
                                                {post.time}
                                            </span>
                                        </div>

                                        {openComments.has(post.id) && (
                                            <div className="mt-4 space-y-3 border-t border-border pt-4">
                                                {post.comments.map((comment) => (
                                                    <div key={comment.id} className="flex gap-3">
                                                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted text-[10px] font-medium text-muted-foreground">
                                                            {initials(comment.author)}
                                                        </div>
                                                        <div className="min-w-0 flex-1">
                                                            <div className="flex items-center gap-2 text-xs">
                                                                <span className="font-medium text-foreground">
                                                                    {comment.author}
                                                                </span>
                                                                <span className="text-muted-foreground">
                                                                    {comment.time}
                                                                </span>
                                                            </div>
                                                            <p className="mt-0.5 text-sm text-foreground/90">
                                                                {comment.content}
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))}

                                                <div className="flex items-center gap-2">
                                                    <input
                                                        type="text"
                                                        value={commentDrafts[post.id] ?? ""}
                                                        onChange={(event) =>
                                                            setCommentDrafts((prev) => ({
                                                                ...prev,
                                                                [post.id]: event.target.value,
                                                            }))
                                                        }
                                                        onKeyDown={(event) => {
                                                            if (event.key === "Enter") {
                                                                submitComment(post.id);
                                                            }
                                                        }}
                                                        placeholder="Escreva um comentário..."
                                                        className="
                                                            h-9 w-full
                                                            rounded-lg
                                                            border border-border
                                                            bg-background
                                                            px-3
                                                            text-sm
                                                            outline-none
                                                            transition
                                                            placeholder:text-muted-foreground
                                                            focus:border-[#3B6FD8]
                                                            focus:ring-2
                                                            focus:ring-[#3B6FD8]/10
                                                        "
                                                    />
                                                    <button
                                                        onClick={() => submitComment(post.id)}
                                                        className="
                                                            flex h-9 w-9 shrink-0 items-center justify-center
                                                            rounded-lg bg-[#3B6FD8] text-white
                                                            transition-colors hover:bg-[#315fbd]
                                                        "
                                                    >
                                                        <Send size={14} />
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </section>

            {showComposer && (
                <PostComposer
                    onClose={() => setShowComposer(false)}
                    onSubmit={handleCreatePost}
                />
            )}
        </div>
    );
}

interface PostComposerProps {
    onClose: () => void;
    onSubmit: (
        post: Omit<Post, "id" | "likes" | "liked" | "comments" | "time">
    ) => void;
}

function PostComposer({ onClose, onSubmit }: PostComposerProps) {
    const [role, setRole] = useState<UserRole>("guardian");
    const [type, setType] = useState<PostType>("text");
    const [author, setAuthor] = useState("");
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState(postCategories[0]);
    const [content, setContent] = useState("");
    const [articleUrl, setArticleUrl] = useState("");

    const canSubmit =
        title.trim() !== "" &&
        content.trim() !== "" &&
        (type === "text" || articleUrl.trim() !== "");

    function handleSubmit() {
        if (!canSubmit) return;

        onSubmit({
            title: title.trim(),
            author: author.trim() === "" ? "Você" : author.trim(),
            role,
            category,
            type,
            content: content.trim(),
            ...(type === "article"
                ? {
                      articleUrl: articleUrl.trim(),
                      articleDomain: domainFromUrl(articleUrl.trim()),
                  }
                : {}),
        });
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
            <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl border border-border bg-background shadow-lg">
                <div className="flex items-center justify-between border-b border-border px-5 py-4">
                    <h2 className="text-base font-semibold">Nova discussão</h2>
                    <button
                        onClick={onClose}
                        className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                        <X size={18} />
                    </button>
                </div>

                <div className="space-y-4 px-5 py-5">
                    {/* Você é */}
                    <div>
                        <p className="mb-1.5 text-xs font-medium text-muted-foreground">
                            Você é
                        </p>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setRole("guardian")}
                                className={`
                                    flex-1 rounded-lg border px-3 py-2 text-sm transition-colors
                                    ${
                                        role === "guardian"
                                            ? "border-[#3B6FD8] bg-[#3B6FD8]/10 text-[#3B6FD8]"
                                            : "border-border text-muted-foreground hover:bg-muted"
                                    }
                                `}
                            >
                                Responsável
                            </button>
                            <button
                                onClick={() => setRole("therapist")}
                                className={`
                                    flex-1 rounded-lg border px-3 py-2 text-sm transition-colors
                                    ${
                                        role === "therapist"
                                            ? "border-[#3B6FD8] bg-[#3B6FD8]/10 text-[#3B6FD8]"
                                            : "border-border text-muted-foreground hover:bg-muted"
                                    }
                                `}
                            >
                                Terapeuta
                            </button>
                        </div>
                    </div>

                    {/* Nome */}
                    <div>
                        <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                            Nome
                        </label>
                        <input
                            type="text"
                            value={author}
                            onChange={(event) => setAuthor(event.target.value)}
                            placeholder="Como quer assinar o post"
                            className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none transition focus:border-[#3B6FD8] focus:ring-2 focus:ring-[#3B6FD8]/10"
                        />
                    </div>

                    {/* Título */}
                    <div>
                        <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                            Título
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(event) => setTitle(event.target.value)}
                            placeholder="Sobre o que é a discussão?"
                            className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none transition focus:border-[#3B6FD8] focus:ring-2 focus:ring-[#3B6FD8]/10"
                        />
                    </div>

                    {/* Categoria */}
                    <div>
                        <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                            Categoria
                        </label>
                        <select
                            value={category}
                            onChange={(event) => setCategory(event.target.value)}
                            className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none transition focus:border-[#3B6FD8] focus:ring-2 focus:ring-[#3B6FD8]/10"
                        >
                            {postCategories.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Tipo */}
                    <div>
                        <p className="mb-1.5 text-xs font-medium text-muted-foreground">
                            Tipo de post
                        </p>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setType("text")}
                                className={`
                                    flex-1 rounded-lg border px-3 py-2 text-sm transition-colors
                                    ${
                                        type === "text"
                                            ? "border-[#3B6FD8] bg-[#3B6FD8]/10 text-[#3B6FD8]"
                                            : "border-border text-muted-foreground hover:bg-muted"
                                    }
                                `}
                            >
                                Texto
                            </button>
                            <button
                                onClick={() => setType("article")}
                                className={`
                                    flex-1 rounded-lg border px-3 py-2 text-sm transition-colors
                                    ${
                                        type === "article"
                                            ? "border-[#3B6FD8] bg-[#3B6FD8]/10 text-[#3B6FD8]"
                                            : "border-border text-muted-foreground hover:bg-muted"
                                    }
                                `}
                            >
                                Link de artigo
                            </button>
                        </div>
                    </div>

                    {type === "article" && (
                        <div>
                            <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                                Link do artigo
                            </label>
                            <input
                                type="text"
                                value={articleUrl}
                                onChange={(event) => setArticleUrl(event.target.value)}
                                placeholder="https://..."
                                className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none transition focus:border-[#3B6FD8] focus:ring-2 focus:ring-[#3B6FD8]/10"
                            />
                        </div>
                    )}

                    {/* Conteúdo */}
                    <div>
                        <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                            {type === "article" ? "Comentário sobre o artigo" : "Mensagem"}
                        </label>
                        <textarea
                            value={content}
                            onChange={(event) => setContent(event.target.value)}
                            rows={4}
                            placeholder="Escreva aqui..."
                            className="w-full resize-none rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none transition focus:border-[#3B6FD8] focus:ring-2 focus:ring-[#3B6FD8]/10"
                        />
                    </div>
                </div>

                <div className="flex items-center justify-end gap-2 border-t border-border px-5 py-4">
                    <button
                        onClick={onClose}
                        className="rounded-lg px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={!canSubmit}
                        className="rounded-lg bg-[#3B6FD8] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#315fbd] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Publicar
                    </button>
                </div>
            </div>
        </div>
    );
}