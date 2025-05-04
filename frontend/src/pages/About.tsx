import { Link } from "react-router-dom";

const About = () => (
  <section className="max-w-2xl mx-auto py-16 px-4">
    <h1 className="text-3xl font-bold mb-4">Sobre o Projeto</h1>
    <p className="mb-4 text-lg text-muted-foreground">
      <strong>Celular Fix Manager</strong> é um sistema moderno de gestão de assistência técnica de celulares, desenvolvido para demonstrar minhas habilidades em React, TypeScript, Tailwind CSS, acessibilidade e boas práticas de frontend.
    </p>
    <ul className="mb-6 list-disc ml-6 text-base">
      <li>Performance otimizada (lazy loading, code splitting, imagens otimizadas)</li>
      <li>Acessibilidade aprimorada (semântica, ARIA, foco visível)</li>
      <li>Design responsivo e moderno</li>
      <li>Boas práticas de código e organização</li>
    </ul>
    <p className="mb-6">
      Projeto de portfólio desenvolvido por <strong>Renan</strong>.
      <br />
      <a href="mailto:seuemail@exemplo.com" className="text-primary underline hover:no-underline">Entre em contato</a> para feedbacks ou oportunidades!
    </p>
    <Link to="/" className="text-sm text-primary underline">Voltar para a Home</Link>
  </section>
);

export default About;
