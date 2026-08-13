import { Check, ArrowLeft, Sparkles } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const plans = [
  {
    name: "Combo Terapeuta Bronze",
    description:
      "Para terapeutas que acompanham pequenos grupos de pacientes.",
    price: "R$ 90",
    period: "por mês",
    capacity: "Até 5 pacientes ativos",
    features: [
      "Até 5 pacientes ativos",
      "Acesso à plataforma",
      "Mais pacientes em um único plano",
    ],
    button: "Escolher Bronze",
  },
  {
    name: "Combo Terapeuta Prata",
    description:
      "Para terapeutas com uma carteira maior de pacientes.",
    price: "R$ 195",
    period: "por mês",
    capacity: "Até 15 pacientes ativos",
    features: [
      "Até 15 pacientes ativos",
      "Acesso à plataforma",
      "Maior capacidade de pacientes",
    ],
    button: "Escolher Prata",
  },
  {
    name: "Combo Terapeuta Ouro",
    description:
      "Para terapeutas que precisam de máxima flexibilidade.",
    price: "R$ 299",
    period: "por mês",
    capacity: "Pacientes ilimitados",
    features: [
      "Pacientes ilimitados",
      "Acesso à plataforma",
      "Sem limite de pacientes ativos",
    ],
    button: "Escolher Ouro",
  },
];

export default function Pricing() {
  const navigate = useNavigate();
  const [annual, setAnnual] = useState(false);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#F7F5F2] px-6 py-10">

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

        @keyframes priceIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .pricing-fade {
          animation: fadeUp 0.7s ease-out both;
        }

        .pricing-card {
          animation: fadeUp 0.7s ease-out both;
          transition:
            transform 300ms ease,
            box-shadow 300ms ease,
            border-color 300ms ease;
        }

        .pricing-card:hover {
          transform: translateY(-7px);
          box-shadow:
            0 18px 45px rgba(0, 0, 0, 0.08);
        }

        .pricing-price {
          animation: priceIn 250ms ease-out;
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

        {/* Glow central */}
        <div
          className="
            glow-pulse absolute
            left-1/2 top-[35%]
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
          className="
            absolute inset-0
            opacity-[0.025]
          "
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

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* Voltar */}
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="
            pricing-fade
            mb-8 -ml-2
            text-neutral-600
            transition-all
            hover:bg-white/50
            hover:text-neutral-900
          "
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>

        {/* ===================================================== */}
        {/* HEADER */}
        {/* ===================================================== */}

        <div className="pricing-fade mx-auto max-w-3xl text-center">

          <h1
            className="
              text-4xl font-bold tracking-tight
              text-neutral-900
              sm:text-5xl
            "
          >
            Escolha o plano ideal
            <br />

            <span className="text-[#3B6FD8]">
              para sua rotina
            </span>
          </h1>

          <p
            className="
              mx-auto mt-5 max-w-2xl
              text-base leading-7
              text-neutral-600
              sm:text-lg
            "
          >
            Tenha as ferramentas necessárias para organizar
            seus pacientes e tornar seu acompanhamento ainda
            mais simples.
          </p>
        </div>

        {/* ===================================================== */}
        {/* CARDS */}
        {/* ===================================================== */}

        <div className="mx-auto mt-14 grid max-w-6xl gap-6 lg:grid-cols-4">

          {/* =================================================== */}
          {/* PLANO PADRÃO */}
          {/* =================================================== */}

          <div
            className="pricing-card relative pt-4"
            style={{ animationDelay: "100ms" }}
          >

            {/* Glow */}
            <div
              className="
                pointer-events-none absolute
                -inset-1
                rounded-[18px]
                bg-[#3B6FD8]
                opacity-[0.07]
                blur-xl
              "
            />

            <Card
              className="
                relative flex h-full flex-col
                overflow-hidden
                rounded-2xl
                border-2 border-[#3B6FD8]
                bg-white/95
                shadow-[0_12px_40px_rgba(59,111,216,0.14)]
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

              <CardHeader className="relative p-6 pb-4">

                <div className="flex items-start justify-between gap-3">
                  <h2 className="text-xl font-semibold text-neutral-900">
                    Plano Padrão
                  </h2>

                  <span
                    className="
                      rounded-full
                      bg-[#EAF0FC]
                      px-2.5 py-1
                      text-[10px]
                      font-bold
                      tracking-wide
                      text-[#3B6FD8]
                    "
                  >
                    ESSENCIAL
                  </span>
                </div>

                <p className="mt-3 min-h-[72px] text-sm leading-6 text-neutral-500">
                  Ideal para terapeutas que estão começando
                  ou acompanham poucos pacientes.
                </p>

                {/* ============================================= */}
                {/* TOGGLE */}
                {/* ============================================= */}

                <div className="mt-5 rounded-xl bg-neutral-100 p-1">

                  <div className="relative flex">

                    {/* Background deslizante */}
                    <div
                      className={`
                        absolute top-0
                        h-full w-1/2
                        rounded-lg
                        bg-white
                        shadow-sm
                        transition-transform duration-300 ease-out
                        ${annual ? "translate-x-full" : "translate-x-0"}
                      `}
                    />

                    <button
                      type="button"
                      onClick={() => setAnnual(false)}
                      className="
                        relative z-10
                        flex-1
                        rounded-lg
                        px-3 py-2
                        text-sm font-semibold
                        text-neutral-700
                      "
                    >
                      Mensal
                    </button>

                    <button
                      type="button"
                      onClick={() => setAnnual(true)}
                      className="
                        relative z-10
                        flex-1
                        rounded-lg
                        px-3 py-2
                        text-sm font-semibold
                        text-neutral-700
                      "
                    >
                      Anual
                    </button>

                  </div>
                </div>

                {/* ============================================= */}
                {/* PREÇO */}
                {/* ============================================= */}

                <div
                  key={annual ? "annual" : "monthly"}
                  className="pricing-price mt-5"
                >
                  <span className="text-3xl font-bold text-neutral-900">
                    {annual ? "R$ 300" : "R$ 30"}
                  </span>

                  <span className="ml-2 text-sm text-neutral-500">
                    {annual ? "por ano" : "por mês"}
                  </span>
                </div>

                {/* Economia */}
                <div className="mt-2 min-h-[20px]">
                  {annual && (
                    <p className="text-xs font-semibold text-[#3B6FD8]">
                      Você economiza R$ 60 no ano
                    </p>
                  )}
                </div>

                {/* Capacidade */}
                <div
                  className="
                    mt-4 rounded-xl
                    border border-[#E5ECFA]
                    bg-[#F5F8FE]
                    px-4 py-3
                  "
                >
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-neutral-500">
                    Capacidade
                  </p>

                  <p className="mt-1 text-sm font-semibold text-[#3B6FD8]">
                    1 paciente ativo
                  </p>
                </div>

              </CardHeader>

              <CardContent className="relative flex flex-1 flex-col p-6 pt-3">

                <Button
                  className="
                    h-11 w-full
                    rounded-lg
                    bg-[#3B6FD8]
                    text-sm font-semibold
                    shadow-[0_5px_15px_rgba(59,111,216,0.25)]
                    transition-all
                    hover:-translate-y-0.5
                    hover:bg-[#2D5FC6]
                    hover:shadow-[0_8px_20px_rgba(59,111,216,0.3)]
                  "
                >
                  {annual
                    ? "Assinar plano anual"
                    : "Assinar plano"}
                </Button>

                <div className="my-6 h-px bg-neutral-100" />

                <p className="mb-4 text-sm font-semibold text-neutral-800">
                  O que está incluído:
                </p>

                <ul className="space-y-3">
                  {[
                    "1 paciente ativo",
                    "Acesso à plataforma",
                    annual
                      ? "Pagamento anual"
                      : "Pagamento mensal",
                  ].map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-sm text-neutral-600"
                    >
                      <div
                        className="
                          mt-0.5 flex h-5 w-5 shrink-0
                          items-center justify-center
                          rounded-full bg-[#EAF0FC]
                        "
                      >
                        <Check className="h-3 w-3 text-[#3B6FD8]" />
                      </div>

                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

              </CardContent>
            </Card>
          </div>

          {/* =================================================== */}
          {/* BRONZE / PRATA / OURO */}
          {/* =================================================== */}

          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className="pricing-card relative pt-4"
              style={{
                animationDelay: `${200 + index * 100}ms`,
              }}
            >
              <Card
                className="
                  relative flex h-full flex-col
                  rounded-2xl
                  border border-neutral-200
                  bg-white/90
                  shadow-[0_4px_18px_rgba(0,0,0,0.05)]
                  backdrop-blur
                "
              >

                <CardHeader className="p-6 pb-4">

                  <h2 className="text-xl font-semibold leading-tight text-neutral-900">
                    {plan.name}
                  </h2>

                  <p className="mt-3 min-h-[72px] text-sm leading-6 text-neutral-500">
                    {plan.description}
                  </p>

                  <div className="mt-5">
                    <span className="text-3xl font-bold text-neutral-900">
                      {plan.price}
                    </span>

                    <span className="ml-2 text-sm text-neutral-500">
                      {plan.period}
                    </span>
                  </div>

                  <div
                    className="
                      mt-5 rounded-xl
                      bg-neutral-50
                      px-4 py-3
                    "
                  >
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-neutral-500">
                      Capacidade
                    </p>

                    <p className="mt-1 text-sm font-semibold text-[#3B6FD8]">
                      {plan.capacity}
                    </p>
                  </div>

                </CardHeader>

                <CardContent className="flex flex-1 flex-col p-6 pt-3">

                  <Button
                    className="
                      h-11 w-full
                      rounded-lg
                      bg-neutral-900
                      text-sm font-semibold
                      transition-all
                      hover:-translate-y-0.5
                      hover:bg-neutral-800
                      hover:shadow-lg
                    "
                  >
                    {plan.button}
                  </Button>

                  <div className="my-6 h-px bg-neutral-100" />

                  <p className="mb-4 text-sm font-semibold text-neutral-800">
                    O que está incluído:
                  </p>

                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="
                          flex items-start gap-3
                          text-sm text-neutral-600
                        "
                      >
                        <div
                          className="
                            mt-0.5 flex h-5 w-5 shrink-0
                            items-center justify-center
                            rounded-full bg-[#EAF0FC]
                          "
                        >
                          <Check className="h-3 w-3 text-[#3B6FD8]" />
                        </div>

                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* ===================================================== */}
        {/* FOOTER */}
        {/* ===================================================== */}

        <div
          className="
            pricing-fade
            mx-auto mt-12 max-w-3xl
            text-center
          "
          style={{ animationDelay: "700ms" }}
        >
          <p className="text-sm leading-6 text-neutral-500">
            Escolha o plano de acordo com a quantidade de pacientes
            que você acompanha. Você poderá alterar seu plano conforme
            suas necessidades.
          </p>
        </div>

      </div>
    </div>
  );
}