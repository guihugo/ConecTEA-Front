import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/logo_conectea.png";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#F7F5F2]">

      {/* ========================================================= */}
      {/* ANIMAÇÕES */}
      {/* ========================================================= */}

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translate3d(0, 0, 0);
          }
          50% {
            transform: translate3d(0, -18px, 0);
          }
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-120%);
          }
          100% {
            transform: translateX(120%);
          }
        }

        @keyframes pulseGlow {
          0%, 100% {
            opacity: 0.35;
            transform: scale(1);
          }
          50% {
            opacity: 0.65;
            transform: scale(1.08);
          }
        }

        @keyframes dotPulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.15);
            opacity: 0.7;
          }
        }

        .hero-fade {
          animation: fadeUp 0.7s ease-out both;
        }

        .hero-card {
          animation: fadeUp 0.8s ease-out both;
          transition:
            transform 300ms ease,
            box-shadow 300ms ease,
            border-color 300ms ease;
        }

        .hero-card:hover {
          transform: translateY(-7px);
          box-shadow: 0 18px 45px rgba(0, 0, 0, 0.08);
        }

        .hero-logo {
          animation: fadeIn 0.9s ease-out both;
        }

        .float-slow {
          animation: float 7s ease-in-out infinite;
        }

        .float-slower {
          animation: float 10s ease-in-out infinite;
        }

        .glow-pulse {
          animation: pulseGlow 5s ease-in-out infinite;
        }

        .shimmer {
          animation: shimmer 4s ease-in-out infinite;
        }

        .dot-pulse {
          animation: dotPulse 2.5s ease-in-out infinite;
        }
      `}</style>

      {/* ========================================================= */}
      {/* BACKGROUND DECORATIVO */}
      {/* ========================================================= */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        {/* Glow superior esquerdo */}
        <div
          className="
            float-slow absolute
            -left-32 -top-32
            h-80 w-80
            rounded-full
            bg-[#DCE8FF]
            opacity-50
            blur-3xl
          "
        />

        {/* Glow superior direito */}
        <div
          className="
            float-slower absolute
            -right-40 top-20
            h-96 w-96
            rounded-full
            bg-[#E8E2FF]
            opacity-40
            blur-3xl
          "
        />

        {/* Glow inferior central */}
        <div
          className="
            glow-pulse absolute
            left-1/2 bottom-[-6rem]
            h-72 w-72
            -translate-x-1/2
            rounded-full
            bg-[#DCE8FF]
            opacity-30
            blur-3xl
          "
        />

        {/* Grid extremamente sutil */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* ========================================================= */}
      {/* CONTEÚDO */}
      {/* ========================================================= */}

      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl items-center px-6 py-12">
        <div className="grid w-full items-center gap-16 lg:grid-cols-2">

          {/* Conteúdo principal */}
          <div className="text-center lg:text-left">

            {/* Logo */}
            <img
              src={logo}
              alt="ConecTEA"
              className="hero-logo mx-auto mb-6 h-14 w-auto object-contain lg:mx-0"
            />

            <div
              className="hero-fade mb-7 flex items-center justify-center gap-3 lg:justify-start"
              style={{ animationDelay: "80ms" }}
            >
              <div className="h-px w-10 bg-[#3B6FD8]" />

              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                Cuidado conectado
              </span>
            </div>

            <h1
              className="
                hero-fade
                max-w-4xl text-5xl font-medium leading-[1.05]
                tracking-[-0.02em] text-neutral-900
                sm:text-6xl lg:text-[76px]
              "
              style={{ animationDelay: "160ms" }}
            >
              Cuidar também
              <br />
              <span className="italic text-[#3B6FD8]">
                é estar perto.
              </span>
            </h1>

            <p
              className="hero-fade mx-auto mt-8 max-w-xl text-base leading-7 text-neutral-600 sm:text-lg lg:mx-0"
              style={{ animationDelay: "260ms" }}
            >
              O ConecTEA aproxima famílias, terapeutas e profissionais
              para que o acompanhamento de crianças com TEA aconteça
              de forma mais simples, contínua e humana.
            </p>

            <div
              className="hero-fade mt-10 flex flex-wrap items-center justify-center gap-5 lg:justify-start"
              style={{ animationDelay: "360ms" }}
            >

              <Button
                onClick={() => navigate("/login")}
                className="
                  h-12
                  rounded-full
                  bg-[#3B6FD8]
                  px-8
                  text-sm
                  font-semibold
                  shadow-[0_5px_15px_rgba(59,111,216,0.25)]
                  transition-all
                  hover:-translate-y-0.5
                  hover:bg-[#2D5FC6]
                  hover:shadow-[0_8px_20px_rgba(59,111,216,0.3)]
                "
              >
                Entrar
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <button
                onClick={() => navigate("/signup")}
                className="
                  text-sm
                  font-semibold
                  text-neutral-700
                  underline
                  underline-offset-4
                  decoration-neutral-300
                  transition-colors
                  hover:text-[#3B6FD8]
                  hover:decoration-[#3B6FD8]
                "
              >
                Criar uma conta
              </button>

            </div>

            {/* Pricing */}
            <div
              className="hero-fade mt-7"
              style={{ animationDelay: "440ms" }}
            >
              <button
                onClick={() => navigate("/pricing")}
                className="
                  text-sm
                  font-medium
                  text-neutral-500
                  transition-colors
                  hover:text-[#3B6FD8]
                "
              >
                Você é terapeuta?{" "}
                <span className="underline underline-offset-4">
                  Conheça nossos planos
                </span>{" "}
                →
              </button>
            </div>

          </div>

          {/* Card ilustrativo */}
          <div className="hidden justify-center lg:flex">
            <div
              className="hero-card relative"
              style={{ animationDelay: "300ms" }}
            >

              {/* Glow atrás do card */}
              <div
                className="
                  pointer-events-none absolute
                  -inset-1
                  rounded-[26px]
                  bg-[#3B6FD8]
                  opacity-[0.08]
                  blur-xl
                "
              />

              <div
                className="
                  relative
                  w-[370px]
                  overflow-hidden
                  rounded-3xl
                  border
                  border-neutral-200
                  bg-white/95
                  p-8
                  shadow-[0_8px_30px_rgba(0,0,0,0.07)]
                  backdrop-blur
                "
              >
                {/* Linha brilhante */}
                <div
                  className="
                    shimmer
                    pointer-events-none
                    absolute left-0 top-0
                    h-full w-1/3
                    -skew-x-12
                    bg-gradient-to-r
                    from-transparent
                    via-white/50
                    to-transparent
                    opacity-30
                  "
                />

                <div className="relative mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EAF0FC]">
                  <div className="dot-pulse h-7 w-7 rounded-full bg-[#3B6FD8]" />
                </div>

                <h2 className="relative text-2xl font-semibold text-neutral-900">
                  Tudo conectado.
                </h2>

                <p className="relative mt-3 text-sm leading-6 text-neutral-500">
                  Facilite a comunicação e o acompanhamento entre
                  famílias e profissionais.
                </p>

                <div className="relative mt-8 space-y-3">
                  {[
                    {
                      title: "Acompanhamento",
                      desc: "Informações organizadas em um só lugar.",
                    },
                    {
                      title: "Comunicação",
                      desc: "Pais e profissionais trabalhando juntos.",
                    },
                    {
                      title: "Desenvolvimento",
                      desc: "Um cuidado mais integrado e eficiente.",
                    },
                  ].map((item, i) => (
                    <div
                      key={item.title}
                      className="
                        hero-fade
                        rounded-xl bg-[#F7F5F2] p-4
                        transition-all duration-300
                        hover:-translate-y-0.5
                        hover:bg-[#EEF3FC]
                      "
                      style={{ animationDelay: `${500 + i * 100}ms` }}
                    >
                      <p className="text-sm font-medium text-neutral-800">
                        {item.title}
                      </p>
                      <p className="mt-1 text-xs text-neutral-500">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}