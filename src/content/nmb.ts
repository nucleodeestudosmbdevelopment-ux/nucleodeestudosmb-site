// Centralized, editable content for the Núcleo Márcia Baldi site.

export const contact = {
  whatsapp: import.meta.env.VITE_CONTACT_WHATSAPP as string,
  whatsappLabel: "Falar pelo WhatsApp",
  phone: import.meta.env.VITE_CONTACT_PHONE as string,
  instagram: import.meta.env.VITE_CONTACT_INSTAGRAM as string,
  instagramHandle: import.meta.env.VITE_CONTACT_INSTAGRAM_HANDLE as string,
  email: import.meta.env.VITE_CONTACT_EMAIL as string,
  address: import.meta.env.VITE_CONTACT_ADDRESS as string,
  hours: import.meta.env.VITE_CONTACT_HOURS as string,
};

export const navigationLinks = [
  { href: "#sobre", label: "Sobre" },
  { href: "#marcia", label: "Márcia Baldi" },
  { href: "#nucleo", label: "O Núcleo" },
  { href: "#comunicacao", label: "Comunicação" },
  { href: "#prevestibular", label: "Medicina" },
  { href: "#contato", label: "Contato" },
] as const;

export const aboutCards = [
  {
    title: "Aprendizagem com propósito",
    desc: "Estudo direcionado ao desenvolvimento real do aluno.",
  },
  {
    title: "Acompanhamento próximo",
    desc: "Um olhar atento à rotina, ao ritmo e às necessidades.",
  },
  { title: "Desenvolvimento de autonomia", desc: "O aluno aprende a estudar com mais constância." },
  { title: "Comunicação clara", desc: "Argumentação, escrita e expressão como parte da formação." },
  {
    title: "Evolução acadêmica",
    desc: "Progresso percebido nos estudos, na rotina e na confiança.",
  },
];

export const marciaProfile = {
  image: "/people/marcia-baldi.jpeg",
  imageAlt: "Retrato de Márcia Baldi, fundadora do Núcleo Márcia Baldi.",
  badge: "Quem é Márcia Baldi",
  title: "A educadora que dá nome, direção e presença ao núcleo.",
  description: [
    "À frente do Núcleo Márcia Baldi, ela conduz uma proposta pedagógica que une linguagem, organização dos estudos, desenvolvimento acadêmico e acompanhamento próximo de cada aluno.",
    "Sua trajetória combina base acadêmica sólida e olhar atento ao processo de aprendizagem, sustentando um trabalho que valoriza tanto o desempenho quanto a construção de autonomia, clareza e confiança.",
  ],
} as const;

export const marciaCredentials = [
  {
    label: "Graduação",
    value: "Letras",
    desc: "Formação de base voltada ao estudo da linguagem, da leitura e da escrita.",
  },
  {
    label: "Mestrado e Doutorado",
    value: "Análise Discursiva",
    desc: "Formação desenvolvida na UFJF e na UFMG, com aprofundamento em linguagem e discurso.",
  },
  {
    label: "Especialização",
    value: "Psicopedagogia e Neuropsicologia",
    desc: "Especialização pela UFBA, ampliando o olhar sobre aprendizagem e desenvolvimento.",
  },
] as const;

export const marciaHighlights = [
  {
    title: "Fundadora do Núcleo",
    desc: "A presença da Márcia está na visão pedagógica, no cuidado com a jornada e na identidade do espaço.",
  },
  {
    title: "Formação interdisciplinar",
    desc: "Linguagem, discurso, psicopedagogia e neuropsicologia sustentam um trabalho mais completo.",
  },
  {
    title: "Acompanhamento com método",
    desc: "Cada aluno é observado com proximidade para evoluir com clareza, constância e autonomia.",
  },
] as const;

export const pillars = [
  {
    title: "Professores e mentores",
    desc: "Profissionais preparados para orientar, acompanhar e entender as necessidades de cada aluno.",
    icon: "book",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
    alt: "Educadora acompanhando estudantes durante um momento de orientação.",
  },
  {
    title: "Metodologia personalizada",
    desc: "Cada aluno tem uma jornada própria. O acompanhamento considera ritmo, rotina, objetivos e dificuldades.",
    icon: "notebook",
    image:
      "https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=1200&q=80",
    alt: "Mesa de estudo com cadernos e material pedagógico organizado.",
  },
  {
    title: "Acompanhamento contínuo",
    desc: "O progresso é observado de perto, com ajustes de estratégia e orientação constante.",
    icon: "calendar",
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80",
    alt: "Aluno recebendo acompanhamento individual em ambiente de estudos.",
  },
  {
    title: "Desenvolvimento de autonomia",
    desc: "O aluno aprende a estudar melhor, organizar sua rotina e ganhar mais independência.",
    icon: "star",
    image:
      "https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=1200&q=80",
    alt: "Jovem estudante estudando de forma autônoma com cadernos e material de vestibular.",
  },
  {
    title: "Comunicação e expressão",
    desc: "Segurança na fala, argumentação, clareza de ideias, escrita e postura comunicacional.",
    icon: "mic",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
    alt: "Grupo em conversa e apresentação, representando comunicação e expressão.",
  },
  {
    title: "Preparação estratégica",
    desc: "Preparação voltada para provas, redação, vestibulares e construção de desempenho.",
    icon: "plane",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80",
    alt: "Materiais de preparação acadêmica e planejamento de estudos para provas.",
  },
] as const;

export const testimonials = [
  {
    text: "Meu neto possui vários transtornos: TDAH, TOD e Asperger. Após iniciar no Núcleo Márcia Baldi, seus problemas amenizaram de forma surpreendente, passou a sentir prazer de estudar, suas notas melhoraram e até o comportamento — porque lá não é só aprender conteúdos, o acolhimento é surreal!",
    author: "Responsável",
  },
  {
    text: "Seremos eternamente gratas ao Núcleo. Foi de extrema importância para a conquista da minha filha nos vestibulares de medicina que prestou, sendo aprovada em todos.",
    author: "Responsável",
  },
  {
    text: "Professores super pacientes, explicam com calma e se importam com o aluno. O ambiente é leve, fazendo a gente se sentir à vontade para aprender sem pressão.",
    author: "Aluno",
  },
  {
    text: "Um ambiente super acolhedor, aulas totalmente personalizadas para o nosso aprendizado! A Márcia é sensacional. Indico de olhos fechados!",
    author: "Aluno",
  },
  {
    text: "Minha filha tinha muita dificuldade em interpretação de texto e língua portuguesa. Em apenas dois meses no Núcleo Márcia Baldi, ela superou esses desafios e suas notas em todas as matérias melhoraram.",
    author: "Responsável",
  },
  {
    text: "Lugar de estudar e ser feliz ao mesmo tempo! Ainda mais em um espaço tão aconchegante, com uma professora — na verdade, uma equipe — tão cuidadosa no preparo de suas aulas.",
    author: "Responsável",
  },
  {
    text: "A melhor experiência possível! Me sinto em casa, em um ambiente extremamente agradável e acolhedor, com pessoas especiais. A Márcia é uma profissional diferenciada.",
    author: "Aluno",
  },
  {
    text: "Comecei a estudar no núcleo em 2023. É um dos melhores ensinos que já recebi — muito acolhedores e didáticos.",
    author: "Aluno",
  },
];

export const floatingWords = [
  "clareza",
  "confiança",
  "argumentação",
  "autonomia",
  "expressão",
  "organização",
];

export const environmentGallery = [
  {
    src: "/environment/aula-1.jpeg",
    alt: "Professor conduzindo aula em grupo no Núcleo Márcia Baldi.",
  },
  {
    src: "/environment/aula-2.jpeg",
    alt: "Turma reunida em sala de estudos durante atividade acompanhada.",
  },
  {
    src: "/environment/aula-3.jpeg",
    alt: "Ambiente do Núcleo com alunos participando de aula orientada.",
  },
];

export const preVestibularHighlight = {
  badge: "Pré-vestibular · Medicina",
  title: "Referência em aprovações para Medicina",
  desc: "Redação, interpretação, raciocínio lógico e rotina de estudos com acompanhamento próximo — metodologia que prepara para vestibulares de alta concorrência.",
};

export const preVestibularFeatures = [
  {
    icon: "✦",
    label: "Redação dissertativa",
    desc: "Domínio de tese, argumentação e repertório para ENEM e vestibulares.",
  },
  {
    icon: "◐",
    label: "Interpretação de texto",
    desc: "Leitura crítica e resolução de questões de alto nível de exigência.",
  },
  {
    icon: "↗",
    label: "Rotina e método",
    desc: "Planejamento individualizado para manter constância e evolução real.",
  },
  {
    icon: "✷",
    label: "Aprovações em Medicina",
    desc: "Histórico de alunos aprovados em cursos de alta concorrência em BH.",
  },
];
