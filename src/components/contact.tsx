"use client";
import { useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { trackEvent } from "@/lib/analytics";
import { captureUtm, getUtm } from "@/lib/utm";

export default function ContactSection() {
  const [serviceValue, setServiceValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isSubmittingRef = useRef(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSubmittingRef.current) {
      return;
    }

    const form = e.currentTarget;
    const formData = new FormData(form);
    const honeypotValue = formData.get("company");

    if (typeof honeypotValue === "string" && honeypotValue.trim().length > 0) {
      return;
    }

    isSubmittingRef.current = true;
    setIsSubmitting(true);

    const params = new URLSearchParams();
    const name = formData.get("name");
    params.set("success", "true");
    if (typeof name === "string" && name.trim().length > 0) {
      params.set("name", name.trim());
    }

    const nextUrl = new URL(`${window.location.origin}/gracias`);
    params.forEach((value, key) => nextUrl.searchParams.set(key, value));

    const hiddenInput = form.querySelector('input[name="_next"]') as HTMLInputElement | null;
    if (hiddenInput) {
      hiddenInput.value = nextUrl.toString();
    }

    captureUtm();
    const utmData = getUtm();

    trackEvent("form_submit", { form_id: "contacto" });
    trackEvent("generate_lead", { form_id: "contacto", ...utmData });

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: formData,
        mode: "cors",
        keepalive: true,
        headers: {
          Accept: "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`Form submit failed with status ${response.status}`);
      }
    } catch (error) {
      console.error("[contact] form submission fallback", error);
      isSubmittingRef.current = false;
      setIsSubmitting(false);
      form.submit();
      return;
    }

    window.location.href = nextUrl.toString();
  };
  return (
    <section id="contact" data-section="contact" className="pt-16 pb-20 md:pt-32 md:pb-32 overflow-x-hidden">
      {/* Separador punteado al inicio */}
      <div className="my-0 h-px mb-8 md:mb-12" style={{
        width: '100vw',
        marginLeft: 'calc(-50vw + 50%)',
        backgroundImage: 'radial-gradient(circle, rgb(0 0 0 / 0.2) 0.5px, transparent 0.5px)',
        backgroundSize: '3px 1px',
        backgroundPosition: '0 center',
        backgroundRepeat: 'repeat-x'
      }}></div>
      <div className="mx-auto max-w-6xl safe-container overflow-x-hidden">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Información de contacto - 50% */}
          <div>
            <h2 className="migra-xl text-4xl lg:text-5xl mb-6">
                Hablemos de tu proyecto
              </h2>
            <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
              Queremos conocer tu marca y entender lo que estás buscando. Completa el formulario y te responderemos en menos de 24 horas hábiles.<br />
              <br />
              También puedes escribirnos directamente a <a href="mailto:contacto@estudiomud.com" data-track="contact" className="text-foreground hover:opacity-70 transition-opacity underline-offset-2 hover:underline">contacto@estudiomud.com</a>
            </p>
          </div>

          {/* Formulario - 50% - Minimalista sin Card */}
          <div className="overflow-x-hidden">
            <form
              action="https://formspree.io/f/mjkepqyo"
              method="POST"
              data-form-id="contacto"
              className="space-y-6 w-full"
              onSubmit={handleSubmit}
            >
              <input type="hidden" name="_next" value={`${typeof window !== 'undefined' ? window.location.origin : ''}/gracias`} />
              <input
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                style={{ display: "none" }}
              />

              {/* Nombre */}
              <div className="relative">
                <Input 
                  type="text" 
                  id="name" 
                  name="name" 
                  required 
                  pattern="[A-Za-z\s]+"
                  title="Solo se permiten letras y espacios"
                  placeholder="Nombre"
                  className="border-0 rounded-none focus-visible:ring-0 shadow-none bg-transparent placeholder:text-foreground/70 py-3 px-0 !text-base"
                  style={{
                    backgroundImage: 'radial-gradient(circle, rgb(0 0 0 / 0.2) 0.5px, transparent 0.5px)',
                    backgroundSize: '3px 1px',
                    backgroundPosition: '0 bottom',
                    backgroundRepeat: 'repeat-x',
                    paddingBottom: '12px'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.backgroundImage = 'radial-gradient(circle, rgb(0 0 0 / 0.4) 0.5px, transparent 0.5px)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.backgroundImage = 'radial-gradient(circle, rgb(0 0 0 / 0.2) 0.5px, transparent 0.5px)';
                  }}
                  onInvalid={(e) => {
                    const target = e.target as HTMLInputElement;
                    if (target.validity.valueMissing) {
                      target.setCustomValidity('Por favor ingresa tu nombre');
                    } else if (target.validity.patternMismatch) {
                      target.setCustomValidity('Solo se permiten letras y espacios');
                    }
                  }}
                  onInput={(e) => {
                    const target = e.target as HTMLInputElement;
                    target.setCustomValidity('');
                  }}
                />
              </div>

              <div className="relative">
                <Input 
                  type="email" 
                  id="email" 
                  name="email" 
                  required 
                  placeholder="Email"
                  className="border-0 rounded-none focus-visible:ring-0 shadow-none bg-transparent placeholder:text-foreground/70 py-3 px-0 !text-base"
                  style={{
                    backgroundImage: 'radial-gradient(circle, rgb(0 0 0 / 0.2) 0.5px, transparent 0.5px)',
                    backgroundSize: '3px 1px',
                    backgroundPosition: '0 bottom',
                    backgroundRepeat: 'repeat-x',
                    paddingBottom: '12px'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.backgroundImage = 'radial-gradient(circle, rgb(0 0 0 / 0.4) 0.5px, transparent 0.5px)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.backgroundImage = 'radial-gradient(circle, rgb(0 0 0 / 0.2) 0.5px, transparent 0.5px)';
                  }}
                  onInvalid={(e) => {
                    const target = e.target as HTMLInputElement;
                    if (target.validity.valueMissing) {
                      target.setCustomValidity('Por favor ingresa tu email');
                    } else if (target.validity.typeMismatch) {
                      target.setCustomValidity('Por favor ingresa un email válido');
                    }
                  }}
                  onInput={(e) => {
                    const target = e.target as HTMLInputElement;
                    target.setCustomValidity('');
                  }}
                />
              </div>

              {/* Proyecto - Select Nativo */}
              <div className="relative">
                <select
                  id="service"
                  name="service"
                  value={serviceValue}
                  onChange={(e) => setServiceValue(e.target.value)}
                  required
                  className="w-full border-0 rounded-none focus:ring-0 focus:outline-none focus-visible:ring-0 shadow-none bg-transparent py-3 px-0 !text-base appearance-none cursor-pointer"
                  style={{
                    backgroundImage: 'radial-gradient(circle, rgb(0 0 0 / 0.2) 0.5px, transparent 0.5px)',
                    backgroundSize: '3px 1px',
                    backgroundPosition: '0 bottom',
                    backgroundRepeat: 'repeat-x',
                    paddingBottom: '12px',
                    paddingRight: '1.5rem'
                  }}
                >
                  <option value="" disabled>Selecciona un tipo de proyecto</option>
                  <option value="Branding">Branding</option>
                  <option value="Diseño web">Diseño web</option>
                  <option value="E-commerce Shopify">E-commerce Shopify</option>
                  <option value="Email marketing & CRM">Email marketing & CRM</option>
                  <option value="Integraciones">Integraciones</option>
                  <option value="Auditoría">Auditoría</option>
                  <option value="Otro">Otro</option>
                </select>
                <div className="absolute right-0 bottom-3 pointer-events-none">
                  <svg className="w-4 h-4 text-foreground/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* Mensaje */}
              <div className="relative">
                <Textarea 
                  id="msg" 
                  name="message" 
                  rows={4} 
                  required 
                  placeholder="Mensaje"
                  className="border-0 rounded-none focus-visible:ring-0 shadow-none bg-transparent resize-none placeholder:text-foreground/70 py-3 px-0 min-h-[100px] !text-base"
                  style={{
                    backgroundImage: 'radial-gradient(circle, rgb(0 0 0 / 0.2) 0.5px, transparent 0.5px)',
                    backgroundSize: '3px 1px',
                    backgroundPosition: '0 bottom',
                    backgroundRepeat: 'repeat-x',
                    paddingBottom: '12px'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.backgroundImage = 'radial-gradient(circle, rgb(0 0 0 / 0.4) 0.5px, transparent 0.5px)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.backgroundImage = 'radial-gradient(circle, rgb(0 0 0 / 0.2) 0.5px, transparent 0.5px)';
                  }}
                  onInvalid={(e) => {
                    const target = e.target as HTMLTextAreaElement;
                    if (target.validity.valueMissing) {
                      target.setCustomValidity('Por favor ingresa tu mensaje');
                    }
                  }}
                  onInput={(e) => {
                    const target = e.target as HTMLTextAreaElement;
                    target.setCustomValidity('');
                  }}
                />
              </div>

              <button 
                type="submit" 
                className="flex items-center gap-2 !text-base font-normal text-foreground/80 hover:text-foreground transition-colors duration-200 mt-6 py-3 relative w-fit md:ml-auto group"
                style={{
                  backgroundImage: 'radial-gradient(circle, rgb(0 0 0 / 0.2) 0.5px, transparent 0.5px)',
                  backgroundSize: '3px 1px',
                  backgroundPosition: '0 bottom',
                  backgroundRepeat: 'repeat-x',
                  paddingBottom: '12px'
                }}
                disabled={isSubmitting}
                aria-disabled={isSubmitting}
              >
                Enviar
                <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
