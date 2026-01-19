import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { 
  Menu, 
  X, 
  Scale, 
  Users, 
  Briefcase, 
  Building2, 
  ArrowRight, 
  Phone, 
  MapPin, 
  Mail, 
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

// --- Types ---
interface ServiceItem {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
}

interface NavLink {
  name: string;
  href: string;
}

// --- Data ---
const navLinks: NavLink[] = [
  { name: 'Início', href: '#hero' },
  { name: 'Atuação', href: '#servicos' },
  { name: 'Diferenciais', href: '#diferenciais' },
  { name: 'Sobre', href: '#sobre' },
  { name: 'Contato', href: '#contato' },
];

const services: ServiceItem[] = [
  {
    id: 1,
    title: 'Direito Civil',
    description: 'Resolução de conflitos patrimoniais, contratuais e responsabilidade civil com estratégia e precisão.',
    icon: Scale
  },
  {
    id: 2,
    title: 'Direito de Família',
    description: 'Atuação sensível e discreta em divórcios, partilhas, sucessões e planejamento patrimonial.',
    icon: Users
  },
  {
    id: 3,
    title: 'Direito Trabalhista',
    description: 'Defesa robusta de interesses corporativos e individuais em litígios complexos.',
    icon: Briefcase
  },
  {
    id: 4,
    title: 'Direito Empresarial',
    description: 'Consultoria jurídica para governança, compliance e fusões com foco na segurança do negócio.',
    icon: Building2
  }
];

// --- Components ---

const Button: React.FC<{ 
  variant?: 'primary' | 'outline' | 'white'; 
  children: React.ReactNode; 
  className?: string;
  onClick?: () => void;
  href?: string;
}> = ({ variant = 'primary', children, className = '', onClick, href }) => {
  const baseStyles = "inline-flex items-center justify-center px-8 py-3 text-sm font-bold tracking-wide transition-all duration-300 uppercase font-sans";
  
  const variants = {
    primary: "bg-gold-600 text-white hover:bg-gold-700 shadow-md hover:shadow-lg border border-transparent",
    outline: "bg-transparent text-white border border-white hover:bg-white hover:text-navy-900",
    white: "bg-white text-navy-900 hover:bg-gray-100 shadow-md",
  };

  const Component = href ? 'a' : 'button';
  
  return (
    // @ts-ignore
    <Component 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      onClick={onClick}
      href={href}
    >
      {children}
    </Component>
  );
};

const SectionTitle: React.FC<{ title: string; subtitle?: string; light?: boolean }> = ({ title, subtitle, light = false }) => (
  <div className="mb-12 md:mb-16 max-w-3xl mx-auto text-center">
    <span className={`block text-xs font-bold tracking-[0.2em] uppercase mb-3 ${light ? 'text-gold-400' : 'text-gold-600'}`}>
      {subtitle}
    </span>
    <h2 className={`text-3xl md:text-5xl font-serif font-medium ${light ? 'text-white' : 'text-navy-900'}`}>
      {title}
    </h2>
    <div className={`h-1 w-20 mx-auto mt-6 ${light ? 'bg-gold-400' : 'bg-gold-600'}`} />
  </div>
);

const FadeIn: React.FC<{ 
  children: React.ReactNode; 
  delay?: number; 
  className?: string; 
}> = ({ children, delay = 0, className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (domRef.current) observer.unobserve(domRef.current);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    if (domRef.current) observer.observe(domRef.current);

    return () => {
      if (domRef.current) observer.unobserve(domRef.current);
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-1000 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// --- Main App ---

const App: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-600 selection:bg-gold-200 selection:text-navy-900">
      
      {/* Navbar */}
      <header 
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? 'bg-navy-950/95 backdrop-blur-sm shadow-xl py-4' : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 md:w-10 md:h-10 border-2 flex items-center justify-center ${isScrolled ? 'border-gold-500 text-gold-500' : 'border-white text-white'}`}>
              <span className="font-serif text-lg md:text-xl font-bold">I</span>
            </div>
            <a href="#" className={`text-xl md:text-2xl font-serif tracking-wide font-bold uppercase ${isScrolled ? 'text-white' : 'text-white'}`}>
              Imperium
            </a>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className={`text-sm font-bold uppercase tracking-widest hover:text-gold-500 transition-colors ${isScrolled ? 'text-gray-300' : 'text-gray-200'}`}
              >
                {link.name}
              </a>
            ))}
            <Button variant="primary" href="#contato">
              Agendar Consulta
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white hover:text-gold-500 transition-colors"
            onClick={toggleMenu}
            aria-label="Menu"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Nav Overlay */}
        <div className={`md:hidden fixed inset-0 bg-navy-950 z-40 transition-transform duration-300 transform ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`} style={{top: '0', paddingTop: '80px'}}>
           <div className="flex flex-col items-center justify-center space-y-8 h-full pb-20">
             {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className="text-2xl font-serif text-white hover:text-gold-500"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <Button variant="primary" href="#contato" onClick={() => setIsMobileMenuOpen(false)}>
                Falar Conosco
              </Button>
           </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/id/196/1920/1080" 
            alt="Office background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-navy-950/80 bg-gradient-to-r from-navy-950/90 to-navy-900/40"></div>
        </div>

        <div className="container mx-auto px-6 md:px-12 relative z-10 pt-20">
          <div className="max-w-4xl">
            <FadeIn delay={200}>
              <span className="inline-block py-1 px-3 border border-gold-500/50 text-gold-400 text-xs font-bold tracking-[0.2em] uppercase mb-6 rounded-sm bg-navy-950/30 backdrop-blur-sm">
                Advocacia em Sorocaba/SP
              </span>
            </FadeIn>
            <FadeIn delay={400}>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white leading-tight mb-6">
                Advocacia estratégica para <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600">
                  resultados decisivos.
                </span>
              </h1>
            </FadeIn>
            <FadeIn delay={600}>
              <p className="text-lg md:text-xl text-gray-300 font-light max-w-2xl mb-10 leading-relaxed border-l-2 border-gold-600 pl-6">
                Compromisso inabalável com a excelência técnica e a defesa rigorosa dos interesses de nossos clientes nos cenários jurídicos mais complexos.
              </p>
            </FadeIn>
            
            <FadeIn delay={800}>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="primary" href="https://wa.me/5511999999999">
                  Falar com Especialista
                </Button>
                <Button variant="outline" href="#servicos">
                  Conhecer Áreas
                </Button>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicos" className="py-24 bg-slate-50 relative scroll-mt-20">
        <div className="container mx-auto px-6 md:px-12">
          <FadeIn>
             <SectionTitle title="Áreas de Atuação" subtitle="Expertise Jurídica" />
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <FadeIn key={service.id} delay={index * 150} className="h-full">
                  <div className="group relative bg-white p-8 shadow-sm hover:shadow-2xl transition-all duration-300 border-t-2 border-transparent hover:border-gold-600 hover:-translate-y-2 h-full">
                    <div className="w-12 h-12 bg-navy-50 rounded-full flex items-center justify-center text-navy-900 mb-6 group-hover:bg-navy-900 group-hover:text-gold-500 transition-colors">
                      <IconComponent size={24} strokeWidth={1.5} />
                    </div>
                    <h3 className="text-xl font-serif text-navy-900 mb-4 group-hover:text-gold-600 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-6">
                      {service.description}
                    </p>
                    <a href="#contato" className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-navy-900 group-hover:text-gold-600 transition-colors">
                      Saiba Mais <ChevronRight size={14} className="ml-1" />
                    </a>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features/Differentiators Section */}
      <section id="diferenciais" className="py-24 bg-navy-950 text-white relative overflow-hidden scroll-mt-20">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-navy-900/50 skew-x-12 transform translate-x-20"></div>
        
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <FadeIn className="lg:w-1/2">
              <SectionTitle title="Por que Imperium?" subtitle="Nosso Legado" light />
              <div className="space-y-8 mt-8">
                {[
                  {
                    title: "Atendimento Personalizado",
                    desc: "Cada cliente é único. Desenvolvemos estratégias sob medida para cada caso, com comunicação direta com os sócios."
                  },
                  {
                    title: "Transparência Absoluta",
                    desc: "Clareza em todas as etapas do processo, honorários e probabilidades de êxito. A confiança é a base de nossa atuação."
                  },
                  {
                    title: "Excelência Técnica",
                    desc: "Corpo jurídico formado nas melhores universidades, com constante atualização em jurisprudência e doutrina."
                  }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="mt-1 flex-shrink-0">
                      <CheckCircle2 className="text-gold-500" size={24} />
                    </div>
                    <div>
                      <h4 className="text-xl font-serif text-white mb-2">{item.title}</h4>
                      <p className="text-slate-400 font-light text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
            
            <FadeIn className="lg:w-1/2 relative" delay={300}>
              <div className="relative rounded-sm overflow-hidden border-4 border-navy-800 shadow-2xl">
                 <img 
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop" 
                  alt="Escritório Moderno" 
                  className="w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute bottom-0 left-0 bg-gold-600 text-white px-8 py-4">
                  <p className="font-serif text-3xl font-bold">15+</p>
                  <p className="text-xs uppercase tracking-widest">Anos de Experiência</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre" className="py-24 bg-white scroll-mt-20">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row-reverse items-center gap-12 lg:gap-20">
            <FadeIn className="md:w-1/2 relative" delay={200}>
              <div className="relative z-10">
                 <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop" 
                  alt="Sócio Fundador" 
                  className="rounded-sm shadow-xl w-full max-w-md mx-auto"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 border-r-4 border-b-4 border-gold-500 hidden md:block"></div>
              <div className="absolute -top-6 -left-6 w-32 h-32 border-l-4 border-t-4 border-navy-900 hidden md:block"></div>
            </FadeIn>
            
            <FadeIn className="md:w-1/2 text-left">
              <span className="block text-xs font-bold tracking-[0.2em] uppercase mb-3 text-gold-600">
                Sobre o Sócio
              </span>
              <h2 className="text-4xl lg:text-5xl font-serif text-navy-900 mb-6">
                Dr. Roberto Imperium
              </h2>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Fundador do escritório Imperium, Dr. Roberto possui mais de 15 anos de atuação destacada nos tribunais superiores. Especialista em Direito Civil e Empresarial pela USP, construiu uma carreira pautada na ética e na busca incansável pela justiça.
              </p>
              <p className="text-slate-600 mb-8 leading-relaxed">
                "Nossa missão não é apenas ganhar casos, mas garantir que o direito do nosso cliente seja respeitado e preservado com a máxima dignidade e competência técnica."
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CTA / Contact Section */}
      <section id="contato" className="py-24 bg-navy-950 text-white scroll-mt-20">
        <div className="container mx-auto px-6 md:px-12">
          <FadeIn>
            <div className="bg-navy-900 rounded-sm p-8 md:p-12 lg:p-16 shadow-2xl border border-navy-800 flex flex-col lg:flex-row gap-12">
              
              <div className="lg:w-1/2">
                <h2 className="text-3xl md:text-4xl font-serif mb-6">Vamos conversar sobre o seu caso?</h2>
                <p className="text-slate-400 mb-8 leading-relaxed">
                  Agende uma reunião inicial para entendermos suas necessidades. Garantimos total sigilo e uma análise preliminar honesta sobre as possibilidades jurídicas.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-navy-800 rounded-full text-gold-500">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm uppercase tracking-wide">Endereço</h4>
                      <p className="text-slate-400 text-sm">Av. Barão de Tatuí, 1200 - Sorocaba/SP</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-navy-800 rounded-full text-gold-500">
                      <Mail size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm uppercase tracking-wide">Email</h4>
                      <p className="text-slate-400 text-sm">contato@imperiumadvocacia.com.br</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-navy-800 rounded-full text-gold-500">
                      <Phone size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm uppercase tracking-wide">Telefone</h4>
                      <p className="text-slate-400 text-sm">(15) 3000-0000</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:w-1/2 h-[400px] bg-navy-900 rounded-sm overflow-hidden border border-navy-800 shadow-2xl relative">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3659.0254648900777!2d-47.460647323985735!3d-23.49559265918235!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94c58aa9e8555555%3A0x5555555555555555!2sSorocaba%2C%20SP!5e0!3m2!1spt-BR!2sbr"
                  width="100%" 
                  height="100%" 
                  style={{border:0}} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full grayscale hover:grayscale-0 transition-all duration-700"
                  title="Mapa de Localização"
                ></iframe>
              </div>

            </div>
          </FadeIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy-950 pt-12 pb-6 border-t border-navy-900">
        <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <span className="text-2xl font-serif font-bold text-white tracking-widest uppercase">Imperium</span>
            <p className="text-slate-500 text-xs mt-2">© 2024 Imperium Advocacia. Todos os direitos reservados.</p>
          </div>
          <div className="flex gap-6">
            <a href="#" className="text-slate-500 hover:text-gold-500 text-xs uppercase tracking-wider transition-colors">Termos</a>
            <a href="#" className="text-slate-500 hover:text-gold-500 text-xs uppercase tracking-wider transition-colors">Privacidade</a>
            <a href="#" className="text-slate-500 hover:text-gold-500 text-xs uppercase tracking-wider transition-colors">OAB/SP 00.000</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);