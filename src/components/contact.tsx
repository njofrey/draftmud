"use client";
import { Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { Card } from "@/components/ui/card";
import Link from "next/link";

export default function FeaturesSection() {
  return (
    <section id="contact" className="py-16 md:py-32 bg-muted/30">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-start gap-12 lg:grid-cols-5 lg:gap-16">
          {/* Información de contacto - 40% */}
          <div className="lg:col-span-2 lg:pt-6">
            <h2 className="text-4xl font-semibold lg:text-5xl mb-6">
                Hablemos de tu proyecto
              </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Queremos conocer tu marca.<br />
              Cuéntanos en qué etapa estás y qué tipo de proyecto te gustaría desarrollar.<br />
              Te responderemos a la brevedad para coordinar una reunión.
            </p>
            <ul className="space-y-6 text-muted-foreground">
              <li>
                <Link href="#link" className="hover:text-foreground transition-colors flex items-center gap-3">
                  <Mail className="size-5" />
                  <span>contacto@estudiomud.com</span>
                </Link>
              </li>
              <li>
                <Link href="#link" className="hover:text-foreground transition-colors flex items-center gap-3">
                  <MapPin className="size-5" />
                  <span>Vitacura, Santiago</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Formulario - 60% */}
          <div className="lg:col-span-3">
            <Card className="p-6 shadow-md sm:p-8">

                <form
                  action="https://formspree.io/f/mjkepqyo"
                  method="POST"
                  className="**:[&>label]:block mt-6 space-y-6 *:space-y-3"
                  onSubmit={(e) => {
                    const formData = new FormData(e.currentTarget);
                    const name = formData.get('name');
                    const params = new URLSearchParams();
                    params.set('success', 'true');
                    if (name) {
                      params.set('name', name.toString());
                    }
                    const nextUrl = `${window.location.origin}/gracias?${params.toString()}`;
                    const hiddenInput = e.currentTarget.querySelector('input[name="_next"]') as HTMLInputElement;

                    if (hiddenInput) {
                      hiddenInput.value = nextUrl;
                    }
                  }}
                >
                  <input type="hidden" name="_next" value={`${typeof window !== 'undefined' ? window.location.origin : ''}/gracias`} />

                    {/* Nombre y Email en 50/50 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="mb-2">Nombre</Label>
                    <Input 
                      type="text" 
                      id="name" 
                      name="name" 
                      required 
                      pattern="[A-Za-z\s]+"
                      title="Solo se permiten letras y espacios"
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
                      <div>
                        <Label htmlFor="email" className="mb-2">Email</Label>
                        <Input 
                          type="email" 
                          id="email" 
                          name="email" 
                          required 
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
                    </div>

                    {/* Instagram o sitio actual */}
                    <div>
                      <Label htmlFor="instagram" className="mb-2">Instagram o sitio actual (opcional)</Label>
                      <Input 
                        type="text" 
                        id="instagram" 
                        name="instagram" 
                        placeholder="@tuempresa o www.tusitio.cl"
                      />
                    </div>


                  <div>
                    <Label htmlFor="service">¿Qué tipo de proyecto necesitas?</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-3">
                      <div className="space-y-4">
                        <label className="flex items-center space-x-3 cursor-pointer">
                          <input 
                            type="radio" 
                            name="service" 
                            value="E-commerce" 
                            className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
                            required
                          />
                          <span className="text-sm">E-commerce</span>
                        </label>
                        <label className="flex items-center space-x-3 cursor-pointer">
                          <input 
                            type="radio" 
                            name="service" 
                            value="Landing page o sitio web" 
                            className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
                          />
                          <span className="text-sm">Landing page o sitio web</span>
                        </label>
                        <label className="flex items-center space-x-3 cursor-pointer">
                          <input 
                            type="radio" 
                            name="service" 
                            value="Rediseño o mejora de tu web actual" 
                            className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
                          />
                          <span className="text-sm">Rediseño o mejora de tu web actual</span>
                        </label>
                      </div>
                      <div className="space-y-4">
                        <label className="flex items-center space-x-3 cursor-pointer">
                          <input 
                            type="radio" 
                            name="service" 
                            value="Integraciones y automatizaciones" 
                            className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
                          />
                          <span className="text-sm">Integraciones y automatizaciones</span>
                        </label>
                        <label className="flex items-center space-x-3 cursor-pointer">
                          <input 
                            type="radio" 
                            name="service" 
                            value="Email Marketing" 
                            className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
                          />
                          <span className="text-sm">Email Marketing</span>
                        </label>
                        <label className="flex items-center space-x-3 cursor-pointer">
                          <input 
                            type="radio" 
                            name="service" 
                            value="Otro" 
                            className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
                          />
                          <span className="text-sm">Otro</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Plazo estimado eliminado */}


                  <div>
                    <Label htmlFor="msg" className="mb-2">Mensaje</Label>
                    <Textarea 
                      id="msg" 
                      name="message" 
                      rows={3} 
                      required 
                      placeholder="Cuéntanos brevemente tu proyecto"
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

                  <Button type="submit" className="w-full mt-2">Enviar</Button>
                </form>
              </Card>
          </div>
        </div>
      </div>
    </section>
  );
}